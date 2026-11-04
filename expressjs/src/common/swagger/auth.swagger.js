import {
  commonErrors,
  bearerSecurity,
  errorResponse,
  jsonBody,
  protectedErrors,
  googleCookieHeaders,
  refreshCookieHeaders,
  schemaRef,
  successResponse,
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
        "Trả data.accessToken trong JSON và đặt cookie refreshToken. " +
        "Dùng access token trong header Authorization: Bearer <token> cho các API được bảo vệ.",
      requestBody: jsonBody(credentials, ["email", "password"]),
      responses: {
        200: {
          ...successResponse("Login successfully", schemaRef("AccessTokenData")),
          headers: refreshCookieHeaders,
        },
        400: errorResponse("Email chưa đăng ký hoặc mật khẩu không chính xác."),
        ...commonErrors,
        429: errorResponse("Tối đa 10 lần gọi đăng nhập / 10 phút / IP, đồng thời chịu giới hạn chung của /api."),
      },
    },
  },
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Đăng ký tài khoản.",
      description: "Tạo user và trả data=true với HTTP 200. Sau đó gọi /auth/login để nhận access token.",
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
      security: bearerSecurity,
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
        "Gửi access token qua Authorization: Bearer <token> và refreshToken qua cookie; hai token phải thuộc cùng user. " +
        "Access token có thể đã hết hạn nhưng phải có chữ ký hợp lệ; refresh token phải còn hạn. " +
        "Trả data.accessToken mới và đặt lại cookie refreshToken hiện có, không gia hạn refresh token.",
      security: [{ bearerAuth: [], refreshTokenCookie: [] }],
      responses: {
        200: {
          ...successResponse("Refresh token successfully", schemaRef("AccessTokenData")),
          headers: refreshCookieHeaders,
        },
        400: errorResponse("Thiếu access token trong header Authorization hoặc thiếu cookie refreshToken."),
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
        "Được Google gọi sau bước xác thực. Callback hiện vẫn đặt cả hai cookie accessToken và refreshToken khi thành công, rồi " +
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
            ...googleCookieHeaders,
            Location: { schema: { type: "string", example: "http://localhost:3000/login-callback" } },
          },
        },
        ...commonErrors,
      },
    },
  },
};
