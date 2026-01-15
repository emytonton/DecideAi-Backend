import { IDecisionOptionRepository } from "../IDecisionOptionRepository";
import { DecisionOption } from "../../domain/entities/DecisionOption";
import { DecisionOptionModel } from "../../infra/database/decisionOption.model";

export class MongooseDecisionOptionRepository implements IDecisionOptionRepository {
  
  async findByCategory(category: string): Promise<DecisionOption[]> {
    const docs = await DecisionOptionModel.find({ category });
    
    return docs.map(doc => DecisionOption.create({
      title: doc.title,
      category: doc.category as any,
      primaryFilter: doc.primaryFilter,
      secondaryFilter: doc.secondaryFilter,
      imageUrl: doc.imageUrl || undefined
    }, doc._id).getValue());
  }

  async save(option: DecisionOption): Promise<void> {
    const raw = {
      _id: option.id.toString(),
      title: option.title,
      category: option.category,
      primaryFilter: option.primaryFilter,
      secondaryFilter: option.secondaryFilter,
      imageUrl: option.imageUrl
    };

    await DecisionOptionModel.findOneAndUpdate(
      { _id: raw._id },
      raw,
      { upsert: true, new: true }
    );
  }
}