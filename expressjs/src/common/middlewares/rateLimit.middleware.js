import rateLimit from "express-rate-limit";
import { TooManyRequestsException } from "../helpers/exception.helper.js";
//trong 15p request 100 lần
export const appLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 100, // giới hạn 100 request trong 15p dựa trên IP

  standardHeaders: "draft-8", // định dạng rate limit header mới

  legacyHeaders: false, // tắt định dạng rate limit header cũ

  handler: () => {
    throw new TooManyRequestsException();
  },
});

// chỉ có thể login 5 lần trong 10p trên 1 ip
export const loginLimit = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // giới hạn 5 request trong 10p dựa trên IP
  standardHeaders: "draft-8", // định dạng rate limit header mới
  legacyHeaders: false, // tắt định dạng rate limit header cũ
  handler: () => {
    throw new TooManyRequestsException(
      "Bạn đã đăng nhập quá nhiều lần. Vui lòng thử lại sau.",
    );
  },
});
