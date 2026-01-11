import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IGroupDecisionRepository } from "../../repos/IGroupDecisionRepository";

interface RequestDTO {
  decisionId: string;
  userId: string; // Para garantir que o usuário tem permissão de ver
}

interface ResponseDTO {
  id: string;
  title: string;
  status: string;
  winner: string | null;
  options: string[];
  participants: { userId: string; status: string }[];
}

export class GetGroupDecisionByIdUseCase implements UseCase<RequestDTO, Promise<Result<ResponseDTO>>> {
  constructor(private repo: IGroupDecisionRepository) {}

  async execute(req: RequestDTO): Promise<Result<ResponseDTO>> {
    const decision = await this.repo.findById(req.decisionId);

    if (!decision) {
      return Result.fail("Decisão não encontrada.");
    }

    // Opcional: Verificar se o usuário faz parte da decisão
    const isParticipant = decision.participants.some(p => p.userId === req.userId);
    if (!isParticipant) {
      return Result.fail("Você não tem permissão para ver esta decisão.");
    }

    return Result.ok<ResponseDTO>({
      id: decision.id.toString(),
      title: decision.title,
      status: decision.status,
      winner: decision.winner || null,
      options: decision.options, // <--- O IMPORTANTE: AS OPÇÕES ESTÃO AQUI
      participants: decision.participants.map(p => ({
        userId: p.userId,
        status: p.status
      }))
    });
  }
}