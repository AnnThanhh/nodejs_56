import {
  bearerSecurity,
  idParameter,
  paginatedResponse,
  paginationParameters,
  protectedErrors,
  schemaRef,
  successResponse,
} from "./common.swagger.js";

export const chatMessage = {
  "/chat-message": {
    get: {
      tags: ["ChatMessage"],
      summary: "Lấy danh sách tin nhắn.",
      description:
        'Sắp xếp createdAt giảm dần (mới nhất trước), kèm Users của người gửi. ' +
        'Dùng filters={"chatGroupId":1} để lấy tin nhắn của một nhóm. ' +
        "Endpoint hiện chỉ kiểm tra đăng nhập, chưa giới hạn theo thành viên nhóm; " +
        "nếu không truyền filters thì truy vấn tin nhắn của mọi nhóm với isDeleted=false.",
      security: bearerSecurity,
      parameters: paginationParameters({ chatGroupId: 1 }),
      responses: {
        200: paginatedResponse("Get all chatMessages successfully", schemaRef("ChatMessage")),
        ...protectedErrors,
      },
    },
    post: {
      tags: ["ChatMessage"],
      summary: "Tạo tin nhắn (chưa triển khai).",
      description:
        "Service hiện chỉ trả chuỗi mẫu, không đọc body và không lưu tin nhắn. " +
        "Gửi và lưu tin nhắn thực tế đang nằm trong sự kiện Socket.IO SEND_MESSAGE.",
      security: bearerSecurity,
      responses: {
        200: successResponse("Create chatMessage successfully", {
          type: "string",
          example: "This action create",
        }),
        ...protectedErrors,
      },
    },
  },
  "/chat-message/{id}": {
    parameters: [idParameter("id", true)],
    get: {
      tags: ["ChatMessage"],
      summary: "Lấy tin nhắn theo ID (chưa triển khai).",
      description: "Chỉ trả chuỗi mẫu; chưa đọc hoặc kiểm tra tin nhắn trong database.",
      security: bearerSecurity,
      responses: {
        200: successResponse("Get chatMessage #1 successfully", {
          type: "string",
          example: "This action returns a id: 1 chatMessage",
        }),
        ...protectedErrors,
      },
    },
    patch: {
      tags: ["ChatMessage"],
      summary: "Cập nhật tin nhắn (chưa triển khai).",
      description: "Chỉ trả chuỗi mẫu; không đọc body và không cập nhật database.",
      security: bearerSecurity,
      responses: {
        200: successResponse("Update chatMessage #1 successfully", {
          type: "string",
          example: "This action updates a id: 1 chatMessage",
        }),
        ...protectedErrors,
      },
    },
    delete: {
      tags: ["ChatMessage"],
      summary: "Xóa tin nhắn (chưa triển khai).",
      description: "Chỉ trả chuỗi mẫu; không xóa hay cập nhật database.",
      security: bearerSecurity,
      responses: {
        200: successResponse("Remove chatMessage #1 successfully", {
          type: "string",
          example: "This action removes a id: 1 chatMessage",
        }),
        ...protectedErrors,
      },
    },
  },
};
