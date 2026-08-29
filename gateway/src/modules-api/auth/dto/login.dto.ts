import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'vui lòng nhập email hợp lệ' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
