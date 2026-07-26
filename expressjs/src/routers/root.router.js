import express from "express";
import articleRouter from "./article.router.js";

//Router: là 1 đối tượng của express, dùng để quản lý các route
const rootRouter = express.Router();

rootRouter.use("/article", articleRouter);
export default rootRouter;
