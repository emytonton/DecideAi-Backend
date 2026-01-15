"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserListController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class UpdateUserListController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        const listId = req.params.id;
        const { title, options } = req.body;
        try {
            const result = await this.useCase.execute({
                userId,
                listId,
                title,
                options
            });
            if (result.isFailure) {
                const error = result.error;
                if (error.includes("permissão")) {
                    return this.clientError(res, error);
                }
                return this.clientError(res, error);
            }
            return this.ok(res, { message: "Lista atualizada com sucesso." });
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.UpdateUserListController = UpdateUserListController;
