import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import { protectv2 } from "../common/middlewares/protectv2.middleware.js";
const authRouter = express.Router();

// Tạo route CRUD
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
// authRouter.get("/get-info", protect, authController.getInfo);
authRouter.get("/get-info", protectv2, authController.getInfo);

export default authRouter;
