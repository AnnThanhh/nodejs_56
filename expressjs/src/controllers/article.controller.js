import { responseSuccess } from "../common/helpers/response.helper.js";
import { statusCodes } from "../common/helpers/statusCode.helper.js";
import { articleService } from "../services/article.service.js";

export const articleController = {
  async findAll(req, res) {
    console.log(req.info);
    //điều hướng về service để xử lý nghiệp vụ
    const result = await articleService.findAll(req, res);
    //trả dữ liệu về client
    const response = responseSuccess(
      "Lấy danh sách bài viết thành công",
      result,
    );
    res.status(response.statusCode).json(response);
  },

  create(req, res) {
    const result = articleService.create(req);
    const response = responseSuccess(
      "Tạo bài viết thành công",
      result,
      statusCodes.CREATED,
    );
    res.status(response.statusCode).json(response);
  },
};
