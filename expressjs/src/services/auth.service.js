import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const authService = {
  async register(req) {
    const { email, password, fullName } = req.body;
    console.log(email, password, fullName);

    //kiểm tra email đã được đăng ký chưa
    const userExit = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    //nếu đăng ký rồi -> từ chối đăng ký
    if (userExit) {
      throw new BadRequestException("Email đã được đăng ký");
    }
    //nếu chưa đăng ký -> tạo mới user
    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: password,
        fullName: fullName,
      },
    });
    return true;
  },

  async login(req) {
    return `This action login`;
  },
};
