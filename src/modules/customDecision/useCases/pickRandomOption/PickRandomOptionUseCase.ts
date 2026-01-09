import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserListRepository } from "../../repos/IUserListRepository";

interface RequestDTO {
  listId?: string;       
  tempOptions?: string[]; 
}

export class PickRandomOptionUseCase implements UseCase<RequestDTO, Promise<Result<string>>> {
  constructor(private repo: IUserListRepository) {}

  async execute(req: RequestDTO): Promise<Result<string>> {
    let optionsToPickFrom: string[] = [];

    
    if (req.listId) {
      const list = await this.repo.findById(req.listId);
      if (!list) return Result.fail("Lista não encontrada.");
      optionsToPickFrom = list.options;
    } 
   
    else if (req.tempOptions && req.tempOptions.length > 0) {
      optionsToPickFrom = req.tempOptions;
    } else {
      return Result.fail("Você precisa enviar um ID de lista ou opções manuais.");
    }

    if (optionsToPickFrom.length === 0) return Result.fail("A lista está vazia.");

  
    const randomIndex = Math.floor(Math.random() * optionsToPickFrom.length);
    const winner = optionsToPickFrom[randomIndex];
    
    return Result.ok(winner);
  }
}