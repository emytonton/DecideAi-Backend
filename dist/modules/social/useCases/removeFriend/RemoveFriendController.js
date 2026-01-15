"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveFriendController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class RemoveFriendController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        const { friendId } = req.body;
        try {
            const result = await this.useCase.execute({ userId, friendId });
            if (result.isFailure)
                return this.clientError(res, result.error);
            return this.ok(res);
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.RemoveFriendController = RemoveFriendController;
