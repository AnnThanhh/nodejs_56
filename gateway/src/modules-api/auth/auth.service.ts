import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { TokenService } from 'src/modules-system/token/token.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokenService: TokenService,
  ) {}
  async login(body: LoginDto) {
    const { email, password } = body;
    //kiểm tra email đã được đăng ký chưa
    const userExit = await this.prisma.users.findUnique({
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
        'Email chưa được đăng ký. Vui lòng đăng ký tài khoản.',
      );
    }

    // if (!userExit.password) {
    //   throw new BadRequestException('Vui lòng nhập mật khẩu.');
    // }

    //đã đăng ký -> xử lý logic đăng nhập
    const isPasswordValid = bcrypt.compareSync(password, userExit.password); //true

    if (!isPasswordValid) {
      // throw new BadRequestException("Tài khoản không chính xác.");
      throw new BadRequestException(
        'Mật khẩu không chính xác. Vui lòng thử lại.',
      );
    }

    const accessToken = this.tokenService.createAccessToken(userExit.id);

    const refreshToken = this.tokenService.createRefreshToken(userExit.id);
    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
