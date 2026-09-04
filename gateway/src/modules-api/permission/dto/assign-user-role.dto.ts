import { IsInt } from 'class-validator';

export class AssignUserRoleDto {
  @IsInt()
  roleId: number;
}
