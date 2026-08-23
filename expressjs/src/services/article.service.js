import { where } from "sequelize";
import { prisma } from "../common/prisma/connect.prisma.js";
import Article from "../models/article.model.js";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";

//4 nơi nhận dữ liệu từ FE: body, header, query, params

export const articleService = {
  async findAll(req, res) {
    //xử lý nghiệp vụ.....
    // sequelize
    // return "list article";
    // const resultSequelize = await Article.findAll(); // select id, title from Article -> index
    const { where, page, pageSize, index } = buildQueryPrisma(req);

    const resultPrisma = await prisma.articles.findMany({
      where: where,
      skip: index, //Offset
      take: pageSize, //Limit
    });

    const totalItems = await prisma.articles.count({
      where: where,
    });
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      items: resultPrisma,
      totalItems: totalItems,
      totalPages: totalPages,
      page: page,
      pageSize: pageSize,
    };
  },

  async create(req) {
    const body = req.body;

    const result = await prisma.articles.create({
      data: {
        title: body.title,
        content: body.content,
        userId: 1,
      },
    });

    return true;
  },

  async findOne(req) {
    const { articleID } = req.params;

    const result = await prisma.articles.findUnique({
      where: {
        id: Number(articleID),
      },
    });

    return result;
  },

  //PARMS: ID -> ĐỂ DETAIL, UPDATE, DELETEQ
  async update(req) {
    const body = req.body;
    const { articleID } = req.params;

    await prisma.articles.update({
      where: {
        id: Number(articleID),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return true;
  },

  async delete(req) {
    const { articleID } = req.params;
    console.log(articleID);
    //không sử dụng delete thật trong db
    // await prisma.articles.delete({
    //   where: {
    //     id: Number(articleID),
    //   },
    // });

    await prisma.articles.update({
      where: {
        id: Number(articleID),
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: 1,
      },
    });

    return true;
  },
};
