import { prisma } from "../common/prisma/connect.prisma.js";
import Article from "../models/article.model.js";

//4 nơi nhận dữ liệu từ FE: body, header, query, params

export const articleService = {
  async findAll(req, res) {
    //xử lý nghiệp vụ.....
    // sequelize
    // return "list article";
    // const resultSequelize = await Article.findAll(); // select id, title from Article -> index
    let { page, pageSize } = req.query;
    const pageDefault = 1;
    const pageSizeDefault = 3;

    //chuyển đổi thành số
    page = Number(page);
    pageSize = Number(pageSize);

    //nếu gửi chữ
    page = Number(page) || pageDefault;
    pageSize = Number(pageSize) || pageSizeDefault;

    //nếu số âm
    if (page < 1) page = pageDefault;
    if (pageSize < 1) pageSize = pageSizeDefault;

    const index = (page - 1) * pageSize;

    const resultPrisma = await prisma.articles.findMany({
      where: {
        isDeleted: false,
      },
      skip: index, //Offset
      take: pageSize, //Limit
    });

    const totalItems = await prisma.articles.count({
      where: {
        isDeleted: false,
      },
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
        Content: body.content,
        userId: 1,
      },
    });

    return true;
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
        Content: body.content,
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
