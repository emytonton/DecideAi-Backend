"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMyDecisionsUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class GetMyDecisionsUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(userId) {
        const decisions = await this.repo.findManyByUserId(userId);
        const data = decisions.map(d => {
            const myParticipant = d.participants.find(p => p.userId === userId);
            return {
                id: d.id.toString(),
                title: d.title,
                status: d.status,
                myStatus: myParticipant ? myParticipant.status : 'unknown',
                winner: d.winner,
                hasViewedResult: myParticipant ? myParticipant.hasViewedResult : true,
                createdAt: d.createdAt,
                hasVoted: myParticipant ? !!myParticipant.vote : false,
                myVote: myParticipant?.vote || null
            };
        });
        return Result_1.Result.ok(data);
    }
}
exports.GetMyDecisionsUseCase = GetMyDecisionsUseCase;
