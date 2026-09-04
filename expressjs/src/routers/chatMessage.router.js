import express from "express";
import { chatMessageController } from "../controllers/chatMessage.controller.js";

const chatMessageRouter = express.Router();

// Tạo route CRUD
chatMessageRouter.post("/", chatMessageController.create);
chatMessageRouter.get("/", chatMessageController.findAll);
chatMessageRouter.patch("/seen", chatMessageController.markSeen);
chatMessageRouter.get("/:id", chatMessageController.findOne);
chatMessageRouter.patch("/:id", chatMessageController.update);
chatMessageRouter.delete("/:id", chatMessageController.remove);

export default chatMessageRouter;
