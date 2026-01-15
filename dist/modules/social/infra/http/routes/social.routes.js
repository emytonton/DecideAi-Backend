"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialRouter = void 0;
const express_1 = __importDefault(require("express"));
const ensureAuthenticated_1 = require("../../../../../shared/infra/http/middleware/ensureAuthenticated");
const useCases_1 = require("../../../useCases");
const socialRouter = express_1.default.Router();
exports.socialRouter = socialRouter;
socialRouter.get('/ping', (req, res) => {
    return res.json({ message: 'Social Router is working!' });
});
socialRouter.use(ensureAuthenticated_1.ensureAuthenticated);
socialRouter.get('/friends', (req, res) => useCases_1.getFriendsController.execute(req, res));
socialRouter.post('/friends/request', (req, res) => useCases_1.sendFriendRequestController.execute(req, res));
socialRouter.post('/friends/response', (req, res) => useCases_1.answerFriendRequestController.execute(req, res));
socialRouter.delete('/friends', (req, res) => useCases_1.removeFriendController.execute(req, res));
