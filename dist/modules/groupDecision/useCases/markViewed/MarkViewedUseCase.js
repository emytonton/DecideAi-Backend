"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkViewedUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class MarkViewedUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(req) {
        const decision = await this.repo.findById(req.decisionId);
        if (!decision) {
            return Result_1.Result.fail("Decisão não encontrada.");
        }
        const result = decision.markResultAsViewed(req.userId);
        if (result.isFailure) {
            return Result_1.Result.fail(result.error);
        }
        await this.repo.save(decision);
        return Result_1.Result.ok();
    }
}
exports.MarkViewedUseCase = MarkViewedUseCase;
