import { userService } from "../services/user.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const userController = {
  async avatarLocal(req, res, next) {
    const result = await userService.avatarLocal(req);
    const response = responseSuccess(
      result,
      `Upload avatar local successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async avatarCloud(req, res, next) {
    const result = await userService.avatarCloud(req);
    const response = responseSuccess(
      result,
      `Upload avatar cloud successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async findAll(req, res, next) {
    const result = await userService.findAll(req);
    const response = responseSuccess(result, `Get all users successfully`);
    res.status(response.statusCode).json(response);
  },

  async findOne(req, res, next) {
    const result = await userService.findOne(req);
    const response = responseSuccess(result, `Get user by id successfully`);
    res.status(response.statusCode).json(response);
  },
};
