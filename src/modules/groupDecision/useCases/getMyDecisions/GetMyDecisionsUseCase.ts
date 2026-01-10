import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IGroupDecisionRepository } from "../../repos/IGroupDecisionRepository";


interface DecisionDTO {
  id: string;
  title: string;
  status: string; 
  myStatus: string; 
  winner?: string;
  hasViewedResult: boolean; 
  createdAt: Date;
}

export class GetMyDecisionsUseCase implements UseCase<string, Promise<Result<DecisionDTO[]>>> {
  constructor(private repo: IGroupDecisionRepository) {}

  async execute(userId: string): Promise<Result<DecisionDTO[]>> {
    const decisions = await this.repo.findManyByUserId(userId);

    const data: DecisionDTO[] = decisions.map(d => {
      
      const myParticipant = d.participants.find(p => p.userId === userId);

      return {
        id: d.id.toString(),
        title: d.title,
        status: d.status,
        myStatus: myParticipant ? myParticipant.status : 'unknown',
        winner: d.winner,
        hasViewedResult: myParticipant ? myParticipant.hasViewedResult : true, 
        createdAt: d.createdAt
      };
    });

    return Result.ok(data);
  }
}