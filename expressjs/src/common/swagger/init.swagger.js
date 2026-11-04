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
      "Đăng nhập bằng POST /auth/login, sao chép data.accessToken vào Authorize → bearerAuth. " +
      "Swagger UI tự thêm Authorization: Bearer <token> cho các API có biểu tượng khóa.",
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
    { name: "Auth", description: "Đăng ký, đăng nhập và access token" },
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
