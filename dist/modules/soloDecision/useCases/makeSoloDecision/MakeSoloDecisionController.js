"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeSoloDecisionController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class MakeSoloDecisionController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const { category, filter1, filter2 } = req.body;
        if (!category) {
            return this.clientError(res, "Categoria é obrigatória.");
        }
        try {
            const result = await this.useCase.execute({
                category,
                primaryFilter: filter1,
                secondaryFilter: filter2
            });
            if (result.isFailure) {
                return this.clientError(res, result.error);
            }
            const option = result.getValue();
            return this.ok(res, {
                id: option.id.toString(),
                title: option.title,
                category: option.category,
                details: `${option.primaryFilter} | ${option.secondaryFilter}`,
                imageUrl: option.imageUrl
            });
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.MakeSoloDecisionController = MakeSoloDecisionController;
