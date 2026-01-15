"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.secret = process.env.JWT_SECRET || 'segredo_padrao_inseguro';
        this.expires = '1d';
    }
    signJWT(user) {
        const payload = {
            userId: user.id.toString(),
            email: user.email.value,
            username: user.username
        };
        const signInOptions = {
            expiresIn: this.expires,
        };
        return jsonwebtoken_1.default.sign(payload, this.secret, signInOptions);
    }
}
exports.AuthService = AuthService;
