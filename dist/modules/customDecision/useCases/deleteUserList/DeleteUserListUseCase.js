"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserListUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class DeleteUserListUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(req) {
        await this.repo.delete(req.listId);
        return Result_1.Result.ok();
    }
}
exports.DeleteUserListUseCase = DeleteUserListUseCase;
