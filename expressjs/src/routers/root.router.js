import express from "express";
import articleRouter from "./article.router.js";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";

//Router: là 1 đối tượng của express, dùng để quản lý các route
const rootRouter = express.Router();

rootRouter.use("/article", articleRouter);
rootRouter.use("/auth", authRouter);

rootRouter.use("/user", userRouter);
export default rootRouter;
