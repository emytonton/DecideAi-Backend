import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IDecisionOptionRepository } from "../../repos/IDecisionOptionRepository";
import { DecisionOption } from "../../domain/entities/DecisionOption";

interface RequestDTO {
  category: string;
  primaryFilter?: string;  
  secondaryFilter?: string; 
}

export class MakeSoloDecisionUseCase implements UseCase<RequestDTO, Promise<Result<DecisionOption>>> {
  constructor(private decisionRepo: IDecisionOptionRepository) {}

  async execute(req: RequestDTO): Promise<Result<DecisionOption>> {
    
    const allOptions = await this.decisionRepo.findByCategory(req.category);

    if (allOptions.length === 0) {
      return Result.fail("Nenhuma opção encontrada nesta categoria para sortear.");
    }

    
    let filtered = allOptions;

    if (req.primaryFilter) {
      filtered = filtered.filter(o => o.primaryFilter.toLowerCase() === req.primaryFilter!.toLowerCase());
    }

    if (req.secondaryFilter) {
      filtered = filtered.filter(o => o.secondaryFilter.toLowerCase() === req.secondaryFilter!.toLowerCase());
    }

    
    let poolToChooseFrom = filtered;

    if (poolToChooseFrom.length === 0) {
      console.log("Nenhum item atendeu aos filtros. Sorteando entre todas as opções da categoria.");
      poolToChooseFrom = allOptions;
    }

   
    const randomIndex = Math.floor(Math.random() * poolToChooseFrom.length);
    const chosenOne = poolToChooseFrom[randomIndex];

    return Result.ok(chosenOne);
  }
}