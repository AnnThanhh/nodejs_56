import { responseError } from "./response.helper.js";

export const appError = (err, req, res, next) => {
  console.log("mid err đặc biệt", err);
  const response = responseError(err?.message, err?.code, err?.stack);
  res.status(response.statusCode).json(response);
};
