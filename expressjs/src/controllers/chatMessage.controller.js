import { responseSuccess } from "../common/helpers/response.helper.js";
import { chatMessageService } from "../services/chatMessage.service.js";

export const chatMessageController = {
  async create(req, res, next) {
    const result = await chatMessageService.create(req);
    const response = responseSuccess(result, `Create chatMessage successfully`);
    res.status(response.statusCode).json(response);
  },

  async findAll(req, res, next) {
    const result = await chatMessageService.findAll(req);
    const response = responseSuccess(
      result,
      `Get all chatMessages successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async findOne(req, res, next) {
    const result = await chatMessageService.findOne(req);
    const response = responseSuccess(
      result,
      `Get chatMessage #${req.params.id} successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async update(req, res, next) {
    const result = await chatMessageService.update(req);
    const response = responseSuccess(
      result,
      `Update chatMessage #${req.params.id} successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async remove(req, res, next) {
    const result = await chatMessageService.remove(req);
    const response = responseSuccess(
      result,
      `Remove chatMessage #${req.params.id} successfully`,
    );
    res.status(response.statusCode).json(response);
  },

  async markSeen(req, res, next) {
    const result = await chatMessageService.markSeen({
      chatGroupId: req.body.chatGroupId,
      userId: req.user.id,
    });
    const response = responseSuccess(result, `Mark seen successfully`);
    res.status(response.statusCode).json(response);
  },
};
