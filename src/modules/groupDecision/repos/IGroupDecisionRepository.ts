import { GroupDecision } from "../domain/entities/GroupDecision";

export interface IGroupDecisionRepository {
  save(decision: GroupDecision): Promise<void>;
  findById(id: string): Promise<GroupDecision | null>;
  findManyByUserId(userId: string): Promise<GroupDecision[]>;
}