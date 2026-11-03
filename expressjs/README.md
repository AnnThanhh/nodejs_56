# Chạy Express bằng Docker Compose

Cần Docker Desktop đang chạy và Docker Compose v2. Chạy từ thư mục `nodejs_56/expressjs`:

```sh
docker compose up -d --build
```

Compose chạy API Express ở `http://localhost:3069`, Swagger ở
`http://localhost:3069/api-docs` và MySQL ở `127.0.0.1:3307`.
Không cần cài Node.js hay MySQL trên máy để dùng lệnh Docker.

API chờ MySQL sẵn sàng, chạy `prisma db push` để tạo/cập nhật bảng theo
`prisma/schema.prisma`, rồi khởi động server. Database mới ban đầu chưa có dữ liệu;
có thể tạo tài khoản qua `POST /api/auth/register`. Các file SQL bài học ở thư mục
cha không được tự import vì có tên cột khác schema hiện tại.

## Lệnh thường dùng

```sh
docker compose logs -f express       # Xem log API
docker compose ps                    # Kiểm tra trạng thái
docker compose down                  # Dừng và xóa container, giữ dữ liệu
docker compose up -d --build express # Build và chạy lại sau khi sửa code
```

Nếu máy có npm, có thể dùng các lệnh tắt trong cùng thư mục:

```sh
npm run docker:up
npm run docker:logs
npm run docker:down
```

Từ thư mục gốc `nodejs_56`, dùng `docker compose -f expressjs/docker-compose.yml up -d --build`.

## Cấu hình tùy chọn

Lệnh chạy mặc định không yêu cầu `.env`. Để đổi cổng, mật khẩu hoặc cấu hình Google:

```sh
cp .env.example .env
# Sửa .env rồi áp dụng lại:
docker compose up -d --build
```

- `APP_PORT` mặc định `3069`; `MYSQL_PORT` mặc định `3307`.
- MySQL: database `nodejs_56`, user `express`, mật khẩu mặc định
  `express_local_password`. Trong Docker, API kết nối tới `mysql:3306`.
- `MYSQL_PASSWORD` phải dùng ký tự URL-safe (chữ, số, `_`, `-`) vì được ghép vào URL.
  Nếu chạy Node trực tiếp trên máy, cập nhật cả `DATABASE_URL` tương ứng.
- Đăng nhập Google cần `GOOGLE_CLIENT_ID` và `GOOGLE_CLIENT_SECRET` thật.
  Callback hiện tại là `http://localhost:3069/api/auth/google/callback`.
  Nếu đổi cổng API, cần cập nhật callback trong code/Google Console và URL Swagger.

Đây là cấu hình phát triển local, có các khóa JWT và mật khẩu mặc định dùng thử.
`prisma db push` không tự chấp nhận thay đổi làm mất dữ liệu. Nếu thay schema gây
lỗi đồng bộ, xem log và xử lý schema/dữ liệu trước khi khởi động lại.

Dữ liệu MySQL và ảnh upload được giữ trong named volumes sau `docker compose down`.
Các biến khởi tạo MySQL chỉ có tác dụng khi volume database còn trống; sửa mật khẩu
trong `.env` không đổi mật khẩu của database đã tạo. Lệnh `docker compose down -v`
sẽ **xóa toàn bộ database và ảnh upload** của cấu hình này.

Tham khảo: [Docker Compose và thứ tự khởi động](https://docs.docker.com/compose/how-tos/startup-order/).
