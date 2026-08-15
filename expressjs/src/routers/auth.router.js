import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import { protectv2 } from "../common/middlewares/protectv2.middleware.js";
import { loginLimit } from "../common/middlewares/rateLimit.middleware.js";
import passport from "passport";
const authRouter = express.Router();

// Tạo route CRUD
authRouter.post("/register", authController.register);
authRouter.post("/login", loginLimit, authController.login);
authRouter.get("/get-info", protect, authController.getInfo);
authRouter.post("/refresh-token", authController.refreshToken);
// authRouter.get("/get-info", protectv2, authController.getInfo);

//khi user click vào bnutton login google thì api get sẽ được gọi 
//passport kích hoạt và redirect người tới trang chọn tài khoản google, đồng thời sẽ gửi scope mà mình đã yêu câu 
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

export default authRouter;
