"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserListController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class DeleteUserListController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        const listId = req.params.id;
        try {
            await this.useCase.execute({ listId });
            return this.ok(res);
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.DeleteUserListController = DeleteUserListController;
