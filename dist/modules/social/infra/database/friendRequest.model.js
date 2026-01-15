"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FriendRequestSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    senderId: { type: String, required: true, ref: 'User' },
    receiverId: { type: String, required: true, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date }
}, {
    _id: false,
    timestamps: true
});
FriendRequestSchema.index({ senderId: 1, receiverId: 1 });
exports.FriendRequestModel = mongoose_1.default.model('FriendRequest', FriendRequestSchema);
