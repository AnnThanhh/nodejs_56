// Seed dữ liệu phân quyền: Roles, Permissions, RolePermissions
// Chạy sau khi build: node dist/modules-system/prisma/seed-permission.js
import 'dotenv/config';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const url = new URL(process.env.DATABASE_URL as string);
const adapter = new PrismaMariaDb({
  user: url.username,
  password: url.password,
  host: url.hostname,
  port: Number(url.port),
  database: url.pathname.slice(1),
});
const prisma = new PrismaClient({ adapter });

// url ở đây là route pattern gốc của Nest (không kèm global prefix 'api'), khớp với RoleGuard
const PERMISSIONS = [
  { method: 'POST', url: '/auth/login' },
  { method: 'GET', url: '/auth/get-info' },
  { method: 'GET', url: '/article' },
  { method: 'GET', url: '/article/:id' },
  { method: 'POST', url: '/article' },
  { method: 'PATCH', url: '/article/:id' },
  { method: 'DELETE', url: '/article/:id' },
];

// route quản trị phân quyền (module permission) - chỉ superAD được cấp, dùng để build UI quản lý role/permission
const SUPERADMIN_PERMISSIONS = [
  { method: 'GET', url: '/permission/roles' },
  { method: 'POST', url: '/permission/roles' },
  { method: 'GET', url: '/permission/permissions' },
  { method: 'POST', url: '/permission/permissions' },
  { method: 'GET', url: '/permission/role-permissions' },
  { method: 'POST', url: '/permission/role-permissions' },
  { method: 'PATCH', url: '/permission/role-permissions/:id' },
  { method: 'DELETE', url: '/permission/role-permissions/:id' },
  { method: 'GET', url: '/permission/users' },
  { method: 'PATCH', url: '/permission/users/:id/role' },
];

// role -> danh sách permission được cấp (superAD full quyền + quản trị phân quyền, admin CRUD nghiệp vụ, user chỉ đọc)
const ROLE_PERMISSIONS: Record<string, { method: string; url: string }[]> = {
  superAD: [...PERMISSIONS, ...SUPERADMIN_PERMISSIONS],
  admin: PERMISSIONS,
  user: [
    { method: 'GET', url: '/auth/get-info' },
    { method: 'GET', url: '/article' },
    { method: 'GET', url: '/article/:id' },
  ],
};

async function main() {
  const allPermissions = [...PERMISSIONS, ...SUPERADMIN_PERMISSIONS];

  for (const nameRole of Object.keys(ROLE_PERMISSIONS)) {
    await prisma.roles.upsert({
      where: { nameRole },
      create: { nameRole },
      update: {},
    });
  }

  for (const permission of allPermissions) {
    await prisma.permissions.upsert({
      where: { method_url: permission },
      create: permission,
      update: {},
    });
  }

  for (const [nameRole, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    const role = await prisma.roles.findUniqueOrThrow({ where: { nameRole } });

    for (const permission of permissions) {
      const permissionRow = await prisma.permissions.findUniqueOrThrow({
        where: { method_url: permission },
      });

      await prisma.rolePermissions.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permissionRow.id,
          },
        },
        create: {
          roleId: role.id,
          permissionId: permissionRow.id,
          isActive: true,
        },
        update: { isActive: true },
      });
    }
  }

  console.log('✅ Seed roles/permissions thành công');
}

main()
  .catch((error) => {
    console.error('❌ Seed thất bại:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
