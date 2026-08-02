import express from "express";
import { articleController } from "../controllers/article.controller.js";

const articleRouter = express.Router();

//READ 
articleRouter.get(
  "/",
  (req, res, next) => {
    console.log("mid1");

    // if(false) {
    //     res.json({ message: "Lỗi ở mid1" });
    // } else {
    //   next();
    // }
    const payload = "Thông tin tìm được từ token";
    req.info = payload;
    next();
  },
  (req, res, next) => {
    console.log("mid2");
    console.log(req.info);
    next();
  },
  (req, res, next) => {
    console.log("mid3");
    console.log(req.info);
    // throw new Error("Lỗi ở mid3");
    next();
  },
  articleController.findAll,
);

//CREATE 
articleRouter.post("/", articleController.create)

export default articleRouter;
