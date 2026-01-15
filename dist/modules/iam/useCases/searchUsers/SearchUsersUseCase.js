"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUsersUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class SearchUsersUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(query) {
        if (!query || query.length < 1)
            return Result_1.Result.ok([]);
        const users = await this.userRepo.searchByUsername(query);
        const usersDTO = users.map(u => ({
            id: u.id.toString(),
            username: u.username,
            email: u.email.value,
            avatar: u.avatar || null,
            createdAt: u.createdAt
        }));
        return Result_1.Result.ok(usersDTO);
    }
}
exports.SearchUsersUseCase = SearchUsersUseCase;
