"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseGroupDecisionRepository = void 0;
const GroupDecision_1 = require("../../domain/entities/GroupDecision");
const groupDecision_model_1 = require("../../infra/database/groupDecision.model");
class MongooseGroupDecisionRepository {
    async save(decision) {
        const raw = {
            _id: decision.id.toString(),
            creatorId: decision.creatorId,
            title: decision.title,
            options: decision.options,
            participants: decision.participants,
            status: decision.status,
            winner: decision.winner,
            createdAt: decision.createdAt
        };
        await groupDecision_model_1.GroupDecisionModel.findOneAndUpdate({ _id: raw._id }, raw, { upsert: true, new: true });
    }
    async findById(id) {
        const doc = await groupDecision_model_1.GroupDecisionModel.findById(id);
        if (!doc)
            return null;
        return GroupDecision_1.GroupDecision.create(doc, doc._id).getValue();
    }
    async findManyByUserId(userId) {
        const docs = await groupDecision_model_1.GroupDecisionModel.find({ "participants.userId": userId }).sort({ createdAt: -1 });
        return docs.map(d => GroupDecision_1.GroupDecision.create(d, d._id).getValue());
    }
}
exports.MongooseGroupDecisionRepository = MongooseGroupDecisionRepository;
