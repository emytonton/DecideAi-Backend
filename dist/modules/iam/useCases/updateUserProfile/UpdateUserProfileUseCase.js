"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserProfileUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
const UserEmail_1 = require("../../domain/valueObjects/UserEmail");
class UpdateUserProfileUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(req) {
        const user = await this.userRepo.findById(req.userId);
        if (!user)
            return Result_1.Result.fail("Usuário não encontrado.");
        if (req.username && req.username !== user.username) {
            const usernameTaken = await this.userRepo.existsByUsername(req.username);
            if (usernameTaken) {
                return Result_1.Result.fail("Este nome de usuário já está em uso.");
            }
            const updateResult = user.updateUsername(req.username);
            if (updateResult.isFailure)
                return Result_1.Result.fail(updateResult.error);
        }
        if (req.email && req.email !== user.email.value) {
            const emailExists = await this.userRepo.exists(req.email);
            if (emailExists) {
                return Result_1.Result.fail("Este e-mail já está em uso.");
            }
            const emailOrError = UserEmail_1.UserEmail.create(req.email);
            if (emailOrError.isFailure) {
                return Result_1.Result.fail(emailOrError.error);
            }
            user.updateEmail(emailOrError.getValue());
        }
        if (req.avatar) {
            user.updateAvatar(req.avatar);
        }
        await this.userRepo.save(user);
        return Result_1.Result.ok({
            id: user.id.toString(),
            username: user.username,
            email: user.email.value,
            avatar: user.avatar
        });
    }
}
exports.UpdateUserProfileUseCase = UpdateUserProfileUseCase;
