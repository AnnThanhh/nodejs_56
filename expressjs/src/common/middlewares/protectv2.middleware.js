import { tokenService } from "../../services/token.service.js";
import { UnauthorizedException } from "../helpers/exception.helper.js";
import { prisma } from "../prisma/connect.prisma.js";

export const protectv2 = async (req, res, next) => {
  // định dạng authen token trên header: Bearer <accessToken>
  // bước 1: lấy token ra từ header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedException("Vui lòng đăng nhập để tiếp tục");
  }

  // bước 2: lấy accessToken ra từ header
  const accessToken = authHeader.split(" ")[1];

  // bước 3: kiểm tra accessToken có hợp lệ hay không
  const decode = tokenService.verifyAccessToken(accessToken);

  if (!decode) {
    throw new UnauthorizedException("Token không hợp lệ");
  }

  const userExist = await prisma.users.findUnique({
    where: {
      id: decode.userId,
    },
  });

  if (!userExist) {
    throw new UnauthorizedException("Người dùng không tồn tại");
  }

  req.user = userExist;
  next();
};
