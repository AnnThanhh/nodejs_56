// Theo dõi user đang online (nhiều tab/thiết bị -> 1 userId có nhiều socketId)
// và giữ tham chiếu tới io instance để các service (chatGroup, chatMessage) có thể
// bắn realtime event mà không cần truyền io qua nhiều lớp.

const onlineUsers = new Map(); // userId -> Set<socketId>

let ioInstance = null;

export const setIO = (io) => {
  ioInstance = io;
};

export const getIO = () => ioInstance;

export const chatRoomName = (chatGroupId) => `chat:${chatGroupId}`;

export const userRoomName = (userId) => `user:${userId}`;

export const isUserOnline = (userId) => onlineUsers.has(userId);

export const getOnlineUserIds = (userIds) =>
  userIds.filter((userId) => onlineUsers.has(userId));

// trả về true nếu đây là socket đầu tiên của user (user vừa chuyển từ offline -> online)
export const addUserSocket = (userId, socketId) => {
  const wasOffline = !onlineUsers.has(userId);
  if (wasOffline) onlineUsers.set(userId, new Set());
  onlineUsers.get(userId).add(socketId);
  return wasOffline;
};

// trả về true nếu user không còn socket nào khác (user chuyển từ online -> offline)
export const removeUserSocket = (userId, socketId) => {
  const sockets = onlineUsers.get(userId);
  if (!sockets) return false;
  sockets.delete(socketId);
  if (!sockets.size) {
    onlineUsers.delete(userId);
    return true;
  }
  return false;
};
