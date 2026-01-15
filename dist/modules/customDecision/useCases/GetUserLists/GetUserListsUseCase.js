"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserListsUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class GetUserListsUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(userId) {
        const lists = await this.repo.findByUserId(userId);
        const data = lists.map(l => ({
            id: l.id.toString(),
            title: l.title,
            options: l.options,
            createdAt: l.createdAt
        }));
        return Result_1.Result.ok(data);
    }
}
exports.GetUserListsUseCase = GetUserListsUseCase;
