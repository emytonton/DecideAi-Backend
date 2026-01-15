"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserListUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
const UserList_1 = require("../../domain/entities/UserList");
class CreateUserListUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(req) {
        const listOrError = UserList_1.UserList.create({
            userId: req.userId,
            title: req.title,
            options: req.options
        });
        if (listOrError.isFailure) {
            return Result_1.Result.fail(listOrError.error);
        }
        const list = listOrError.getValue();
        await this.repo.save(list);
        return Result_1.Result.ok(list);
    }
}
exports.CreateUserListUseCase = CreateUserListUseCase;
