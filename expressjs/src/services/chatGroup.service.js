import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const chatGroupService = {
  async create(req) {
    return `This action create`;
  },

  async findAll(req) {
    const { where, page, pageSize, index } = buildQueryPrisma(req);

    const resultPrisma = await prisma.chatGroups.findMany({
      where: {
        ChatGroupMembers: {
          some: {
            userId: req.user.id,
          },
        },
      },
      skip: index, //Offset
      take: pageSize, //Limit
      include: {
        ChatGroupMembers: {
          include: {
            Users: true,
          },
        },
      },
    });

    const totalItems = await prisma.chatGroups.count({
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

  async findOne(req) {
    return `This action returns a id: ${req.params.id} chatGroup`;
  },

  async update(req) {
    return `This action updates a id: ${req.params.id} chatGroup`;
  },

  async remove(req) {
    return `This action removes a id: ${req.params.id} chatGroup`;
  },
};
