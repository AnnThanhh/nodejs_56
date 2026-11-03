import { article } from "./article.swagger.js";
import { auth } from "./auth.swagger.js";
import { user } from "./user.swagger.js";
import { chatGroup } from "./chatGroup.swagger.js";
import { chatMessage } from "./chatMessage.swagger.js";
import { schemas, securitySchemes } from "./common.swagger.js";

export const swaggerDocument = {
  openapi: "3.0.4",
  info: {
    title: "Nodejs56 API",
    description:
      "Tài liệu các route HTTP được khai báo trong Express. " +
      "Đăng nhập bằng POST /auth/login trên cùng origin với trang /api-docs để nhận cookie accessToken và refreshToken. " +
      "Các API được bảo vệ đọc cookie do trình duyệt quản lý; ô Authorize không tự đặt được header Cookie. " +
      "Xem [cookie authentication](https://swagger.io/docs/specification/v3_0/authentication/cookie-authentication/). " +
      "Các endpoint ghi rõ chưa triển khai chỉ trả dữ liệu mẫu. " +
      "CREATE_ROOM, JOIN_ROOM và SEND_MESSAGE là sự kiện Socket.IO, không phải route HTTP.",
    version: "0.1.0",
  },
  servers: [
    {
      url: "/api",
      description: "API trên cùng host và cổng với trang Swagger hiện tại",
    },
    {
      url: "http://trinhanthanh.com/api",
      description: "Server triển khai",
    },
  ],
  tags: [
    { name: "Article", description: "Quản lý bài viết" },
    { name: "Auth", description: "Đăng ký, đăng nhập và cookie xác thực" },
    { name: "User", description: "Tra cứu người dùng và cập nhật avatar" },
    { name: "ChatGroup", description: "Nhóm chat của người dùng hiện tại" },
    { name: "ChatMessage", description: "Lịch sử tin nhắn" },
  ],
  components: { schemas, securitySchemes },
  paths: {
    ...article,
    ...auth,
    ...user,
    ...chatGroup,
    ...chatMessage,
  },
};
