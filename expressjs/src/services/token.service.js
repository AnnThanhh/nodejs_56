import { ACCESS_TOKEN_SECRET_KEY } from "../common/constants/app.constant.js";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import jwt from "jsonwebtoken";
export const tokenService = {
  createAccessToken(userID) {
    if (!userID) {
      throw new BadRequestException("Không có userID để tạo access token");
    }

    const accessToken = jwt.sign({ userId: userID }, ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "10s",
    });

    return accessToken;
  },

  verifyAccessToken(accessToken, option) {
    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, option);
    return decode;
  },
};
