"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProfileController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class UpdateUserProfileController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        const { username, avatar, email } = req.body;
        try {
            const result = await this.useCase.execute({ userId, username, avatar, email });
            if (result.isFailure) {
                return this.clientError(res, result.error);
            }
            return this.ok(res, result.getValue());
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.UpdateUserProfileController = UpdateUserProfileController;
