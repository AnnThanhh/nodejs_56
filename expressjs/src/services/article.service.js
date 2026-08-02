import { prisma } from "../common/prisma/connect.prisma.js";
import Article from "../models/article.model.js";

export const articleService = {
  async findAll(req, res) {
    console.log("service", req.info);
    //xử lý nghiệp vụ.....
    // sequelize
    // return "list article";
    // const resultSequelize = await Article.findAll(); // select id, title from Article -> index

    const resultPrisma = await prisma.articles.findMany();
    return resultPrisma;
  },

  create(req) {
    console.log(req);

    return "Tạo bài viết thành công";
  },
};
