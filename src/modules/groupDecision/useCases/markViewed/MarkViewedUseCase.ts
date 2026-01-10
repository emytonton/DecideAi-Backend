import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IGroupDecisionRepository } from "../../repos/IGroupDecisionRepository";

interface RequestDTO { 
  userId: string; 
  decisionId: string; 
}

export class MarkViewedUseCase implements UseCase<RequestDTO, Promise<Result<void>>> {
  constructor(private repo: IGroupDecisionRepository) {}

  async execute(req: RequestDTO): Promise<Result<void>> {
    const decision = await this.repo.findById(req.decisionId);
    
    if (!decision) {
      return Result.fail("Decisão não encontrada.");
    }

    
    const result = decision.markResultAsViewed(req.userId);
    
    if (result.isFailure) {
      return Result.fail(result.error as string);
    }

    await this.repo.save(decision);
    return Result.ok();
  }
}