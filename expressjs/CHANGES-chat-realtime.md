# Cập nhật Chat Realtime (Socket.IO) — Changelog & Hướng dẫn migrate DB

## 1. Tóm tắt thay đổi

| Vấn đề cũ                                                           | Đã sửa                                                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Phải mở phòng chat (bấm vào profile) mới nhận realtime              | Tự động join tất cả room chat của user ngay khi socket connect                       |
| Xác thực `accessToken` lặp lại ở từng event                         | Xác thực 1 lần ở `io.use` (handshake), gắn `socket.userId`                           |
| Không có trạng thái đã gửi/đã nhận/đã xem                           | Thêm bảng `ChatMessageReceipts` + event `MESSAGE_DELIVERED`, `MESSAGE_SEEN`          |
| Không có online/offline, typing                                     | Thêm `USER_ONLINE`, `USER_OFFLINE`, `ONLINE_USERS`, `TYPING`, `STOP_TYPING`          |
| `JOIN_ROOM`/`SEND_MESSAGE` không kiểm tra quyền thành viên          | Kiểm tra `ChatGroupMembers` trước khi cho join/gửi                                   |
| CORS socket.io để trống                                             | Cấu hình `origin: http://localhost:3000, credentials: true`                          |
| REST CRUD `chatGroup`/`chatMessage` chỉ là stub (`This action ...`) | Cài đặt đầy đủ, dùng chung service với socket                                        |
| Tạo phòng 1-1 bị dò sai (query `every` thiếu `some`)                | Sửa lại điều kiện tìm phòng 1-1 cho đúng                                             |
| Không có unread count / last message trong danh sách hội thoại      | `GET /chat-group` trả kèm `lastMessage`, `unreadCount`                               |
| Không có sửa/thu hồi tin nhắn                                       | Thêm `update` (edit), `remove` (unsend) + event `MESSAGE_UPDATED`, `MESSAGE_DELETED` |

## 2. File đã thay đổi / tạo mới

- `prisma/schema.prisma` — thêm model + field mới (xem mục 3)
- `src/common/socket/init.socket.js` — viết lại toàn bộ (auth handshake, auto-join, presence, các event)
- `src/common/socket/presence.js` — **mới**: quản lý online users + singleton `io` instance
- `src/services/chatGroup.service.js` — cài đặt đầy đủ CRUD + `findOrCreateGroup`
- `src/services/chatMessage.service.js` — cài đặt đầy đủ CRUD + `sendMessage`, `markSeen`
- `src/controllers/chatMessage.controller.js` — thêm `markSeen`
- `src/routers/chatMessage.router.js` — thêm route `PATCH /chat-message/seen`
- `package.json` — thêm dependency `cookie` (dùng để đọc accessToken từ cookie lúc socket handshake)

## 3. Thay đổi Prisma Schema

So với schema cũ (đã sinh ra DB hiện tại qua `nodejs_56.sql`), có 3 thay đổi, đều là **thêm mới** (không xoá/đổi kiểu cột nào, không mất dữ liệu):

1. `Users` — thêm cột `lastActiveAt DateTime?` (phục vụ tính năng "hoạt động X phút trước")
2. `ChatMessages` — thêm cột `isEdited Boolean @default(false)` (đánh dấu tin nhắn đã chỉnh sửa)
3. Model mới `ChatMessageReceipts` — theo dõi trạng thái **delivered/seen** theo từng (tin nhắn, user)

```prisma
model ChatMessageReceipts {
  id            Int          @id @default(autoincrement())
  chatMessageId Int
  chatGroupId   Int
  userId        Int
  deliveredAt   DateTime?    @db.Timestamp(0)
  seenAt        DateTime?    @db.Timestamp(0)
  createdAt     DateTime     @default(now()) @db.Timestamp(0)
  updatedAt     DateTime     @default(now()) @db.Timestamp(0)
  ChatMessages  ChatMessages @relation(fields: [chatMessageId], references: [id], onDelete: Cascade)
  ChatGroups    ChatGroups   @relation(fields: [chatGroupId], references: [id], onDelete: Cascade)
  Users         Users        @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([chatMessageId, userId])
  @@index([userId, chatGroupId])
  @@index([chatGroupId])
}
```

## 4. Hướng dẫn cập nhật database cũ

> ⚠️ Lưu ý quan trọng: DB hiện tại được tạo bằng script SQL thủ công (`nodejs_56.sql`), **không** thông qua
> `prisma migrate`, nên project **chưa có** thư mục `prisma/migrations`. Nếu chạy thẳng
> `npx prisma migrate dev`, Prisma sẽ báo phát hiện "drift" và **yêu cầu reset (xoá sạch) toàn bộ database**
> để tạo lại từ đầu. Tuyệt đối không chạy lệnh này trên DB có dữ liệu thật nếu chưa backup.

### 4.1. Cách nhanh — dùng cho máy dev hiện tại (khuyên dùng)

Đồng bộ schema thẳng vào DB, không cần migration history, không mất dữ liệu vì thay đổi chỉ là thêm mới:

```bash
cd expressjs
npx prisma db push
npx prisma generate
```

### 4.2. Nếu muốn dùng `prisma migrate` chuẩn từ đây về sau

Vì DB chưa có lịch sử migration, cần "baseline" (đánh dấu schema hiện tại là đã áp dụng) trước, sau đó các
thay đổi tiếp theo mới dùng `migrate dev` bình thường được:

