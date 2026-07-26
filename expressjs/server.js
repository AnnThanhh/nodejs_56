import express from "express";
import rootRouter from "./src/routers/root.router.js";


const app = express();

// console.log("đây là app", app)
//url: localhost:3069/api/article
app.use("/api", rootRouter);

const PORT = 3069;
app.listen(PORT, () => {
  console.log(`server online at localhost:${PORT}`);
});

// es5: const express = require("express")
// es6: module || es-module
