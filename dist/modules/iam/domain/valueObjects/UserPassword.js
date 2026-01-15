"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPassword = void 0;
const ValueObject_1 = require("../../../../shared/core/ValueObject");
const Result_1 = require("../../../../shared/core/Result");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserPassword extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    get isHashed() {
        return this.props.isHashed;
    }
    constructor(props) {
        super(props);
    }
    async comparePassword(plainTextPassword) {
        if (this.isHashed) {
            return bcryptjs_1.default.compare(plainTextPassword, this.value);
        }
        return this.value === plainTextPassword;
    }
    async getHashedValue() {
        if (this.isHashed) {
            return this.value;
        }
        return bcryptjs_1.default.hash(this.value, 10);
    }
    static create(password) {
        if (password === null || password === undefined || password.length < 6) {
            return Result_1.Result.fail("A senha deve ter pelo menos 6 caracteres.");
        }
        return Result_1.Result.ok(new UserPassword({ value: password, isHashed: false }));
    }
    static createFromHash(hashedPassword) {
        return Result_1.Result.ok(new UserPassword({ value: hashedPassword, isHashed: true }));
    }
}
exports.UserPassword = UserPassword;
