import { createServer } from "http";
import { Server } from "socket.io";
import { tokenService } from "../../services/token.service.js";
import { prisma } from "../prisma/connect.prisma.js";

export const initSocket = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    /* options */
  });

  io.on("connection", (socket) => {
    console.log("socket-id", socket.id);

    //dùng khi chưa có chatGroup
    //trạng thái ban đầu, user muốn tin với một người hoàn toàn mới
    //hỗ trợ tạo mới
    socket.on("CREATE_ROOM", async (data, cb) => {
      try {
        let { targetUserIds, accessToken, name } = data;
        //kiểm trả thông tin userId
        const { userId } = tokenService.verifyAccessToken(accessToken);
        const userExits = await prisma.users.findUnique({
          where: {
            id: userId,
          },
        });
        // targetUserIds = [2, 2, 3, 3, 4];
        // loại bỏ các user trùng nhau
        const targetUserIDUniqueSet = new Set([...targetUserIds, userId]);
        const targetUserIDUnique = Array.from(targetUserIDUniqueSet);

        if (targetUserIDUnique.length === 2) {
          //tạo room chat 1-1
          //1. kiểm tra xem chatGroup đã tồn tại chưa
          let chatGroup = await prisma.chatGroups.findFirst({
            where: {
              ChatGroupMembers: {
                // kiểm tra bản ghi
                //every: tất cả các bản ghi trong db đều phải thỏa mãn điều kiện
                //some: chỉ có ít nhất 1 bản ghi trong db thỏa mãn điều kiện
                // none: không có bản ghi nào trong db thỏa mãn điều kiện
                every: {
                  userId: {
                    in: targetUserIDUnique,
                  },
                },
              },
            },
          });
          //2. chưa -> tạo mới
          if (!chatGroup) {
            chatGroup = await prisma.chatGroups.create({
              data: {
                ownerId: userExits.id,
              },
            });

            await prisma.chatGroupMembers.createMany({
              data: [
                { userId: targetUserIDUnique[0], chatGroupId: chatGroup.id },
                {
                  userId: targetUserIDUnique[1],
                  chatGroupId: chatGroup.id,
                },
              ],
            });
          }

          //3. đã tồn tại -> cho đi tiếp (kết nối vào room chat)
          socket.join(`chat:${chatGroup.id}`);

          cb({
            status: "success",
            message: "Tạo room chat thành công",
            data: {
              chatGroupId: chatGroup.id,
            },
          });
          console.log("rooms", io.sockets.adapter.rooms);
        } else {
          //tạo room chat nhóm
          const chatGroup = await prisma.chatGroups.create({
            data: {
              ownerId: userExits.id,
              name: name,
            },
          });

          await prisma.chatGroupMembers.createMany({
            data: targetUserIDUnique.map((userId) => {
              return {
                userId: userId,
                chatGroupId: chatGroup.id,
              };
            }),
          });

          socket.join(`chat:${chatGroup.id}`);

          cb({
            status: "success",
            message: "Tạo room chat nhóm thành công",
            data: {
              chatGroupId: chatGroup.id,
            },
          });

          console.log("CREATE_ROOM", {
            name,
            targetUserIDUnique,
            accessToken,
            userId,
            userExits,
          });
        }
      } catch (error) {
        cb({
          status: "error",
          data: null,
          message: error.message || "Lỗi không xác định",
        });
      }
    });

    //khi đã có chatGroup
    //user click một chatgroup bất kỳ (1 box chat)
    socket.on("JOIN_ROOM", async (data, cb) => {
      const { chatGroupId, accessToken } = data;
      const { userId } = tokenService.verifyAccessToken(accessToken);
      const userExits = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!userExits) {
        throw new Error("User không tồn tại");
      }

      if (!chatGroupId) {
        throw new Error("chatGroupId không tồn tại");
      }

      socket.join(`chat:${chatGroupId}`);

      cb({
        status: "success",
        message: "Tham gia room chat thành công",
        data: {
          chatGroupId: chatGroupId,
        },
      });
    });

    socket.on("SEND_MESSAGE", async (data, cb) => {
      const { chatGroupId, accessToken, message } = data;
      const { userId } = tokenService.verifyAccessToken(accessToken);
      // lưu thông tin của người dùng vào cache, trên be/redis -> giảm tải số lần query vào db
      const userExits = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!userExits) {
        throw new Error("User không tồn tại");
      }

      if (!chatGroupId) {
        throw new Error("chatGroupId không tồn tại");
      }
      const createdAt = new Date().toISOString();

      //gửi thông tin người nhận
      io.to(`chat:${chatGroupId}`).emit("SEND_MESSAGE", {
        chatGroupId: chatGroupId,
        userIdSender: userId,
        messageText: message,
        createdAt: createdAt,
      });

      //lưu tin nhắn vào db
      await prisma.chatMessages.create({
        data: {
          chatGroupId: chatGroupId,
          userIdSender: userId,
          messageText: message,
          createdAt: createdAt,
        },
      });
    });
  });

  return httpServer;
};
