import { articleService } from "../services/article.service.js";

export const articleController = {
  async findAll(req, res) {
    //điều hướng về service để xử lý nghiệp vụ
    const result = await articleService.findAll(req, res);
    //trả dữ liệu về client
    res.json(result);
  },
};
