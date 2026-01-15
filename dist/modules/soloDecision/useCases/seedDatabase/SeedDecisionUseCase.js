"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedDecisionUseCase = void 0;
const Result_1 = require("../../../../shared/core/Result");
const DecisionOption_1 = require("../../domain/entities/DecisionOption");
class SeedDecisionUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute() {
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
            const option = DecisionOption_1.DecisionOption.create(item).getValue();
            await this.repo.save(option);
        }
        return Result_1.Result.ok();
    }
}
exports.SeedDecisionUseCase = SeedDecisionUseCase;
