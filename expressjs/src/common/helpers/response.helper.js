import { statusCodes } from "./statusCode.helper.js";

export const responseSuccess = (
  message = "Lấy danh sách thành công",
  result,
  statusCode = statusCodes.OK,
) => {
  return {
    status: "success",
    statusCode: statusCode,
    message: message,
    data: result,
    doc: "swagger.com",
  };
};

export const responseError = (
  message = "Internal server error",
  statusCode = statusCodes.INTERNAL_SERVER_ERROR,
  stack,
) => {
  return {
    status: "error",
    statusCode: statusCode,
    message: message,
    stack: stack, // chỉ nên hiển thị khi ở môi trường dev
    doc: "swagger.com",
  };
};
