"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMyDecisionsController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class GetMyDecisionsController extends BaseController_1.BaseController {
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
                return this.fail(res, new Error(result.error ? result.error.toString() : 'Erro desconhecido'));
            }
            return this.ok(res, result.getValue());
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.GetMyDecisionsController = GetMyDecisionsController;
