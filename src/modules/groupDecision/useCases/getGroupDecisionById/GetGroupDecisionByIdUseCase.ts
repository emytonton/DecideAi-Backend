import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IGroupDecisionRepository } from "../../repos/IGroupDecisionRepository";

interface RequestDTO {
  decisionId: string;
  userId: string;
}

interface ResponseDTO {
  id: string;
  title: string;
  status: string;
  winner: string | null;
  options: string[];
  createdAt: Date;
  
  
  participants: { 
    userId: string; 
    status: string;
    hasVoted: boolean; 
    vote: string | null; 
  }[];
  
  
  myStatus: string | null;
  hasVoted: boolean;
  myVote: string | null;
}

export class GetGroupDecisionByIdUseCase implements UseCase<RequestDTO, Promise<Result<ResponseDTO>>> {
  constructor(private repo: IGroupDecisionRepository) {}

  async execute(req: RequestDTO): Promise<Result<ResponseDTO>> {
    const decision = await this.repo.findById(req.decisionId);

    if (!decision) {
      return Result.fail("Decisão não encontrada.");
    }

    const me = decision.participants.find(p => p.userId === req.userId);
    
    if (!me) {
      return Result.fail("Você não tem permissão para ver esta decisão.");
    }

    return Result.ok<ResponseDTO>({
      id: decision.id.toString(),
      title: decision.title,
      status: decision.status,
      winner: decision.winner || null,
      createdAt: decision.createdAt,
      options: decision.options,
      
     
      participants: decision.participants.map(p => ({
        userId: p.userId,
        status: p.status,
        hasVoted: !!p.vote,   
        vote: p.vote || null  
      })),
     

      
      myStatus: me.status,
      hasVoted: !!me.vote,
      myVote: me.vote || null
    });
  }
}