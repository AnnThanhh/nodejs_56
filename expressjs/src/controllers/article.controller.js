import { responseSuccess } from "../common/helpers/response.helper.js";
import { statusCodes } from "../common/helpers/statusCode.helper.js";
import { articleService } from "../services/article.service.js";

export const articleController = {
  async findAll(req, res) {
    //điều hướng về service để xử lý nghiệp vụ
    const result = await articleService.findAll(req, res);
    //trả dữ liệu về client
    const response = responseSuccess(
      result,
      "Lấy danh sách bài viết thành công",
    );
    res.status(response.statusCode).json(response);
  },

  async create(req, res) {
    const result = await articleService.create(req);
    const response = responseSuccess(
      result,
      "Tạo bài viết thành công",
      statusCodes.CREATED,
    );
    res.status(response.statusCode).json(response);
  },

  async findOne(req, res) {
    const result = await articleService.findOne(req);
    const response = responseSuccess(result, "Lấy bài viết thành công");
    res.status(response.statusCode).json(response);
  },

  async update(req, res) {
    const result = await articleService.update(req);
    const response = responseSuccess(result, "Cập nhật bài viết thành công");
    res.status(response.statusCode).json(response);
  },

  async delete(req, res) {
    const result = await articleService.delete(req);
    const response = responseSuccess(result, "Xóa bài viết thành công");
    res.status(response.statusCode).json(response);
  },
};
