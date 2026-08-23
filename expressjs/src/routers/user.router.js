import express from "express";
import { userController } from "../controllers/user.controller.js";
import multer from "multer";
import { uploadDiskStorage } from "../common/multer/disk-storage.multer.js";
import { protect } from "../common/middlewares/protect.middleware.js";
import { uploadMemoryStorage } from "../common/multer/memory-storage.multer.js";

const userRouter = express.Router();

// const upload = multer({ dest: "images/" });
// Tạo route CRUD
userRouter.post(
  "/avatar-local",
  protect,
  uploadDiskStorage.single("avatar"),
  userController.avatarLocal,
);
userRouter.post(
  "/avatar-cloud",
  protect,
  uploadMemoryStorage.single("avatar"),
  userController.avatarCloud,
);

userRouter.get("/", userController.findAll);

userRouter.get("/:userID", userController.findOne);

export default userRouter;
