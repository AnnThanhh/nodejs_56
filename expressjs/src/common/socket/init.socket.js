import { createServer } from "http";
import { Server } from "socket.io";
import cookie from "cookie";
import { tokenService } from "../../services/token.service.js";
import { prisma } from "../prisma/connect.prisma.js";
import { chatGroupService } from "../../services/chatGroup.service.js";
import { chatMessageService } from "../../services/chatMessage.service.js";
import {
  setIO,
  chatRoomName,
  userRoomName,
  addUserSocket,
  removeUserSocket,
  isUserOnline,
} from "./presence.js";

// FE (localhost:3000) có thể truyền accessToken theo 3 cách, ưu tiên theo thứ tự dưới
const extractAccessToken = (socket) => {
  const fromAuth = socket.handshake.auth?.accessToken;
  if (fromAuth) return fromAuth;

  const fromQuery = socket.handshake.query?.accessToken;
  if (fromQuery) return fromQuery;

  const rawCookie = socket.handshake.headers?.cookie;
  if (rawCookie) {
    const parsed = cookie.parse(rawCookie);
    if (parsed.accessToken) return parsed.accessToken;
  }

  return null;
};

// những id chatGroup mà socket hiện đang tham gia (dựa vào các room đã join)
const currentChatGroupIds = (socket) =>
  Array.from(socket.rooms)
    .filter((room) => room.startsWith("chat:"))
    .map((room) => Number(room.replace("chat:", "")));

// khi user vừa online, các tin nhắn đang "chưa nhận" gửi cho họ -> chuyển thành "đã nhận"
const markPendingMessagesAsDelivered = async (io, userId, chatGroupIds) => {
  if (!chatGroupIds.length) return;

  const pending = await prisma.chatMessageReceipts.findMany({
    where: {
      userId,
      deliveredAt: null,
      chatGroupId: { in: chatGroupIds },
    },
    select: { id: true, chatMessageId: true, chatGroupId: true },
  });
  if (!pending.length) return;

  const deliveredAt = new Date();
  await prisma.chatMessageReceipts.updateMany({
    where: { id: { in: pending.map((p) => p.id) } },
    data: { deliveredAt },
  });

  const byGroup = new Map();
  pending.forEach((p) => {
    if (!byGroup.has(p.chatGroupId)) byGroup.set(p.chatGroupId, []);
    byGroup.get(p.chatGroupId).push(p.chatMessageId);
  });

  byGroup.forEach((messageIds, chatGroupId) => {
    io.to(chatRoomName(chatGroupId)).emit("MESSAGE_DELIVERED", {
      chatGroupId,
      userId,
      messageIds,
      deliveredAt,
    });
  });
};

