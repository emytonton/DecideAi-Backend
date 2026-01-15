"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserListSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true, ref: 'User' },
    title: { type: String, required: true },
    options: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now }
}, {
    _id: false,
    timestamps: true
});
exports.UserListModel = mongoose_1.default.model('UserList', UserListSchema);
