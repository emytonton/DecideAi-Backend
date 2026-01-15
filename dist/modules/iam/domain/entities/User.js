"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Entity_1 = require("../../../../shared/core/Entity");
const Result_1 = require("../../../../shared/core/Result");
class User extends Entity_1.Entity {
    get username() { return this.props.username; }
    get email() { return this.props.email; }
    get password() { return this.props.password; }
    get avatar() { return this.props.avatar; }
    get createdAt() { return this.props.createdAt; }
    get deletedAt() { return this.props.deletedAt; }
    get isDeleted() { return !!this.props.deletedAt; }
    get notificationToken() { return this.props.notificationToken; }
    set notificationToken(token) { this.props.notificationToken = token; }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        if (!props.username || props.username.length < 3) {
            return Result_1.Result.fail("O nome de usuário deve ter pelo menos 3 caracteres.");
        }
        const user = new User({
            ...props,
            createdAt: new Date(),
            deletedAt: null
        }, id);
        return Result_1.Result.ok(user);
    }
    delete() {
        this.props.deletedAt = new Date();
    }
    updateAvatar(avatar) {
        this.props.avatar = avatar;
        this.props.updatedAt = new Date();
    }
    updateUsername(username) {
        if (username.length < 3)
            return Result_1.Result.fail("Username muito curto.");
        this.props.username = username;
        this.props.updatedAt = new Date();
        return Result_1.Result.ok();
    }
    updateEmail(email) {
        this.props.email = email;
        this.props.updatedAt = new Date();
    }
}
exports.User = User;
