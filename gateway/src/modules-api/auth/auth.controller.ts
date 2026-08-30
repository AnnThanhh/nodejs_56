import { Data } from './../../../node_modules/effect/dist/dts/Schema.d';
import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/decorators/role.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //DTO: Data tranfer object
  @Post('login')
  @Public()
  async login(
    @Body()
    body: LoginDto,
    // @Query, @Param
    // cho phép trả về response trực tiếp mà không cần NestJS tự động gửiv
    @Res({ passthrough: true })
    res: Response,
  ) {
    const result = await this.authService.login(body);
    res.cookie('accessToken', result.accessToken);
    res.cookie('refreshToken', result.refreshToken);
    return true;
  }

  @Get('get-info')
  @Role("ADMIN")
  async getInfo(@User() user) {
    return user;
  }
}
