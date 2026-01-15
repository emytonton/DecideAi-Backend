"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUsersController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class SearchUsersController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const query = req.query.q;
        try {
            const result = await this.useCase.execute(query || '');
            return this.ok(res, result.getValue());
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.SearchUsersController = SearchUsersController;
