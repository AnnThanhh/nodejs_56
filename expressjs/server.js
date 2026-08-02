import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/helpers/appErrror.helper.js";
const app = express();

app.use(express.json()); //middleware để parse dữ liệu json từ client gửi lên server

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
