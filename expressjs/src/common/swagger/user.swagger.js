import {
  commonErrors,
  cookieSecurity,
  errorResponse,
  idParameter,
  paginatedResponse,
  paginationParameters,
  protectedErrors,
  schemaRef,
  schemas,
  successResponse,
} from "./common.swagger.js";

const avatarBody = {
  required: true,
  content: {
    "multipart/form-data": {
      schema: {
        type: "object",
        required: ["avatar"],
        properties: { avatar: { type: "string", format: "binary" } },
      },
    },
  },
};

const avatarErrors = {
  ...protectedErrors,
  400: errorResponse("Thiếu file avatar, thiếu accessToken hoặc user trong token không tồn tại."),
};

export const user = {
  "/user": {
    get: {
      tags: ["User"],
      summary: "Lấy danh sách người dùng.",
      description: "Route công khai. Trường password không được trả về.",
      parameters: paginationParameters({ fullName: "An" }),
      responses: {
        200: paginatedResponse("Get all users successfully", schemaRef("User")),
        ...commonErrors,
      },
    },
  },
  "/user/{userID}": {
    get: {
      tags: ["User"],
      summary: "Lấy người dùng theo ID.",
      description: "Route công khai. Trả data=null nếu không tìm thấy; hiện không lọc isDeleted.",
      parameters: [idParameter("userID")],
      responses: {
        200: successResponse("Get user by id successfully", { ...schemas.User, nullable: true }),
        ...commonErrors,
      },
    },
  },
  "/user/avatar-local": {
    post: {
      tags: ["User"],
      summary: "Upload avatar lên server local.",
      description:
        "Nhận một file ở trường avatar, lưu trong public/images và cập nhật avatar của user đang đăng nhập. " +
        "data là đường dẫn tương đối images/<filename>, truy cập từ thư mục gốc của server, không có tiền tố /api.",
      security: cookieSecurity,
      requestBody: avatarBody,
      responses: {
        200: successResponse("Upload avatar local successfully", {
          type: "string",
          example: "images/local-1787388616259-508264354.jpg",
        }),
        ...avatarErrors,
      },
    },
  },
  "/user/avatar-cloud": {
    post: {
      tags: ["User"],
      summary: "Upload avatar lên Cloudinary.",
      description:
        "Nhận một file ở trường avatar. Lưu public_id vào Users.avatar và trả secure_url trong data. " +
        "Cần cấu hình Cloudinary hợp lệ trong user.service.js.",
      security: cookieSecurity,
      requestBody: avatarBody,
      responses: {
        200: successResponse("Upload avatar cloud successfully", {
          type: "string",
          format: "uri",
          example: "https://res.cloudinary.com/demo/image/upload/nodejs_56/avatar.jpg",
        }),
        ...avatarErrors,
      },
    },
  },
};
