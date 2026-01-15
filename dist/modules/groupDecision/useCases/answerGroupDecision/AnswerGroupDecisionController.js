"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerGroupDecisionController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class AnswerGroupDecisionController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        const { decisionId, voteOption, decline } = req.body;
        try {
            const result = await this.useCase.execute({
                userId,
                decisionId,
                voteOption,
                decline
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
exports.AnswerGroupDecisionController = AnswerGroupDecisionController;
