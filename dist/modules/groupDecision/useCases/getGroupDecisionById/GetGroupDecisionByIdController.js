"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGroupDecisionByIdController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class GetGroupDecisionByIdController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        const { id } = req.params;
        try {
            const result = await this.useCase.execute({
                decisionId: id,
                userId: userId
            });
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
exports.GetGroupDecisionByIdController = GetGroupDecisionByIdController;
