import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateRolePermissionDto {
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
