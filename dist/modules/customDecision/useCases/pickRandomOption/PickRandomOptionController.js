"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickRandomOptionController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class PickRandomOptionController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const { listId, tempOptions } = req.body;
        try {
            const result = await this.useCase.execute({ listId, tempOptions });
            if (result.isFailure) {
                return this.clientError(res, result.error);
            }
            return this.ok(res, {
                result: result.getValue()
            });
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.PickRandomOptionController = PickRandomOptionController;
