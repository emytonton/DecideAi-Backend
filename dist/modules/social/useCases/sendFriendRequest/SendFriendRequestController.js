"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendFriendRequestController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class SendFriendRequestController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const senderId = req.userId;
        const { receiverId } = req.body;
        try {
            const result = await this.useCase.execute({ senderId, receiverId });
            if (result.isFailure) {
                return this.clientError(res, result.error);
            }
            const request = result.getValue();
            return this.ok(res, {
                id: request.id.toString(),
                senderId: request.senderId,
                receiverId: request.receiverId,
                status: request.status,
                createdAt: request.createdAt
            });
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.SendFriendRequestController = SendFriendRequestController;
