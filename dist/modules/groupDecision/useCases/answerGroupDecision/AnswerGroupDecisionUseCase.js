"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerGroupDecisionUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
const NotificationService_1 = require("../../../../shared/infra/services/NotificationService");
class AnswerGroupDecisionUseCase {
    constructor(groupRepo, userRepo) {
        this.groupRepo = groupRepo;
        this.userRepo = userRepo;
    }
    async execute(req) {
        const decision = await this.groupRepo.findById(req.decisionId);
        if (!decision)
            return Result_1.Result.fail("Decisão não encontrada.");
        const participant = decision.participants.find(p => p.userId === req.userId);
        if (!participant)
            return Result_1.Result.fail("Você não é um participante desta decisão.");
        if (req.decline) {
            const result = decision.decline(req.userId);
            if (result.isFailure)
                return Result_1.Result.fail(result.error);
        }
        else if (req.voteOption) {
            if (participant.vote) {
                return Result_1.Result.fail("Você já votou nesta decisão e não pode votar novamente.");
            }
            const result = decision.vote(req.userId, req.voteOption);
            if (result.isFailure)
                return Result_1.Result.fail(result.error);
        }
        else {
            return Result_1.Result.fail("Voto ou recusa obrigatórios.");
        }
        await this.groupRepo.save(decision);
        if (decision.status === 'finished' && decision.winner) {
            this.notifyCompletion(decision);
        }
        return Result_1.Result.ok({
            status: decision.status,
            winner: decision.winner,
            hasVoted: !!participant.vote,
            myVote: participant.vote,
            myStatus: participant.status
        });
    }
    async notifyCompletion(decision) {
        const messages = [];
        for (const p of decision.participants) {
            if (p.status !== 'declined') {
                const user = await this.userRepo.findById(p.userId);
                if (user && user.notificationToken) {
                    messages.push({
                        to: user.notificationToken,
                        title: "Temos um vencedor! 🏆",
                        body: `A decisão "${decision.title}" acabou. Vencedor: ${decision.winner}`,
                        data: { decisionId: decision.id.toString(), type: 'RESULT' }
                    });
                }
            }
        }
        NotificationService_1.NotificationService.send(messages);
    }
}
exports.AnswerGroupDecisionUseCase = AnswerGroupDecisionUseCase;
