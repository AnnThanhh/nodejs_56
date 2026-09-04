import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class GrantPermissionDto {
  @IsInt()
  roleId: number;

  @IsInt()
  permissionId: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
