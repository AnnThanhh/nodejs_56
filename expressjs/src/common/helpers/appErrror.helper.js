import { responseError } from "./response.helper.js";
import jwt from "jsonwebtoken";
import { statusCodes } from "./statusCode.helper.js";
export const appError = (err, req, res, next) => {
  console.log("mid err đặc biệt", err);
  if (err instanceof jwt.JsonWebTokenError) {
    //jsonwebtoken error: xử lý tất cả các lỗi liên quan đến token, không chừa lỗi nào
    err.code = statusCodes.UNAUTHORIZED; //401: fe sẽ yêu cầu login lại
  }

  if (err instanceof jwt.TokenExpiredError) {
    //tokenexpired error: xử lý những liên quan đến token hết hạn
    err.code = statusCodes.FORBIDDEN; //403: fe sẽ gọi refreshtoken
  }
  
  const response = responseError(err?.message, err?.code, err?.stack);
  res.status(response.statusCode).json(response);
};
