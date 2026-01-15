"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGroupDecisionUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
const GroupDecision_1 = require("../../domain/entities/GroupDecision");
const NotificationService_1 = require("../../../../shared/infra/services/NotificationService");
class CreateGroupDecisionUseCase {
    constructor(groupRepo, userRepo) {
        this.groupRepo = groupRepo;
        this.userRepo = userRepo;
    }
    async execute(req) {
        if (!req.title || req.title.trim().length === 0) {
            return Result_1.Result.fail("O título da decisão é obrigatório.");
        }
        if (!req.options || req.options.length < 2) {
            return Result_1.Result.fail("Uma decisão precisa de pelo menos 2 opções para ser votada.");
        }
        const decisionOrError = GroupDecision_1.GroupDecision.create({
            creatorId: req.creatorId,
            title: req.title,
            options: req.options,
            invitedUserIds: req.invitedUserIds
        });
        if (decisionOrError.isFailure) {
            return Result_1.Result.fail(decisionOrError.error);
        }
        const decision = decisionOrError.getValue();
        await this.groupRepo.save(decision);
        this.sendInvites(req.invitedUserIds, req.title, decision.id.toString());
        return Result_1.Result.ok(decision);
    }
    async sendInvites(userIds, title, decisionId) {
        const messages = [];
        for (const uid of userIds) {
            const user = await this.userRepo.findById(uid);
            if (user && user.notificationToken) {
                messages.push({
                    to: user.notificationToken,
                    title: "Decide Aí! 🎲",
                    body: `Convite para decidir: "${title}"`,
                    data: { decisionId, type: 'INVITE' }
                });
            }
        }
        NotificationService_1.NotificationService.send(messages);
    }
}
exports.CreateGroupDecisionUseCase = CreateGroupDecisionUseCase;
