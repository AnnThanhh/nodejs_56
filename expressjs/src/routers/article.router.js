import express from "express";
import { articleController } from "../controllers/article.controller.js";

const articleRouter = express.Router();

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
  (err, req, res, next) => {
    console.log("mid3");
    console.log(req.info);
    next();
  },
  articleController.findAll,
);

//
export default articleRouter;
