import {
  commonErrors,
  cookieSecurity,
  errorResponse,
  jsonBody,
  protectedErrors,
  schemaRef,
  successResponse,
  tokenCookieHeaders,
} from "./common.swagger.js";

const credentials = {
  email: { type: "string", example: "user@example.com" },
  password: { type: "string", format: "password", example: "DemoPassword123!" },
};

export const auth = {
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Đăng nhập bằng email và mật khẩu.",
      description:
        "Trả data=true và đặt hai cookie accessToken, refreshToken. " +
        "Trình duyệt dùng cookie cho các API được bảo vệ trên cùng origin.",
      requestBody: jsonBody(credentials, ["email", "password"]),
      responses: {
        200: {
          ...successResponse("Login successfully", { type: "boolean", example: true }),
          headers: tokenCookieHeaders,
        },
        400: errorResponse("Email chưa đăng ký hoặc mật khẩu không chính xác."),
        ...commonErrors,
        429: errorResponse("Tối đa 5 lần gọi đăng nhập / 10 phút / IP, đồng thời chịu giới hạn chung của /api."),
      },
    },
  },
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Đăng ký tài khoản.",
      description: "Tạo user và trả data=true với HTTP 200. Sau đó gọi /auth/login để nhận cookie.",
      requestBody: jsonBody(
        {
          ...credentials,
          fullName: { type: "string", nullable: true, example: "Nguyễn Văn An" },
        },
        ["email", "password"],
      ),
      responses: {
        200: successResponse("Register successfully", { type: "boolean", example: true }),
        400: errorResponse("Tài khoản đã được đăng ký."),
        ...commonErrors,
      },
    },
  },
  "/auth/get-info": {
    get: {
      tags: ["Auth"],
      summary: "Lấy thông tin người dùng đang đăng nhập.",
      security: cookieSecurity,
      responses: {
        200: successResponse("Get info successfully", schemaRef("User")),
        ...protectedErrors,
      },
    },
  },
  "/auth/refresh-token": {
    post: {
      tags: ["Auth"],
      summary: "Cấp lại access token.",
      description:
        "Cần cả hai cookie của cùng một user. Access token có thể đã hết hạn nhưng phải có chữ ký hợp lệ; " +
        "refresh token phải còn hạn. Server cấp accessToken mới và đặt lại refreshToken hiện có, không gia hạn refreshToken.",
      security: [{ accessTokenCookie: [], refreshTokenCookie: [] }],
      responses: {
        200: {
          ...successResponse("Refresh token successfully", { type: "boolean", example: true }),
          headers: tokenCookieHeaders,
        },
        400: errorResponse("Thiếu accessToken hoặc refreshToken."),
        401: errorResponse("Token sai chữ ký/không hợp lệ, hai token khác user hoặc user không còn tồn tại."),
        403: errorResponse("Refresh token đã hết hạn."),
        ...commonErrors,
      },
    },
  },
  "/auth/google": {
    get: {
      tags: ["Auth"],
      summary: "Bắt đầu đăng nhập Google.",
      description:
        "Mở URL này trực tiếp trong trình duyệt để theo luồng chuyển hướng OAuth với scope profile và email. " +
        "Cần cấu hình Google OAuth credentials hợp lệ; không dùng Try it out cho luồng chuyển hướng này.",
      responses: {
        302: {
          description: "Chuyển hướng đến trang đăng nhập/chấp thuận của Google.",
          headers: { Location: { schema: { type: "string", format: "uri" } } },
        },
        ...commonErrors,
      },
    },
  },
  "/auth/google/callback": {
    get: {
      tags: ["Auth"],
      summary: "Callback đăng nhập Google.",
      description:
        "Được Google gọi sau bước xác thực. Khi thành công, server đặt accessToken/refreshToken và " +
        "chuyển đến http://localhost:3000/login-callback. Passport có failureRedirect=/login khi xác thực thất bại. " +
        "Callback được cấu hình trong code là http://localhost:3069/api/auth/google/callback.",
      parameters: [
        { in: "query", name: "code", description: "Authorization code do Google cấp khi thành công.", schema: { type: "string" } },
        { in: "query", name: "error", description: "Lỗi do Google trả về, ví dụ khi người dùng từ chối.", schema: { type: "string" } },
      ],
      responses: {
        302: {
          description: "Chuyển hướng về frontend khi thành công hoặc /login theo xử lý thất bại của Passport.",
          headers: {
            ...tokenCookieHeaders,
            Location: { schema: { type: "string", example: "http://localhost:3000/login-callback" } },
          },
        },
        ...commonErrors,
      },
    },
  },
};
