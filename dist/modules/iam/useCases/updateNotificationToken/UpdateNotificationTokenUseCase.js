"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotificationTokenUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
class UpdateNotificationTokenUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(req) {
        const user = await this.userRepo.findById(req.userId);
        if (!user) {
            return Result_1.Result.fail("Usuário não encontrado.");
        }
        user.notificationToken = req.token;
        await this.userRepo.save(user);
        return Result_1.Result.ok();
    }
}
exports.UpdateNotificationTokenUseCase = UpdateNotificationTokenUseCase;
