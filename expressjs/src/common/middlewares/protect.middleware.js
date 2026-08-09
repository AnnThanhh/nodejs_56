import { tokenService } from "../../services/token.service.js";
import { BadRequestException } from "../helpers/exception.helper.js";
import { prisma } from "../prisma/connect.prisma.js";
export const protect = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new BadRequestException("không có accessToken");
  }

  //verify accessToken
  const decode = tokenService.verifyAccessToken(accessToken);

  const userExits = await prisma.users.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!userExits) {
    throw new BadRequestException("User không tồn tại");
  }

  req.user = userExits;
  next();
};
