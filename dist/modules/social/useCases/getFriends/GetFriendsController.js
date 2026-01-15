"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFriendsController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class GetFriendsController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        try {
            const result = await this.useCase.execute(userId);
            return this.ok(res, result.getValue());
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.GetFriendsController = GetFriendsController;
