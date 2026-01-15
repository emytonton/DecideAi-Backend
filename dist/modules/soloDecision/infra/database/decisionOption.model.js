"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionOptionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DecisionOptionSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['movie', 'food', 'drink', 'exercise', 'book']
    },
    primaryFilter: { type: String, required: true },
    secondaryFilter: { type: String, required: true },
    imageUrl: { type: String }
}, {
    _id: false,
    timestamps: true
});
exports.DecisionOptionModel = mongoose_1.default.model('DecisionOption', DecisionOptionSchema);
