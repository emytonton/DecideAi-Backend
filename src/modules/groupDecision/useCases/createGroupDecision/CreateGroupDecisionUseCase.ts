import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IGroupDecisionRepository } from "../../repos/IGroupDecisionRepository";
import { GroupDecision } from "../../domain/entities/GroupDecision";
import { IUserRepository } from "../../../iam/repos/IUserRepository"; 
import { NotificationService } from "../../../../shared/infra/services/NotificationService";

interface RequestDTO {
  creatorId: string;
  title: string;
  options: string[];
  invitedUserIds: string[];
}

export class CreateGroupDecisionUseCase implements UseCase<RequestDTO, Promise<Result<GroupDecision>>> {
  constructor(
    private groupRepo: IGroupDecisionRepository,
    private userRepo: IUserRepository 
  ) {}

  async execute(req: RequestDTO): Promise<Result<GroupDecision>> {
    
    const decisionOrError = GroupDecision.create({
      creatorId: req.creatorId,
      title: req.title,
      options: req.options,
      invitedUserIds: req.invitedUserIds
    });

    if (decisionOrError.isFailure) {
      return Result.fail(decisionOrError.error as string);
    }

    const decision = decisionOrError.getValue();
    
    
    await this.groupRepo.save(decision);


    this.sendInvites(req.invitedUserIds, req.title, decision.id.toString());

    return Result.ok(decision);
  }

  private async sendInvites(userIds: string[], title: string, decisionId: string) {
    const messages = [];
    for (const uid of userIds) {
      const user = await this.userRepo.findById(uid);
      if (user && user.notificationToken) {
        messages.push({
          to: user.notificationToken,
          title: "Decide Aí! 🎲",
          body: `Convite para decidir: "${title}"`,
          data: { decisionId, type: 'INVITE' }
        });
      }
    }
    NotificationService.send(messages);
  }
}