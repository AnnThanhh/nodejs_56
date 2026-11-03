const recordFields = {
  id: { type: "integer", example: 1 },
  deletedBy: { type: "integer", example: 0 },
  isDeleted: { type: "boolean", example: false },
  deletedAt: { type: "string", format: "date-time", nullable: true },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

const userSchema = {
  type: "object",
  description: "Thông tin Users được Prisma trả về; trường password được omit.",
  properties: {
    ...recordFields,
    email: { type: "string", example: "user@example.com" },
    fullName: { type: "string", nullable: true, example: "Nguyễn Văn An" },
    avatar: { type: "string", nullable: true },
    age: { type: "integer", nullable: true },
    totpSecret: { type: "string", nullable: true },
    googleId: { type: "string", nullable: true },
  },
};

export const schemas = {
  User: userSchema,
  Article: {
    type: "object",
    properties: {
      ...recordFields,
      title: { type: "string", nullable: true, example: "Tiêu đề bài viết" },
      content: { type: "string", nullable: true, example: "Nội dung bài viết" },
      imageUrl: { type: "string", nullable: true },
      views: { type: "integer", example: 0 },
      userId: { type: "integer", nullable: true, example: 1 },
    },
  },
  ChatGroupMember: {
    type: "object",
    properties: {
      ...recordFields,
      userId: { type: "integer", nullable: true, example: 1 },
      chatGroupId: { type: "integer", nullable: true, example: 1 },
      Users: { ...userSchema, nullable: true },
    },
  },
  ChatGroup: {
    type: "object",
    properties: {
      ...recordFields,
      name: { type: "string", nullable: true, example: "Nhóm học Node.js" },
      ownerId: { type: "integer", nullable: true, example: 1 },
      ChatGroupMembers: {
        type: "array",
        items: { $ref: "#/components/schemas/ChatGroupMember" },
      },
    },
  },
  ChatMessage: {
    type: "object",
    properties: {
      ...recordFields,
      chatGroupId: { type: "integer", nullable: true, example: 1 },
      userIdSender: { type: "integer", nullable: true, example: 1 },
      messageText: { type: "string", nullable: true, example: "Xin chào!" },
      Users: { ...userSchema, nullable: true },
    },
  },
  ErrorResponse: {
    type: "object",
    properties: {
      status: { type: "string", enum: ["error"] },
      statusCode: { type: "integer" },
      message: { type: "string" },
      stack: { type: "string", description: "Có thể xuất hiện trong phản hồi lỗi." },
      doc: { type: "string", example: "swagger.com" },
    },
  },
};

export const cookieSecurity = [{ accessTokenCookie: [] }];

export const securitySchemes = {
  accessTokenCookie: {
    type: "apiKey",
    in: "cookie",
    name: "accessToken",
    description:
      "Cookie JWT nhận từ POST /auth/login hoặc Google callback. Middleware protect đọc req.cookies.accessToken.",
  },
  refreshTokenCookie: {
    type: "apiKey",
    in: "cookie",
    name: "refreshToken",
    description: "Cookie JWT cần gửi cùng accessToken khi gọi POST /auth/refresh-token.",
  },
};

export const tokenCookieHeaders = {
  "Set-Cookie": {
    description:
      "Server gửi hai header Set-Cookie riêng cho accessToken và refreshToken (Path=/); token không nằm trong JSON response.",
    schema: { type: "string", example: "accessToken=<JWT>; Path=/" },
  },
};

export const schemaRef = (name) => ({ $ref: `#/components/schemas/${name}` });

export const successResponse = (message, data, statusCode = 200) => ({
  description: message,
  content: {
    "application/json": {
      schema: {
        type: "object",
        required: ["status", "statusCode", "message", "data", "doc"],
        properties: {
          status: { type: "string", enum: ["success"] },
          statusCode: { type: "integer", enum: [statusCode] },
          message: { type: "string", example: message },
          data,
          doc: { type: "string", example: "swagger.com" },
        },
      },
    },
  },
});

export const paginatedResponse = (message, itemSchema) =>
  successResponse(message, {
    type: "object",
    required: ["items", "totalItems", "totalPages", "page", "pageSize"],
    properties: {
      items: { type: "array", items: itemSchema },
      totalItems: { type: "integer", example: 1 },
      totalPages: { type: "integer", example: 1 },
      page: { type: "integer", example: 1 },
      pageSize: { type: "integer", example: 3 },
    },
  });

export const errorResponse = (description) => ({
  description,
  content: { "application/json": { schema: schemaRef("ErrorResponse") } },
});

export const commonErrors = {
  429: errorResponse("Vượt giới hạn request: tối đa 100 request / 15 phút / IP cho /api."),
  500: errorResponse("Lỗi xử lý phía server hoặc truy vấn dữ liệu."),
};

export const protectedErrors = {
  400: errorResponse("Thiếu cookie accessToken hoặc user trong token không còn tồn tại."),
  401: errorResponse("Token không hợp lệ."),
  403: errorResponse("Token đã hết hạn."),
  ...commonErrors,
};

export const paginationParameters = (filtersExample, filtersDescription = "") => [
  {
    in: "query",
    name: "page",
    description: "Trang cần lấy. Bỏ trống, không phải số hoặc nhỏ hơn 1 sẽ dùng 1.",
    schema: { type: "integer", minimum: 1, default: 1 },
  },
  {
    in: "query",
    name: "pageSize",
    description: "Số bản ghi mỗi trang. Bỏ trống, không phải số hoặc nhỏ hơn 1 sẽ dùng 3.",
    schema: { type: "integer", minimum: 1, default: 3 },
  },
  {
    in: "query",
    name: "filters",
    description:
      "Chuỗi JSON object chứa điều kiện Prisma. Giá trị chuỗi được đổi thành contains; số/boolean giữ nguyên. " +
      "Mặc định isDeleted=false, có thể ghi đè trong filters. JSON sai cú pháp được bỏ qua. " +
      filtersDescription,
    schema: { type: "string", default: "{}" },
    example: JSON.stringify(filtersExample),
  },
];

export const idParameter = (name = "id", placeholder = false) => ({
  in: "path",
  name,
  required: true,
  description: placeholder
    ? "ID chỉ được chèn vào chuỗi phản hồi mẫu; chưa truy vấn database."
    : "ID của bản ghi trong database.",
  schema: placeholder
    ? { type: "string", example: "1" }
    : { type: "integer", example: 1 },
});

export const jsonBody = (properties, required = []) => ({
  required: true,
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties,
        ...(required.length ? { required } : {}),
      },
    },
  },
});
