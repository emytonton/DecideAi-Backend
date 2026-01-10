import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IGroupDecisionRepository } from "../../repos/IGroupDecisionRepository";
import { IUserRepository } from "../../../iam/repos/IUserRepository";
import { NotificationService } from "../../../../shared/infra/services/NotificationService";

interface RequestDTO {
  userId: string;
  decisionId: string;
  voteOption?: string;
  decline?: boolean;
}

export class AnswerGroupDecisionUseCase implements UseCase<RequestDTO, Promise<Result<any>>> {
  constructor(
    private groupRepo: IGroupDecisionRepository,
    private userRepo: IUserRepository
  ) {}

  async execute(req: RequestDTO): Promise<Result<any>> {
    const decision = await this.groupRepo.findById(req.decisionId);
    if (!decision) return Result.fail("Decisão não encontrada.");

   
    if (req.decline) {
      const result = decision.decline(req.userId);
      if (result.isFailure) return Result.fail(result.error as string);
    } else if (req.voteOption) {
      const result = decision.vote(req.userId, req.voteOption);
      if (result.isFailure) return Result.fail(result.error as string);
    } else {
      return Result.fail("Voto ou recusa obrigatórios.");
    }

 
    await this.groupRepo.save(decision);

   
    if (decision.status === 'finished' && decision.winner) {
      this.notifyCompletion(decision);
    }

    return Result.ok({
      status: decision.status,
      winner: decision.winner
    });
  }

  private async notifyCompletion(decision: any) {
    const messages = [];
    
    for (const p of decision.participants) {
      if (p.status !== 'declined') {
        const user = await this.userRepo.findById(p.userId);
        if (user && user.notificationToken) {
          messages.push({
            to: user.notificationToken,
            title: "Temos um vencedor! 🏆",
            body: `A decisão "${decision.title}" acabou. Vencedor: ${decision.winner}`,
            data: { decisionId: decision.id.toString(), type: 'RESULT' }
          });
        }
      }
    }
    NotificationService.send(messages);
  }
}