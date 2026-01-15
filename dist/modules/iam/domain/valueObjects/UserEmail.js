"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
const ValueObject_1 = require("../../../../shared/core/ValueObject");
const Result_1 = require("../../../../shared/core/Result");
class UserEmail extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Result_1.Result.fail("Endereço de email inválido.");
        }
        return Result_1.Result.ok(new UserEmail({ value: email.toLowerCase() }));
    }
}
exports.UserEmail = UserEmail;
