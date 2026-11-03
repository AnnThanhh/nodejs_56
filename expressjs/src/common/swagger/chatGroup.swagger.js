import {
  cookieSecurity,
  idParameter,
  paginatedResponse,
  paginationParameters,
  protectedErrors,
  schemaRef,
  successResponse,
} from "./common.swagger.js";

export const chatGroup = {
  "/chat-group": {
    get: {
      tags: ["ChatGroup"],
      summary: "Lấy các nhóm chat mà người dùng hiện tại là thành viên.",
      description:
        "items chứa ChatGroupMembers và Users của từng thành viên. " +
        "Hiện tại items chỉ lọc theo req.user.id, không áp dụng filters hay isDeleted. " +
        "totalItems/totalPages lại đếm theo filters (mặc định isDeleted=false) trên toàn bộ nhóm, " +
        "không giới hạn theo thành viên nên có thể không khớp với items.",
      security: cookieSecurity,
      parameters: paginationParameters(
        { name: "Node" },
        "Riêng endpoint này, filters chỉ ảnh hưởng totalItems/totalPages, không ảnh hưởng items.",
      ),
      responses: {
        200: paginatedResponse("Get all chatGroups successfully", schemaRef("ChatGroup")),
        ...protectedErrors,
      },
    },
    post: {
      tags: ["ChatGroup"],
      summary: "Tạo nhóm chat (chưa triển khai).",
      description:
        "Service hiện chỉ trả chuỗi mẫu, không đọc body và không tạo bản ghi. " +
        "Chức năng tạo nhóm thực tế đang nằm trong sự kiện Socket.IO CREATE_ROOM.",
      security: cookieSecurity,
      responses: {
        200: successResponse("Create chatGroup successfully", {
          type: "string",
          example: "This action create",
        }),
        ...protectedErrors,
      },
    },
  },
  "/chat-group/{id}": {
    parameters: [idParameter("id", true)],
    get: {
      tags: ["ChatGroup"],
      summary: "Lấy nhóm chat theo ID (chưa triển khai).",
      description: "Chỉ trả chuỗi mẫu; chưa đọc hoặc kiểm tra nhóm chat trong database.",
      security: cookieSecurity,
      responses: {
        200: successResponse("Get chatGroup #1 successfully", {
          type: "string",
          example: "This action returns a id: 1 chatGroup",
        }),
        ...protectedErrors,
      },
    },
    patch: {
      tags: ["ChatGroup"],
      summary: "Cập nhật nhóm chat (chưa triển khai).",
      description: "Chỉ trả chuỗi mẫu; không đọc body và không cập nhật database.",
      security: cookieSecurity,
      responses: {
        200: successResponse("Update chatGroup #1 successfully", {
          type: "string",
          example: "This action updates a id: 1 chatGroup",
        }),
        ...protectedErrors,
      },
    },
    delete: {
      tags: ["ChatGroup"],
      summary: "Xóa nhóm chat (chưa triển khai).",
      description: "Chỉ trả chuỗi mẫu; không xóa hay cập nhật database.",
      security: cookieSecurity,
      responses: {
        200: successResponse("Remove chatGroup #1 successfully", {
          type: "string",
          example: "This action removes a id: 1 chatGroup",
        }),
        ...protectedErrors,
      },
    },
  },
};
