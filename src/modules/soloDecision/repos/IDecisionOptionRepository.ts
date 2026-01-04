import { DecisionOption } from "../domain/entities/DecisionOption";

export interface IDecisionOptionRepository {
  
  findByCategory(category: string): Promise<DecisionOption[]>;
  save(option: DecisionOption): Promise<void>;
}