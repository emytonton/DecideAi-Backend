"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeSoloDecisionUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class MakeSoloDecisionUseCase {
    constructor(decisionRepo) {
        this.decisionRepo = decisionRepo;
    }
    async execute(req) {
        const allOptions = await this.decisionRepo.findByCategory(req.category);
        if (allOptions.length === 0) {
            return Result_1.Result.fail("Nenhuma opção encontrada nesta categoria para sortear.");
        }
        let filtered = allOptions;
        if (req.primaryFilter) {
            filtered = filtered.filter(o => o.primaryFilter.toLowerCase() === req.primaryFilter.toLowerCase());
        }
        if (req.secondaryFilter) {
            filtered = filtered.filter(o => o.secondaryFilter.toLowerCase() === req.secondaryFilter.toLowerCase());
        }
        let poolToChooseFrom = filtered;
        if (poolToChooseFrom.length === 0) {
            console.log("Nenhum item atendeu aos filtros. Sorteando entre todas as opções da categoria.");
            poolToChooseFrom = allOptions;
        }
        const randomIndex = Math.floor(Math.random() * poolToChooseFrom.length);
        const chosenOne = poolToChooseFrom[randomIndex];
        return Result_1.Result.ok(chosenOne);
    }
}
exports.MakeSoloDecisionUseCase = MakeSoloDecisionUseCase;
