"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserListController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class CreateUserListController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        const { title, options } = req.body;
        try {
            const result = await this.useCase.execute({ userId, title, options });
            if (result.isFailure) {
                return this.clientError(res, result.error);
            }
            const list = result.getValue();
            return res.status(201).json({
                id: list.id.toString(),
                userId: list.userId,
                title: list.title,
                options: list.options,
                createdAt: list.createdAt
            });
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.CreateUserListController = CreateUserListController;
