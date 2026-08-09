import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";
export const authService = {
  async register(req) {
    const { email, password, fullName } = req.body;

    //kiểm tra email đã được đăng ký chưa
    const userExit = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    //nếu đăng ký rồi -> từ chối đăng ký
    if (userExit) {
      throw new BadRequestException("Tài khoản đã được đăng ký");
    }
    //nếu chưa đăng ký -> tạo mới user
    //bcrypt
    //hash password, không thể dịch ngược lại
    // chỉ có thể so sách

    //10 là số lần băm, càng cao thì càng an toàn nhưng sẽ tốn thời gian hơn
    //giá trị 10 là giá trị khuyên dùng, đủ an toàn và không tốn thời gian quá nhiều
    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: hashPassword,
        fullName: fullName,
      },
    });
    return true;
  },

  async login(req) {
    const { email, password } = req.body;

    //kiểm tra email đã được đăng ký chưa
    const userExit = await prisma.users.findUnique({
      where: {
        email: email,
      },
      omit: {
        password: false, // lấy cột password ra
      },
    });
    //chưa -> yêu cầu đăng ký
    if (!userExit) {
      // throw new BadRequestException("Tài khoản không chính xác");
      throw new BadRequestException(
        "Email chưa được đăng ký. Vui lòng đăng ký tài khoản.",
      );
    }

    //đã đăng ký -> xử lý logic đăng nhập
    const isPasswordValid = bcrypt.compareSync(password, userExit.password); //true

    if (!isPasswordValid) {
      // throw new BadRequestException("Tài khoản không chính xác.");
      throw new BadRequestException(
        "Mật khẩu không chính xác. Vui lòng thử lại.",
      );
    }

    const accessToken = tokenService.createAccessToken(userExit.id);

    const refreshToken = "";
    return { accessToken: accessToken, refreshToken: refreshToken };
  },

  async getInfo(req) {
    const user = req.user;
    return user;
  },
};
