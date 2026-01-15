"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notificationToken: { type: String, default: null },
    avatar: { type: String },
    deletedAt: { type: Date, default: null },
    createdAt: { type: Date, required: true }
}, {
    _id: false,
    timestamps: true
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
