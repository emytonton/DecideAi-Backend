import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IDecisionOptionRepository } from "../../repos/IDecisionOptionRepository";
import { DecisionOption } from "../../domain/entities/DecisionOption";

export class SeedDecisionUseCase implements UseCase<void, Promise<Result<void>>> {
  constructor(private repo: IDecisionOptionRepository) {}

  async execute(): Promise<Result<void>> {
    const data = [
      
      { category: 'movie', title: 'Diário de uma Paixão', primaryFilter: 'romance', secondaryFilter: 'prime video' },
      { category: 'movie', title: 'Vingadores: Ultimato', primaryFilter: 'acao', secondaryFilter: 'disney' },
      { category: 'movie', title: 'Hereditário', primaryFilter: 'terror', secondaryFilter: 'netflix' },
      { category: 'movie', title: 'Se Beber Não Case', primaryFilter: 'comedia', secondaryFilter: 'hbo' },
      
      
      { category: 'food', title: 'Sushi Combo', primaryFilter: 'japonesa', secondaryFilter: 'jantar' },
      { category: 'food', title: 'Lasanha à Bolonhesa', primaryFilter: 'italiana', secondaryFilter: 'almoco' },
      { category: 'food', title: 'Salada Caesar', primaryFilter: 'fit', secondaryFilter: 'almoco' },
      { category: 'food', title: 'Yakissoba', primaryFilter: 'chinesa', secondaryFilter: 'jantar' },
      { category: 'food', title: 'Pão de Queijo', primaryFilter: 'brasileira', secondaryFilter: 'cafe' },

      
      { category: 'exercise', title: 'Treino de Perna Pesado', primaryFilter: 'musculacao', secondaryFilter: 'noturno' },
      { category: 'exercise', title: 'Corrida no Parque', primaryFilter: 'corrida', secondaryFilter: 'diurno' },
      { category: 'exercise', title: 'Yoga Matinal', primaryFilter: 'aerobico', secondaryFilter: 'diurno' },

      
      { category: 'drink', title: 'Gin Tônica', primaryFilter: 'drinks', secondaryFilter: 'refrescante' },
      { category: 'drink', title: 'Milkshake de Morango', primaryFilter: 'milkshake', secondaryFilter: 'doce' },
      { category: 'drink', title: 'Coca-Cola Zero', primaryFilter: 'refrigerante', secondaryFilter: 'refrescante' },

      
      { category: 'book', title: 'O Hobbit', primaryFilter: 'fantasia', secondaryFilter: 'medio' },
      { category: 'book', title: 'It: A Coisa', primaryFilter: 'terror', secondaryFilter: 'grande' },
      { category: 'book', title: 'O Pequeno Príncipe', primaryFilter: 'aventura', secondaryFilter: 'pequena' }
    ];

    for (const item of data) {
      const option = DecisionOption.create(item as any).getValue();
      await this.repo.save(option);
    }

    return Result.ok();
  }
}