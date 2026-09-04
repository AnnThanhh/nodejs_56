import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

const METHODS = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsIn(METHODS, { message: `method phải là một trong: ${METHODS.join(', ')}` })
  method: string;

  // route pattern gốc của Nest, không kèm global prefix 'api', vd: /article/:id
  @IsNotEmpty()
  @IsString()
  @Matches(/^\//, { message: 'url phải bắt đầu bằng /' })
  url: string;
}
