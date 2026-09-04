import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { GrantPermissionDto } from './dto/grant-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';

// toàn bộ route trong controller này chỉ được cấp quyền cho role "superAD" (xem seed-permission.ts)
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('roles')
  findAllRoles() {
    return this.permissionService.findAllRoles();
  }

  @Post('roles')
  createRole(@Body() dto: CreateRoleDto) {
    return this.permissionService.createRole(dto);
  }

  @Get('permissions')
  findAllPermissions() {
    return this.permissionService.findAllPermissions();
  }

  @Post('permissions')
  createPermission(@Body() dto: CreatePermissionDto) {
    return this.permissionService.createPermission(dto);
  }

  @Get('role-permissions')
  findAllRolePermissions() {
    return this.permissionService.findAllRolePermissions();
  }

  @Post('role-permissions')
  grantPermission(@Body() dto: GrantPermissionDto) {
    return this.permissionService.grantPermission(dto);
  }

  @Patch('role-permissions/:id')
  updateRolePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRolePermissionDto,
  ) {
    return this.permissionService.updateRolePermission(id, dto);
  }

  @Delete('role-permissions/:id')
  revokePermission(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.revokePermission(id);
  }

  @Get('users')
  findAllUsers() {
    return this.permissionService.findAllUsers();
  }

  @Patch('users/:id/role')
  assignUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignUserRoleDto,
  ) {
    return this.permissionService.assignUserRole(id, dto);
  }
}
