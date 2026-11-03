import {
  commonErrors,
  idParameter,
  jsonBody,
  paginatedResponse,
  paginationParameters,
  schemaRef,
  schemas,
  successResponse,
} from "./common.swagger.js";

const articleBody = jsonBody({
  title: { type: "string", nullable: true, example: "Tiêu đề bài viết" },
  content: { type: "string", nullable: true, example: "Nội dung bài viết" },
});

export const article = {
  "/article": {
    get: {
      tags: ["Article"],
      summary: "Lấy danh sách bài viết.",
      parameters: paginationParameters({ title: "Node" }),
      responses: {
        200: paginatedResponse("Lấy danh sách bài viết thành công", schemaRef("Article")),
        ...commonErrors,
      },
    },
    post: {
      tags: ["Article"],
      summary: "Tạo bài viết.",
      description:
        "Service nhận title và content, gán cố định userId=1 nên cần user có ID 1 tồn tại. " +
        "Route hiện không yêu cầu đăng nhập. Trả data=true thay vì bản ghi vừa tạo.",
      requestBody: articleBody,
      responses: {
        201: successResponse("Tạo bài viết thành công", { type: "boolean", example: true }, 201),
        ...commonErrors,
      },
    },
  },
  "/article/{articleID}": {
    parameters: [idParameter("articleID")],
    get: {
      tags: ["Article"],
      summary: "Lấy bài viết theo ID.",
      description: "Trả data=null nếu ID không tồn tại; hiện không lọc isDeleted.",
      responses: {
        200: successResponse("Lấy bài viết thành công", { ...schemas.Article, nullable: true }),
        ...commonErrors,
      },
    },
    put: {
      tags: ["Article"],
      summary: "Cập nhật bài viết theo ID.",
      description: "Chỉ cập nhật title và content được gửi lên. Route hiện không yêu cầu đăng nhập.",
      requestBody: articleBody,
      responses: {
        200: successResponse("Cập nhật bài viết thành công", { type: "boolean", example: true }),
        ...commonErrors,
      },
    },
    delete: {
      tags: ["Article"],
      summary: "Xóa mềm bài viết.",
      description:
        "Gán isDeleted=true, deletedAt là thời điểm hiện tại và deletedBy=1. " +
        "Route hiện không yêu cầu đăng nhập.",
      responses: {
        200: successResponse("Xóa bài viết thành công", { type: "boolean", example: true }),
        ...commonErrors,
      },
    },
  },
};
