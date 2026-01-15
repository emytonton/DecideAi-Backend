"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupDecisionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GroupDecisionSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    creatorId: { type: String, required: true, ref: 'User' },
    title: { type: String, required: true },
    options: [{ type: String, required: true }],
    status: { type: String, enum: ['open', 'finished'], default: 'open' },
    winner: { type: String },
    participants: [{
            _id: false,
            userId: { type: String, required: true, ref: 'User' },
            status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
            vote: { type: String }
        }],
    createdAt: { type: Date, default: Date.now }
}, {
    _id: false,
    timestamps: true
});
exports.GroupDecisionModel = mongoose_1.default.model('GroupDecision', GroupDecisionSchema);
