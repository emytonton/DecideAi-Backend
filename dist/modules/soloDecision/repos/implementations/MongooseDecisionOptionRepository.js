"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseDecisionOptionRepository = void 0;
const DecisionOption_1 = require("../../domain/entities/DecisionOption");
const decisionOption_model_1 = require("../../infra/database/decisionOption.model");
class MongooseDecisionOptionRepository {
    async findByCategory(category) {
        const docs = await decisionOption_model_1.DecisionOptionModel.find({ category });
        return docs.map(doc => DecisionOption_1.DecisionOption.create({
            title: doc.title,
            category: doc.category,
            primaryFilter: doc.primaryFilter,
            secondaryFilter: doc.secondaryFilter,
            imageUrl: doc.imageUrl || undefined
        }, doc._id).getValue());
    }
    async save(option) {
        const raw = {
            _id: option.id.toString(),
            title: option.title,
            category: option.category,
            primaryFilter: option.primaryFilter,
            secondaryFilter: option.secondaryFilter,
            imageUrl: option.imageUrl
        };
        await decisionOption_model_1.DecisionOptionModel.findOneAndUpdate({ _id: raw._id }, raw, { upsert: true, new: true });
    }
}
exports.MongooseDecisionOptionRepository = MongooseDecisionOptionRepository;
