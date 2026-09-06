import { BadRequestException, Injectable } from '@nestjs/common';
import { NobleCryptoPlugin, ScureBase32Plugin, TOTP } from 'otplib';
import { Users } from 'src/modules-system/prisma/generated/prisma/browser';
import * as qrcode from 'qrcode';
import { SaveTotpDto } from './dto/save-totp.dto';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
@Injectable()
export class TotpService {
  public totp: TOTP;

  constructor(private prisma: PrismaService) {
    this.totp = new TOTP({
      crypto: new NobleCryptoPlugin(),
      base32: new ScureBase32Plugin(),
    });
  }

  async generate(user: Users) {
    if (user.totpSecret) {
      throw new BadRequestException('Người dùng đã bật TOTP');
    }

    const secret = this.totp.generateSecret();

    const uri = this.totp.toURI({
      issuer: 'Nodejs56',
      secret: secret,
      label: user.email,
    });

    const qrCode = await qrcode.toDataURL(uri);

    return {
      secret,
      qrCode,
    };
  }

  async save(user: Users, body: SaveTotpDto) {
    if (user.totpSecret) {
      throw new BadRequestException('Người dùng đã bật TOTP');
    }

    const result = await this.totp.verify(body.token, {
      secret: body.secret,
    });

    if (!result.valid) {
      throw new BadRequestException('Mã TOTP không hợp lệ');
    }

    await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        totpSecret: body.secret,
      },
    });

    return true;
  }
}
