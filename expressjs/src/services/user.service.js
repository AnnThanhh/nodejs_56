import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { buildQueryPrisma } from "../common/helpers/build-query-prisma.helper.js";
cloudinary.config({
  secure: false, // true: https, false: http
});
export const userService = {
  async avatarLocal(req) {
    //req.file: là file được gửi lên server từ client
    if (!req.file) {
      throw new BadRequestException("Vui lòng chọn file để upload");
    }

    if (req.user.avatar) {
      const oldFilePath = path.join("public/images", req.user.avatar);

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      //xóa cloud
      cloudinary.uploader.destroy(req.user.avatar);
    }

    //lưu vào database
    await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: req.file.filename,
      },
    });

    return `images/${req.file.filename}`;
  },

  async avatarCloud(req) {
    if (!req.file) {
      throw new BadRequestException("Vui lòng chọn file để upload");
    }

    if (req.user.avatar) {
      const oldFilePath = path.join("public/images", req.user.avatar);

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      //xóa cloud
      cloudinary.uploader.destroy(req.user.avatar);
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "nodejs_56" }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(req.file.buffer);
    });

    await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: uploadResult.public_id,
      },
    });
    // console.log("upload data", uploadResult.secure_url)
    return uploadResult.secure_url;
  },

  async findAll(req) {
    const { where, page, pageSize, index } = buildQueryPrisma(req);

    const resultPrisma = await prisma.users.findMany({
      where: where,
      skip: index, //Offset
      take: pageSize, //Limit
    });

    const totalItems = await prisma.users.count({
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
    const { userID } = req.params;
    const resultPrisma = await prisma.users.findUnique({
      where: {
        id: Number(userID),
      },
    });

    return resultPrisma;
  },
};
