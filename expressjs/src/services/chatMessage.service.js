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
  getOnlineUserIds,
} from "../common/socket/presence.js";

const USER_PREVIEW_SELECT = { id: true, fullName: true, avatar: true };

const ensureMember = async (chatGroupId, userId) => {
  const member = await prisma.chatGroupMembers.findFirst({
    where: { chatGroupId, userId, isDeleted: false },
  });
  if (!member) {
    throw new ForbiddenException("Bạn không phải thành viên của room chat này");
  }
  return member;
};

export const chatMessageService = {
  // dùng chung cho REST (POST /chat-message) và socket (SEND_MESSAGE)
  async sendMessage({ chatGroupId, senderId, messageText }) {
    chatGroupId = Number(chatGroupId);
    if (!chatGroupId) {
      throw new BadRequestException("chatGroupId không hợp lệ");
    }
    if (!messageText || !messageText.trim()) {
      throw new BadRequestException("Nội dung tin nhắn không được để trống");
    }

    await ensureMember(chatGroupId, senderId);

    const otherMembers = await prisma.chatGroupMembers.findMany({
      where: { chatGroupId, isDeleted: false, userId: { not: senderId } },
      select: { userId: true },
    });
    const otherUserIds = otherMembers.map((m) => m.userId);
    const onlineUserIds = getOnlineUserIds(otherUserIds);

    const message = await prisma.chatMessages.create({
      data: {
        chatGroupId,
        userIdSender: senderId,
        messageText: messageText.trim(),
      },
      include: { Users: { select: USER_PREVIEW_SELECT } },
    });

    // tạo sẵn receipt cho từng thành viên còn lại, đánh dấu delivered ngay nếu họ đang online
    if (otherUserIds.length) {
      await prisma.chatMessageReceipts.createMany({
        data: otherUserIds.map((userId) => ({
          chatMessageId: message.id,
          chatGroupId,
          userId,
          deliveredAt: onlineUserIds.includes(userId) ? new Date() : null,
        })),
      });
    }

    // để danh sách hội thoại sắp xếp theo tin nhắn mới nhất lên đầu
    await prisma.chatGroups.update({
      where: { id: chatGroupId },
      data: { updatedAt: new Date() },
    });

    const io = getIO();
    io?.to(chatRoomName(chatGroupId)).emit("SEND_MESSAGE", message);

    if (onlineUserIds.length) {
      io?.to(chatRoomName(chatGroupId)).emit("MESSAGE_DELIVERED", {
        chatGroupId,
        messageIds: [message.id],
        userIds: onlineUserIds,
        deliveredAt: message.createdAt,
      });
    }

    return message;
  },

  // đánh dấu toàn bộ tin nhắn chưa xem trong room là đã xem bởi userId
  async markSeen({ chatGroupId, userId }) {
    chatGroupId = Number(chatGroupId);
    await ensureMember(chatGroupId, userId);

    const pending = await prisma.chatMessageReceipts.findMany({
      where: { chatGroupId, userId, seenAt: null },
      select: { id: true, chatMessageId: true, deliveredAt: true },
    });

    if (!pending.length) {
      return { messageIds: [], seenAt: null };
    }

    const seenAt = new Date();
    const notYetDeliveredIds = pending
      .filter((p) => !p.deliveredAt)
      .map((p) => p.id);
    const alreadyDeliveredIds = pending
      .filter((p) => p.deliveredAt)
      .map((p) => p.id);

    if (notYetDeliveredIds.length) {
      await prisma.chatMessageReceipts.updateMany({
        where: { id: { in: notYetDeliveredIds } },
        data: { deliveredAt: seenAt, seenAt },
      });
    }
    if (alreadyDeliveredIds.length) {
      await prisma.chatMessageReceipts.updateMany({
        where: { id: { in: alreadyDeliveredIds } },
        data: { seenAt },
      });
    }

    const messageIds = pending.map((p) => p.chatMessageId);

    getIO()?.to(chatRoomName(chatGroupId)).emit("MESSAGE_SEEN", {
      chatGroupId,
      userId,
      messageIds,
      seenAt,
    });

    return { messageIds, seenAt };
  },

  async create(req) {
    const { chatGroupId, message } = req.body;
    return this.sendMessage({
      chatGroupId,
      senderId: req.user.id,
      messageText: message,
    });
  },

  async findAll(req) {
    const { where, page, pageSize, index } = buildQueryPrisma(req);

    if (!where.chatGroupId) {
      throw new BadRequestException("Vui lòng truyền filters.chatGroupId");
    }
    await ensureMember(Number(where.chatGroupId), req.user.id);

    const resultPrisma = await prisma.chatMessages.findMany({
      where: where,
      skip: index, //Offset
      take: pageSize, //Limit
      include: {
        Users: { select: USER_PREVIEW_SELECT },
        ChatMessageReceipts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalItems = await prisma.chatMessages.count({
      where: where,
    });
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      items: resultPrisma,
      totalItems: totalItems,
      totalPages: totalPages,
      page: page,
      pageSize: pageSize,
    };
  },

  async findOne(req) {
    const id = Number(req.params.id);
    const message = await prisma.chatMessages.findUnique({
      where: { id },
      include: {
        Users: { select: USER_PREVIEW_SELECT },
        ChatMessageReceipts: true,
      },
    });

    if (!message || message.isDeleted) {
      throw new NotFoundException("Tin nhắn không tồn tại");
    }

    await ensureMember(message.chatGroupId, req.user.id);

    return message;
  },

  async update(req) {
    const id = Number(req.params.id);
    const { message } = req.body;

    const existing = await prisma.chatMessages.findUnique({ where: { id } });
    if (!existing || existing.isDeleted) {
      throw new NotFoundException("Tin nhắn không tồn tại");
    }
    if (existing.userIdSender !== req.user.id) {
      throw new ForbiddenException(
        "Bạn chỉ có thể chỉnh sửa tin nhắn của chính mình",
      );
    }
    if (!message || !message.trim()) {
      throw new BadRequestException("Nội dung tin nhắn không được để trống");
    }

    const updated = await prisma.chatMessages.update({
      where: { id },
      data: { messageText: message.trim(), isEdited: true },
    });

    getIO()
      ?.to(chatRoomName(existing.chatGroupId))
      .emit("MESSAGE_UPDATED", updated);

    return updated;
  },

  // thu hồi tin nhắn (unsend) kiểu Messenger, hiển thị "tin nhắn đã bị thu hồi" cho mọi người
  async remove(req) {
    const id = Number(req.params.id);

    const existing = await prisma.chatMessages.findUnique({ where: { id } });
    if (!existing || existing.isDeleted) {
      throw new NotFoundException("Tin nhắn không tồn tại");
    }
    if (existing.userIdSender !== req.user.id) {
      throw new ForbiddenException(
        "Bạn chỉ có thể thu hồi tin nhắn của chính mình",
      );
    }

    await prisma.chatMessages.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date(), deletedBy: req.user.id },
    });

    getIO()
      ?.to(chatRoomName(existing.chatGroupId))
      .emit("MESSAGE_DELETED", {
        chatGroupId: existing.chatGroupId,
        messageId: id,
      });

    return true;
  },
};
