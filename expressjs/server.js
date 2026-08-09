import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/appErrror.helper.js";
import { logAPI } from "./src/common/middlewares/log-api.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// app.use((req, res, next) => {
//   res.setHeader(
//     "access-control-allow-methods",
//     "GET, POST, PUT, DELETE, PATCH",
//   );
//   (res.setHeader("access-control-allow-headers", "content-type"),
//     res.setHeader("access-control-allow-origin", "http://localhost:3000"));

//   next();
// });
app.use(cors({ origin: "http://localhost:3000" })); //middleware để cho phép FE gửi request lên server

app.use(express.json()); //middleware để parse dữ liệu json từ client gửi lên server

app.use(cookieParser()); //middleware để parse cookie từ client gửi lên server

app.use(logAPI()); //middleware để log thông tin request từ client gửi lên server

// console.log("đây là app", app)
//url: localhost:3069/api/article
app.use("/api", rootRouter);
app.use(appError);

const PORT = 3069;
app.listen(PORT, () => {
  console.log(`server online at localhost:${PORT}`);
});

// es5: const express = require("express")
// es6: module || es-module
