"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetGroupDecisionByIdUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class GetGroupDecisionByIdUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(req) {
        const decision = await this.repo.findById(req.decisionId);
        if (!decision) {
            return Result_1.Result.fail("Decisão não encontrada.");
        }
        const me = decision.participants.find(p => p.userId === req.userId);
        if (!me) {
            return Result_1.Result.fail("Você não tem permissão para ver esta decisão.");
        }
        return Result_1.Result.ok({
            id: decision.id.toString(),
            title: decision.title,
            status: decision.status,
            winner: decision.winner || null,
            createdAt: decision.createdAt,
            options: decision.options,
            participants: decision.participants.map(p => ({
                userId: p.userId,
                status: p.status,
                hasVoted: !!p.vote,
                vote: p.vote || null
            })),
            myStatus: me.status,
            hasVoted: !!me.vote,
            myVote: me.vote || null
        });
    }
}
exports.GetGroupDecisionByIdUseCase = GetGroupDecisionByIdUseCase;
