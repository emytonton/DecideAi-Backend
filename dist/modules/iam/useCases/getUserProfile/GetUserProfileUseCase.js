"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserProfileUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class GetUserProfileUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(userId) {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            return Result_1.Result.fail("Usuário não encontrado.");
        }
        return Result_1.Result.ok({
            id: user.id.toString(),
            username: user.username,
            email: user.email.value,
            avatar: user.avatar,
            createdAt: user.createdAt
        });
    }
}
exports.GetUserProfileUseCase = GetUserProfileUseCase;
