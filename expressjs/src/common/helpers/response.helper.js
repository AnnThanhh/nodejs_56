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
