import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/appErrror.helper.js";
import { logAPI } from "./src/common/middlewares/log-api.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { appLimit } from "./src/common/middlewares/rateLimit.middleware.js";
import { initLoginGooglePassport } from "./src/common/passport/login-google.passport.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./src/common/swagger/init.swagger.js";
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

initLoginGooglePassport(); //khởi tạo passport login google

app.use(express.static("public")) //middleware để cho phép FE truy cập vào các file tĩnh trong thư mục gốc của project

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger

//url: localhost:3069/api/article
app.use("/api", appLimit, rootRouter);
app.use(appError);

const PORT = 3069;
app.listen(PORT, () => {
  console.log(`server online at localhost:${PORT}`);
});

// es5: const express = require("express")
// es6: module || es-module