const handleConnection = async (io, socket) => {
  const userId = socket.userId;
  console.log("socket connected", socket.id, "user", userId);

  const justCameOnline = addUserSocket(userId, socket.id);
  socket.join(userRoomName(userId));

  // tự động join tất cả các room chat mà user đang là thành viên
  // -> vừa vào web là đã realtime, không cần bấm vào profile mới join room
  const myMemberships = await prisma.chatGroupMembers.findMany({
    where: { userId, isDeleted: false },
    select: { chatGroupId: true },
  });
  const chatGroupIds = myMemberships.map((m) => m.chatGroupId).filter(Boolean);
  chatGroupIds.forEach((id) => socket.join(chatRoomName(id)));

  if (justCameOnline) {
    chatGroupIds.forEach((id) =>
      socket.to(chatRoomName(id)).emit("USER_ONLINE", { userId }),
    );
    await markPendingMessagesAsDelivered(io, userId, chatGroupIds);
  }

  // báo cho FE biết trong số các cuộc trò chuyện của mình, ai đang online sẵn
  const contacts = await prisma.chatGroupMembers.findMany({
    where: {
      chatGroupId: { in: chatGroupIds },
      isDeleted: false,
      userId: { not: userId },
    },
    select: { userId: true },
  });
  const onlineContactIds = Array.from(
    new Set(contacts.map((c) => c.userId)),
  ).filter(isUserOnline);
  socket.emit("ONLINE_USERS", { userIds: onlineContactIds });

  socket.on("CREATE_ROOM", async (data, cb) => {
    try {
      const { targetUserIds, name } = data || {};
      const { chatGroup, isNew } = await chatGroupService.findOrCreateGroup({
        userId,
        targetUserIds,
        name,
      });

      cb?.({
        status: "success",
        message: isNew ? "Tạo room chat thành công" : "Room chat đã tồn tại",
        data: { chatGroupId: chatGroup.id },
      });
    } catch (error) {
      cb?.({
        status: "error",
        data: null,
        message: error.message || "Lỗi không xác định",
      });
    }
  });

  // khi đã có chatGroup, user click vào 1 box chat -> chỉ cần join phòng (đã join sẵn từ lúc connect)
  socket.on("JOIN_ROOM", async (data, cb) => {
    try {
      const { chatGroupId } = data || {};
      if (!chatGroupId) throw new Error("chatGroupId không tồn tại");

      const member = await prisma.chatGroupMembers.findFirst({
        where: { chatGroupId: Number(chatGroupId), userId, isDeleted: false },
      });
      if (!member)
        throw new Error("Bạn không phải thành viên của room chat này");

      socket.join(chatRoomName(chatGroupId));

      cb?.({
        status: "success",
        message: "Tham gia room chat thành công",
        data: { chatGroupId },
      });
    } catch (error) {
      cb?.({
        status: "error",
        data: null,
        message: error.message || "Lỗi không xác định",
      });
    }
  });

  socket.on("SEND_MESSAGE", async (data, cb) => {
    try {
      const { chatGroupId, message } = data || {};
      const result = await chatMessageService.sendMessage({
        chatGroupId,
        senderId: userId,
        messageText: message,
      });

      cb?.({
        status: "success",
        message: "Gửi tin nhắn thành công",
        data: result,
      });
    } catch (error) {
      cb?.({
        status: "error",
        data: null,
        message: error.message || "Lỗi không xác định",
      });
    }
  });

  // đánh dấu đã xem toàn bộ tin nhắn trong 1 room (gọi khi user mở/focus vào box chat)
  socket.on("MESSAGE_SEEN", async (data, cb) => {
    try {
      const { chatGroupId } = data || {};
      const result = await chatMessageService.markSeen({ chatGroupId, userId });
      cb?.({ status: "success", message: "Đã đánh dấu đã xem", data: result });
    } catch (error) {
      cb?.({
        status: "error",
        data: null,
        message: error.message || "Lỗi không xác định",
      });
    }
  });

  // typing indicator: chỉ bắn tới các room mà socket này thực sự đã join
  socket.on("TYPING", ({ chatGroupId } = {}) => {
    if (!chatGroupId || !socket.rooms.has(chatRoomName(chatGroupId))) return;
    socket
      .to(chatRoomName(chatGroupId))
      .emit("TYPING", { chatGroupId, userId });
  });

  socket.on("STOP_TYPING", ({ chatGroupId } = {}) => {
    if (!chatGroupId || !socket.rooms.has(chatRoomName(chatGroupId))) return;
    socket
      .to(chatRoomName(chatGroupId))
      .emit("STOP_TYPING", { chatGroupId, userId });
  });

  socket.on("disconnect", async () => {
    const wentOffline = removeUserSocket(userId, socket.id);
    if (!wentOffline) return;

    const lastActiveAt = new Date();
    const groupIds = currentChatGroupIds(socket);

    prisma.users
      .update({ where: { id: userId }, data: { lastActiveAt } })
      .catch((error) =>
        console.error("Không thể cập nhật lastActiveAt:", error),
      );

    groupIds.forEach((id) =>
      socket
        .to(chatRoomName(id))
        .emit("USER_OFFLINE", { userId, lastActiveAt }),
    );
  });
};

export const initSocket = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  setIO(io);

  // xác thực 1 lần duy nhất lúc handshake, thay vì phải gửi lại accessToken ở mỗi event
  io.use(async (socket, next) => {
    try {
      const accessToken = extractAccessToken(socket);
      if (!accessToken) return next(new Error("UNAUTHORIZED"));

      const { userId } = tokenService.verifyAccessToken(accessToken);
      const userExists = await prisma.users.findUnique({
        where: { id: userId },
      });
      if (!userExists) return next(new Error("UNAUTHORIZED"));

      socket.userId = userExists.id;
      next();
    } catch (error) {
      next(new Error("UNAUTHORIZED"));
    }
  });

  io.on("connection", (socket) => handleConnection(io, socket));

  return httpServer;
};
