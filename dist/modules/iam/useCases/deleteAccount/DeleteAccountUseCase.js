"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccountUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class DeleteAccountUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(userId) {
        const user = await this.userRepo.findById(userId);
        if (!user)
            return Result_1.Result.fail("Usuário não encontrado.");
        user.delete();
        await this.userRepo.save(user);
        return Result_1.Result.ok();
    }
}
exports.DeleteAccountUseCase = DeleteAccountUseCase;
