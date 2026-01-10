import { IGroupDecisionRepository } from "../IGroupDecisionRepository";
import { GroupDecision } from "../../domain/entities/GroupDecision";
import { GroupDecisionModel } from "../../infra/database/groupDecision.model";

export class MongooseGroupDecisionRepository implements IGroupDecisionRepository {
  
  async save(decision: GroupDecision): Promise<void> {
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

    await GroupDecisionModel.findOneAndUpdate(
      { _id: raw._id },
      raw,
      { upsert: true, new: true }
    );
  }

  async findById(id: string): Promise<GroupDecision | null> {
    const doc = await GroupDecisionModel.findById(id);
    if (!doc) return null;
    return GroupDecision.create(doc as any, doc._id).getValue();
  }

  async findManyByUserId(userId: string): Promise<GroupDecision[]> {
    const docs = await GroupDecisionModel.find({ "participants.userId": userId }).sort({ createdAt: -1 });
    return docs.map(d => GroupDecision.create(d as any, d._id).getValue());
  }
}