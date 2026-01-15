"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserProfileController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class GetUserProfileController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        try {
            const result = await this.useCase.execute(userId);
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
exports.GetUserProfileController = GetUserProfileController;
