"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMap = void 0;
const User_1 = require("../domain/entities/User");
const UserEmail_1 = require("../domain/valueObjects/UserEmail");
const UserPassword_1 = require("../domain/valueObjects/UserPassword");
class UserMap {
    static async toPersistence(user) {
        const passwordHash = await user.password.getHashedValue();
        return {
            _id: user.id.toString(),
            username: user.username,
            email: user.email.value,
            password: passwordHash,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updatedAt: user.props.updatedAt,
            deletedAt: user.deletedAt,
            notificationToken: user.notificationToken
        };
    }
    static toDomain(raw) {
        if (!raw)
            return null;
        const userEmailOrError = UserEmail_1.UserEmail.create(raw.email);
        const userPasswordOrError = UserPassword_1.UserPassword.createFromHash(raw.password);
        if (userEmailOrError.isFailure || userPasswordOrError.isFailure) {
            console.error("Erro ao converter usuário do banco para domínio:", raw);
            return null;
        }
        const userOrError = User_1.User.create({
            username: raw.username,
            email: userEmailOrError.getValue(),
            password: userPasswordOrError.getValue(),
            notificationToken: raw.notificationToken,
            avatar: raw.avatar
        }, raw._id);
        if (userOrError.isSuccess) {
            const user = userOrError.getValue();
            user.props.createdAt = raw.createdAt;
            user.props.updatedAt = raw.updatedAt;
            user.props.deletedAt = raw.deletedAt;
            return user;
        }
        return null;
    }
}
exports.UserMap = UserMap;
