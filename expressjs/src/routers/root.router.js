import express from "express";
import articleRouter from "./article.router.js";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import chatGroupRouter from "./chatGroup.router.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import chatMessageRouter from "./chatMessage.router.js";
import { protectv2 } from "../common/middlewares/protectv2.middleware.js";

//Router: là 1 đối tượng của express, dùng để quản lý các route
const rootRouter = express.Router();

rootRouter.use("/article", articleRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/chat-group", protectv2, chatGroupRouter);
rootRouter.use("/chat-message", protectv2, chatMessageRouter);
export default rootRouter;
