"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickRandomOptionUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class PickRandomOptionUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(req) {
        let optionsToPickFrom = [];
        if (req.listId) {
            const list = await this.repo.findById(req.listId);
            if (!list)
                return Result_1.Result.fail("Lista não encontrada.");
            optionsToPickFrom = list.options;
        }
        else if (req.tempOptions && req.tempOptions.length > 0) {
            optionsToPickFrom = req.tempOptions;
        }
        else {
            return Result_1.Result.fail("Você precisa enviar um ID de lista ou opções manuais.");
        }
        if (optionsToPickFrom.length === 0)
            return Result_1.Result.fail("A lista está vazia.");
        const randomIndex = Math.floor(Math.random() * optionsToPickFrom.length);
        const winner = optionsToPickFrom[randomIndex];
        return Result_1.Result.ok(winner);
    }
}
exports.PickRandomOptionUseCase = PickRandomOptionUseCase;
