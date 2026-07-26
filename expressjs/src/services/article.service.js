import sequelize from "../common/sequelize/connect.sequelize.js";
import Article from "../models/article.model.js";

export const articleService = {
  async findAll(req, res) {
    //xử lý nghiệp vụ.....
    // sequelize
    // return "list article";
    const result = await Article.findAll();
    return result;
  },
};
