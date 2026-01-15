"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGroupDecisionController = void 0;
const BaseController_1 = require("../../../../shared/infra/http/models/BaseController");
class CreateGroupDecisionController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl(req, res) {
        // @ts-ignore
        const userId = req.userId;
        const { title, options, invitedUserIds } = req.body;
        try {
            const result = await this.useCase.execute({
                creatorId: userId,
                title,
                options,
                invitedUserIds
            });
            if (result.isFailure) {
                return this.clientError(res, result.error);
            }
            const decision = result.getValue();
            return res.status(201).json({
                id: decision.id.toString(),
                creatorId: decision.creatorId,
                title: decision.title,
                options: decision.options,
                participants: decision.participants,
                status: decision.status,
                createdAt: decision.createdAt
            });
        }
        catch (err) {
            return this.fail(res, err);
        }
    }
}
exports.CreateGroupDecisionController = CreateGroupDecisionController;
