import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
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

    return uploadResult.secure_url;
  },
};