```bash
cd expressjs

# 1. đảm bảo DB đang khớp với schema mới nhất (đã làm ở bước 4.1)
npx prisma db push

# 2. tạo migration baseline đại diện cho toàn bộ schema hiện tại
mkdir -p prisma/migrations/0_init
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/0_init/migration.sql

# 3. đánh dấu migration này là "đã áp dụng" (không chạy lại SQL, vì DB đã khớp sẵn)
npx prisma migrate resolve --applied 0_init

# từ giờ mỗi khi sửa schema.prisma, dùng lệnh bình thường:
npx prisma migrate dev --name <ten-thay-doi>
```

### 4.3. Áp dụng thủ công bằng SQL (dùng khi không chạy được Prisma CLI, ví dụ server production)

```sql
-- 1. Users: thêm cột lastActiveAt
ALTER TABLE `Users`
  ADD COLUMN `lastActiveAt` TIMESTAMP NULL DEFAULT NULL;

-- 2. ChatMessages: thêm cột isEdited
ALTER TABLE `ChatMessages`
  ADD COLUMN `isEdited` TINYINT(1) NOT NULL DEFAULT 0;

-- 3. Bảng mới ChatMessageReceipts
CREATE TABLE IF NOT EXISTS `ChatMessageReceipts` (
  `id`            INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `chatMessageId` INT NOT NULL,
  `chatGroupId`   INT NOT NULL,
  `userId`        INT NOT NULL,
  `deliveredAt`   TIMESTAMP NULL DEFAULT NULL,
  `seenAt`        TIMESTAMP NULL DEFAULT NULL,
  `createdAt`     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt`     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `ChatMessageReceipts_chatMessageId_userId_key` (`chatMessageId`, `userId`),
  KEY `ChatMessageReceipts_userId_chatGroupId_idx` (`userId`, `chatGroupId`),
  KEY `ChatMessageReceipts_chatGroupId_idx` (`chatGroupId`),
  FOREIGN KEY (`chatMessageId`) REFERENCES `ChatMessages`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`chatGroupId`) REFERENCES `ChatGroups`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE
);
```

Sau khi chạy SQL thủ công, chạy thêm `npx prisma generate` để Prisma Client nhận biết model/field mới.

### 4.4. Cài lại dependency

Đã thêm package `cookie` vào `package.json`:

```bash
npm install
```

## 5. Danh sách Socket Event

### Client gửi lên

| Event                    | Payload                                      | Ghi chú                                                                  |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------------------------ |
| `CREATE_ROOM`            | `{ targetUserIds: number[], name?: string }` | Tạo/lấy phòng 1-1 hoặc nhóm                                              |
| `JOIN_ROOM`              | `{ chatGroupId }`                            | Chỉ cần khi muốn join thủ công (đã auto-join sẵn lúc connect)            |
| `SEND_MESSAGE`           | `{ chatGroupId, message }`                   | Gửi tin nhắn                                                             |
| `MESSAGE_SEEN`           | `{ chatGroupId }`                            | Đánh dấu đã xem toàn bộ tin nhắn trong phòng (gọi khi mở/focus box chat) |
| `TYPING` / `STOP_TYPING` | `{ chatGroupId }`                            | Báo đang gõ / ngừng gõ                                                   |

### Server bắn xuống

| Event                          | Payload                                                    | Khi nào                                          |
| ------------------------------ | ---------------------------------------------------------- | ------------------------------------------------ |
| `ONLINE_USERS`                 | `{ userIds }`                                              | Ngay sau connect: danh sách bạn chat đang online |
| `USER_ONLINE` / `USER_OFFLINE` | `{ userId, lastActiveAt? }`                                | Khi 1 user chuyển trạng thái online/offline      |
| `NEW_CONVERSATION`             | `{ chatGroupId }`                                          | Khi bị thêm vào 1 cuộc trò chuyện mới            |
| `SEND_MESSAGE`                 | tin nhắn đầy đủ (kèm `Users`)                              | Có tin nhắn mới trong phòng                      |
| `MESSAGE_DELIVERED`            | `{ chatGroupId, messageIds, userIds/userId, deliveredAt }` | Tin nhắn đã được nhận                            |
| `MESSAGE_SEEN`                 | `{ chatGroupId, userId, messageIds, seenAt }`              | Tin nhắn đã được xem                             |
| `MESSAGE_UPDATED`              | tin nhắn đã sửa                                            | Tin nhắn được chỉnh sửa                          |
| `MESSAGE_DELETED`              | `{ chatGroupId, messageId }`                               | Tin nhắn bị thu hồi                              |
| `CONVERSATION_UPDATED`         | `{ chatGroupId, name }`                                    | Đổi tên nhóm                                     |
| `TYPING` / `STOP_TYPING`       | `{ chatGroupId, userId }`                                  | Ai đó đang gõ / ngừng gõ                         |

## 6. FE cần cập nhật

- Khi kết nối: `io(url, { auth: { accessToken } })` (hoặc để cookie tự gửi kèm, server có fallback đọc cookie).
- Không cần gọi `JOIN_ROOM` thủ công khi mở app nữa — mọi phòng đã tự join sẵn lúc connect.
- Lắng nghe thêm các event mới ở mục 5 để hiển thị tick đã gửi/đã nhận/đã xem, online dot, typing "..." như Messenger.
