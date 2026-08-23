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

    socket.on("CREATE_ROOM", async (data, cb) => {
      let { targetUserIds, accessToken } = data;
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
      } else {
        //tạo room chat nhóm
      }

      console.log("CREATE_ROOM", {
        targetUserIDUnique,
        accessToken,
        userId,
        userExits,
      });
    });
  });                                                                                

  return httpServer;
};
