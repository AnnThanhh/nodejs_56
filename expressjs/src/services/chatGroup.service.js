import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from "../common/helpers/exception.helper.js";
import {
  getIO,
  chatRoomName,
  userRoomName,
} from "../common/socket/presence.js";

const USER_PREVIEW_SELECT = { id: true, fullName: true, avatar: true };

// tìm room chat 1-1 đã tồn tại giữa đúng 2 thành viên (không phải group đặt tên)
const findDirectGroup = async (memberIds) => {
  const candidates = await prisma.chatGroups.findMany({
    where: {
      isDeleted: false,
      name: null,
      ChatGroupMembers: {
        every: { userId: { in: memberIds }, isDeleted: false },
        some: {},
      },
    },
    include: { ChatGroupMembers: { where: { isDeleted: false } } },
  });

  return (
    candidates.find(
      (group) => group.ChatGroupMembers.length === memberIds.length,
    ) || null
  );
};

export const chatGroupService = {
  // dùng chung cho REST (POST /chat-group) và socket (CREATE_ROOM)
  async findOrCreateGroup({ userId, targetUserIds, name }) {
    if (!Array.isArray(targetUserIds) || !targetUserIds.length) {
      throw new BadRequestException("targetUserIds không hợp lệ");
    }

    const memberIds = Array.from(new Set([...targetUserIds, userId]));

    let chatGroup;
    let isNew = false;

    if (memberIds.length === 2) {
      chatGroup = await findDirectGroup(memberIds);
    }

    if (!chatGroup) {
      isNew = true;
      chatGroup = await prisma.chatGroups.create({
        data: {
          ownerId: userId,
          name: memberIds.length === 2 ? null : name,
        },
      });
      await prisma.chatGroupMembers.createMany({
        data: memberIds.map((id) => ({
          userId: id,
          chatGroupId: chatGroup.id,
        })),
      });
    }

    // join ngay tất cả các tab/thiết bị đang online của mọi thành viên vào room
    // -> không cần bấm vào profile mới được realtime
    const io = getIO();
    if (io) {
      memberIds.forEach((id) =>
        io.in(userRoomName(id)).socketsJoin(chatRoomName(chatGroup.id)),
      );

      if (isNew) {
        memberIds
          .filter((id) => id !== userId)
          .forEach((id) =>
            io
              .to(userRoomName(id))
              .emit("NEW_CONVERSATION", { chatGroupId: chatGroup.id }),
          );
      }
    }

    return { chatGroup, isNew };
  },

  async create(req) {
    const { targetUserIds, name } = req.body;
    const { chatGroup, isNew } = await this.findOrCreateGroup({
      userId: req.user.id,
      targetUserIds,
      name,
    });

    return { chatGroupId: chatGroup.id, isNew };
  },

  async findAll(req) {
    const { page, pageSize, index } = buildQueryPrisma(req);
    const userId = req.user.id;

    const memberFilter = {
      isDeleted: false,
      ChatGroupMembers: { some: { userId, isDeleted: false } },
    };

    const resultPrisma = await prisma.chatGroups.findMany({
      where: memberFilter,
      skip: index, //Offset
      take: pageSize, //Limit
      orderBy: { updatedAt: "desc" },
      include: {
        ChatGroupMembers: {
          where: { isDeleted: false },
          include: { Users: { select: USER_PREVIEW_SELECT } },
        },
        ChatMessages: {
          where: { isDeleted: false },
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { Users: { select: USER_PREVIEW_SELECT } },
        },
      },
    });

    const totalItems = await prisma.chatGroups.count({ where: memberFilter });
    const totalPages = Math.ceil(totalItems / pageSize);

    const chatGroupIds = resultPrisma.map((group) => group.id);
    const unreadCounts = chatGroupIds.length
      ? await prisma.chatMessageReceipts.groupBy({
          by: ["chatGroupId"],
          where: { userId, seenAt: null, chatGroupId: { in: chatGroupIds } },
          _count: { _all: true },
        })
      : [];
    const unreadMap = new Map(
      unreadCounts.map((row) => [row.chatGroupId, row._count._all]),
    );

    const items = resultPrisma.map(({ ChatMessages, ...group }) => ({
      ...group,
      lastMessage: ChatMessages[0] || null,
      unreadCount: unreadMap.get(group.id) || 0,
    }));

    return { items, totalItems, totalPages, page, pageSize };
  },

  async findOne(req) {
    const chatGroupId = Number(req.params.id);

    const chatGroup = await prisma.chatGroups.findUnique({
      where: { id: chatGroupId },
      include: {
        ChatGroupMembers: {
          where: { isDeleted: false },
          include: { Users: { select: USER_PREVIEW_SELECT } },
        },
      },
    });

    if (!chatGroup || chatGroup.isDeleted) {
      throw new NotFoundException("Chat group không tồn tại");
    }

    const isMember = chatGroup.ChatGroupMembers.some(
      (m) => m.userId === req.user.id,
    );
    if (!isMember) {
      throw new ForbiddenException(
        "Bạn không phải thành viên của room chat này",
      );
    }

    return chatGroup;
  },

  async update(req) {
    const chatGroupId = Number(req.params.id);
    const { name } = req.body;

    const member = await prisma.chatGroupMembers.findFirst({
      where: { chatGroupId, userId: req.user.id, isDeleted: false },
    });
    if (!member) {
      throw new ForbiddenException(
        "Bạn không phải thành viên của room chat này",
      );
    }

    const chatGroup = await prisma.chatGroups.update({
      where: { id: chatGroupId },
      data: { name },
    });

    getIO()
      ?.to(chatRoomName(chatGroupId))
      .emit("CONVERSATION_UPDATED", { chatGroupId, name: chatGroup.name });

    return chatGroup;
  },

  // "xóa cuộc trò chuyện" kiểu Messenger: chỉ ẩn/rời khỏi phía người dùng hiện tại
  async remove(req) {
    const chatGroupId = Number(req.params.id);
    const userId = req.user.id;

    const member = await prisma.chatGroupMembers.findFirst({
      where: { chatGroupId, userId, isDeleted: false },
    });
    if (!member) {
      throw new ForbiddenException(
        "Bạn không phải thành viên của room chat này",
      );
    }

    await prisma.chatGroupMembers.update({
      where: { id: member.id },
      data: { isDeleted: true, deletedAt: new Date(), deletedBy: userId },
    });

    const remainingMembers = await prisma.chatGroupMembers.count({
      where: { chatGroupId, isDeleted: false },
    });

    if (remainingMembers === 0) {
      await prisma.chatGroups.update({
        where: { id: chatGroupId },
        data: { isDeleted: true, deletedAt: new Date(), deletedBy: userId },
      });
    }

    return true;
  },
};
