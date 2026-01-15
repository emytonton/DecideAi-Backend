"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerFriendRequestController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class AnswerFriendRequestController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        const { requestId, action } = req.body;
        try {
            const result = await this.useCase.execute({ userId, requestId, action });
            if (result.isFailure)
                return this.clientError(res, result.error);
            return this.ok(res);
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.AnswerFriendRequestController = AnswerFriendRequestController;
