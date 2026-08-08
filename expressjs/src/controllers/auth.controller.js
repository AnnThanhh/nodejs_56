import { authService } from "../services/auth.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const authController = {
  async register(req, res, next) {
    const result = await authService.register(req);
    const response = responseSuccess(result, `Register successfully`);
    res.status(response.statusCode).json(response);
  },

  async login(req, res, next) {
    const result = await authService.login(req);
    const response = responseSuccess(result, `Login successfully`);
    res.status(response.statusCode).json(response);
  },
};
