"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
const UserEmail_1 = require("../../domain/valueObjects/UserEmail");
const UserPassword_1 = require("../../domain/valueObjects/UserPassword");
const User_1 = require("../../domain/entities/User");
class CreateUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(request) {
        const { username, email, password } = request;
        try {
            const userAlreadyExists = await this.userRepo.exists(email);
            if (userAlreadyExists) {
                return Result_1.Result.fail("O e-mail já está em uso.");
            }
            const usernameTaken = await this.userRepo.existsByUsername(username);
            if (usernameTaken) {
                return Result_1.Result.fail("Este nome de usuário já está em uso.");
            }
            const emailOrError = UserEmail_1.UserEmail.create(email);
            const passwordOrError = UserPassword_1.UserPassword.create(password);
            const combinedPropsResult = Result_1.Result.combine([emailOrError, passwordOrError]);
            if (combinedPropsResult.isFailure) {
                return Result_1.Result.fail(combinedPropsResult.error);
            }
            const userOrError = User_1.User.create({
                username,
                email: emailOrError.getValue(),
                password: passwordOrError.getValue(),
            });
            if (userOrError.isFailure) {
                return Result_1.Result.fail(userOrError.error);
            }
            const user = userOrError.getValue();
            await this.userRepo.save(user);
            return Result_1.Result.ok({
                id: user.id.toString(),
                username: user.username,
                email: user.email.value
            });
        }
        catch (err) {
            return Result_1.Result.fail(err?.message || String(err));
        }
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
