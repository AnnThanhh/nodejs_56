# Phân quyền (RBAC) lưu trong DB — dự án `gateway`

Tài liệu mô tả lại toàn bộ phần phân quyền đã triển khai cho dự án NestJS `gateway`, thay thế cho
cách hardcode role (`@Role("ADMIN")`) trên từng API.

## 1. Mô hình dữ liệu (Prisma — `prisma/schema.prisma`)

```
Users        (n) --- (1) Roles
Roles        (1) --- (n) RolePermissions
Permissions  (1) --- (n) RolePermissions
```

- `Roles`: `id`, `nameRole` (unique). Đã seed sẵn 3 role theo đúng thứ tự id:
  - `1` → `superAD`
  - `2` → `admin`
  - `3` → `user`
- `Permissions`: `id`, `method` (GET/POST/PATCH/DELETE...), `url` (route pattern gốc của Nest,
  **không** kèm global prefix `api`, ví dụ `/article/:id`). Unique theo cặp `(method, url)`.
- `RolePermissions`: bảng trung gian nối `Roles` ↔ `Permissions`, có thêm cột `isActive` để
  bật/tắt một quyền mà không cần xoá dữ liệu. Unique theo cặp `(roleId, permissionId)`.
- `Users.roleId`: FK nullable trỏ tới `Roles`. User chưa có `roleId` sẽ không qua được `RoleGuard`.

## 2. Cách kiểm tra quyền lúc runtime

- `src/common/guard/protect.guard.ts`: xác thực `accessToken`, lấy user kèm `Roles` từ DB, gán
  vào `req.user` (có `roleId`).
- `src/common/guard/role.guard.ts`: chạy sau `ProtectGuard`, áp dụng cho **mọi** route (global
  guard) trừ route có `@Public()`.
  1. Tự dựng lại "route pattern gốc" bằng cách đọc `PATH_METADATA` của Controller + Handler
     (không phụ thuộc Express `req.route`), ví dụ `Controller('article')` + `@Patch(':id')`
     → `/article/:id`.
  2. Query:
     ```ts
     prisma.rolePermissions.findFirst({
       where: {
         roleId: user.roleId,
         isActive: true,
         Permissions: { method: req.method, url },
       },
     });
     ```
  3. Không tìm thấy → `403 Forbidden`. Tìm thấy → cho qua Controller.
- Vì kiểm tra dựa 100% vào DB nên **không cần** decorator `@Role()` gắn cứng trên controller nữa
  (file `role.decorator.ts` cũ đã bị xoá).

## 3. Seed dữ liệu quyền

File: `src/modules-system/prisma/seed-permission.ts`

- Khai báo danh sách permission nghiệp vụ (`PERMISSIONS`: login, get-info, CRUD `/article`) và
  danh sách permission quản trị phân quyền (`SUPERADMIN_PERMISSIONS`: toàn bộ route của
  `permission.controller.ts`).
- Gán quyền theo role:
  - `superAD`: `PERMISSIONS` + `SUPERADMIN_PERMISSIONS` (toàn quyền, kể cả quản trị RBAC).
  - `admin`: chỉ `PERMISSIONS` (CRUD nghiệp vụ, **không** được sửa role/permission).
  - `user`: chỉ các API `GET` (đọc).
- Chạy lại mỗi khi thêm route/permission mới:
  ```bash
  npx nest build
  node dist/src/modules-system/prisma/seed-permission.js
  ```

> Vì Prisma 7 generator `prisma-client` xuất ra **TypeScript thô** (không phải `.js` biên dịch
> sẵn) trong `src/modules-system/prisma/generated/prisma`, script seed phải nằm trong `src/`, được
> build bằng `nest build` rồi chạy file `.js` trong `dist/src/...` bằng `node` — chạy trực tiếp
> bằng `ts-node` sẽ báo lỗi `Cannot find module '.../client.js'`.

## 4. API quản trị phân quyền cho superadmin (`src/modules-api/permission`)

Module `PermissionModule` cung cấp API để một UI admin có thể quản lý role/permission/gán role
cho user, **chỉ role `superAD` mới được cấp quyền gọi các route này** (xem
`SUPERADMIN_PERMISSIONS` ở seed script — `admin`/`user` gọi vào sẽ nhận `403`).

| Method | URL (chưa kèm `/api`)              | Chức năng                                        |
| ------ | ---------------------------------- | ------------------------------------------------ |
| GET    | `/permission/roles`                | Danh sách role                                   |
| POST   | `/permission/roles`                | Tạo role mới                                     |
| GET    | `/permission/permissions`          | Danh sách permission (method + url)              |
| POST   | `/permission/permissions`          | Tạo permission mới                               |
| GET    | `/permission/role-permissions`     | Danh sách quyền đã cấp (kèm role, permission)    |
| POST   | `/permission/role-permissions`     | Cấp quyền cho role (upsert theo role+permission) |
| PATCH  | `/permission/role-permissions/:id` | Bật/tắt `isActive` của một quyền đã cấp          |
| DELETE | `/permission/role-permissions/:id` | Thu hồi (xoá) một quyền đã cấp                   |
| GET    | `/permission/users`                | Danh sách user kèm role hiện tại                 |
| PATCH  | `/permission/users/:id/role`       | Gán role cho một user (`body: { roleId }`)       |

Toàn bộ endpoint (trừ khi được thêm `@Public()`) đều đi qua `ProtectGuard` + `RoleGuard` như các
route khác — không có logic kiểm tra role hardcode nào trong `permission.controller.ts`.

## 5. Lưu ý khi thao tác với schema (đọc trước khi sửa `schema.prisma`)

- `gateway` và `expressjs` dùng **chung một database MySQL** (`nodejs_56` @ `localhost:3307`).
  `schema.prisma` của `gateway` có thể bị lệch so với DB thật nếu bên `expressjs` đổi schema
  trước. **Luôn chạy** `npx prisma db pull --config prisma7.config.ts` để đồng bộ trước khi sửa
  schema và trước khi `db push`, tránh trường hợp `db push` đề xuất xoá nhầm cột/bảng đang có dữ liệu.
- File cấu hình Prisma tên `prisma7.config.ts` (không theo tên mặc định `prisma.config.ts`) nên
  mọi lệnh Prisma CLI phải thêm cờ `--config prisma7.config.ts`.

## 6. Dữ liệu mẫu đã tạo để test

- User `id=1` (`nguyenvana@gmail.com`) → `roleId=2` (`admin`).
- User `id=2` (`tranthib@gmail.com`) → `roleId=1` (`superAD`).
