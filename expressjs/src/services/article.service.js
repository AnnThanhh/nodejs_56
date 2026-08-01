import { prisma } from "../common/prisma/connect.prisma.js";
import Article from "../models/article.model.js";

export const articleService = {
  async findAll(req, res) {
    console.log("server", req.info)
    //xử lý nghiệp vụ.....
    // sequelize
    // return "list article";
    // const resultSequelize = await Article.findAll(); // select id, title from Article -> index

    const resultPrisma = await prisma.articles.findMany();
    return resultPrisma;
  },
};
