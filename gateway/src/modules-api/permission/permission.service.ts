import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { GrantPermissionDto } from './dto/grant-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { AssignUserRoleDto } from './dto/assign-user-role.dto';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  findAllRoles() {
    return this.prisma.roles.findMany({ orderBy: { id: 'asc' } });
  }

  createRole(dto: CreateRoleDto) {
    return this.prisma.roles.create({ data: dto });
  }

  findAllPermissions() {
    return this.prisma.permissions.findMany({ orderBy: { id: 'asc' } });
  }

  createPermission(dto: CreatePermissionDto) {
    return this.prisma.permissions.create({ data: dto });
  }

  findAllRolePermissions() {
    return this.prisma.rolePermissions.findMany({
      orderBy: { id: 'asc' },
      include: { Roles: true, Permissions: true },
    });
  }

  // cấp quyền cho role: nếu đã tồn tại cặp role-permission thì cập nhật lại isActive
  grantPermission(dto: GrantPermissionDto) {
    return this.prisma.rolePermissions.upsert({
      where: {
        roleId_permissionId: {
          roleId: dto.roleId,
          permissionId: dto.permissionId,
        },
      },
      create: {
        roleId: dto.roleId,
        permissionId: dto.permissionId,
        isActive: dto.isActive ?? true,
      },
      update: { isActive: dto.isActive ?? true },
    });
  }

  async updateRolePermission(id: number, dto: UpdateRolePermissionDto) {
    const rolePermission = await this.prisma.rolePermissions.findUnique({
      where: { id },
    });
    if (!rolePermission) {
      throw new NotFoundException('Không tìm thấy role_permission');
    }
    return this.prisma.rolePermissions.update({
      where: { id },
      data: { isActive: dto.isActive },
    });
  }

  async revokePermission(id: number) {
    const rolePermission = await this.prisma.rolePermissions.findUnique({
      where: { id },
    });
    if (!rolePermission) {
      throw new NotFoundException('Không tìm thấy role_permission');
    }
    return this.prisma.rolePermissions.delete({ where: { id } });
  }

  findAllUsers() {
    return this.prisma.users.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        email: true,
        fullName: true,
        roleId: true,
        Roles: true,
      },
    });
  }

  async assignUserRole(id: number, dto: AssignUserRoleDto) {
    const role = await this.prisma.roles.findUnique({
      where: { id: dto.roleId },
    });
    if (!role) {
      throw new BadRequestException('Role không tồn tại');
    }
    return this.prisma.users.update({
      where: { id },
      data: { roleId: dto.roleId },
      select: { id: true, email: true, fullName: true, roleId: true },
    });
  }
}
