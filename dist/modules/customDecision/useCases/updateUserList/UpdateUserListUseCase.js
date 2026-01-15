"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserListUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class UpdateUserListUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(req) {
        const list = await this.repo.findById(req.listId);
        if (!list) {
            return Result_1.Result.fail("Lista não encontrada.");
        }
        if (list.userId !== req.userId) {
            return Result_1.Result.fail("Você não tem permissão para editar esta lista.");
        }
        const updateResult = list.update(req.title, req.options);
        if (updateResult.isFailure) {
            return Result_1.Result.fail(updateResult.error);
        }
        await this.repo.save(list);
        return Result_1.Result.ok();
    }
}
exports.UpdateUserListUseCase = UpdateUserListUseCase;
