"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnswerGroupDecisionUseCase_1 = require("../answerGroupDecision/AnswerGroupDecisionUseCase");
const GroupDecision_1 = require("../../domain/entities/GroupDecision");
// MOCK: Um repositório falso
const makeFakeRepo = () => {
    return {
        save: jest.fn().mockResolvedValue(void 0),
        findById: jest.fn(),
        findManyByUserId: jest.fn(),
    };
};
// HELPERS: Criar dados falsos
const makeFakeDecision = (props = {}) => {
    // AQUI A MUDANÇA: Passamos o ID "decision-123" direto como string no segundo argumento
    return GroupDecision_1.GroupDecision.create({
        title: "Pizza ou Hamburguer?",
        creatorId: "user-1",
        status: "OPEN",
        participants: [
            { userId: "user-1", status: "ACCEPTED", hasViewedResult: false },
            { userId: "user-2", status: "ACCEPTED", hasViewedResult: false }
        ],
        options: ["opt-1", "opt-2"],
        ...props
    }, "decision-123").getValue();
};
describe('Answer Group Decision (Votar)', () => {
    it('deve permitir que um participante vote em uma decisão aberta', async () => {
        // ARRANGE
        const fakeRepo = makeFakeRepo();
        const decision = makeFakeDecision();
        fakeRepo.findById.mockResolvedValue(decision);
        const useCase = new AnswerGroupDecisionUseCase_1.AnswerGroupDecisionUseCase(fakeRepo);
        // ACT
        const result = await useCase.execute({
            decisionId: "decision-123",
            userId: "user-2",
            optionId: "opt-1"
        });
        // ASSERT
        expect(result.isSuccess).toBe(true);
        expect(fakeRepo.save).toHaveBeenCalled();
    });
    it('NÃO deve permitir votar se a decisão não existir', async () => {
        const fakeRepo = makeFakeRepo();
        fakeRepo.findById.mockResolvedValue(null);
        const useCase = new AnswerGroupDecisionUseCase_1.AnswerGroupDecisionUseCase(fakeRepo);
        const result = await useCase.execute({
            decisionId: "decision-inexistente",
            userId: "user-2",
            optionId: "opt-1"
        });
        expect(result.isFailure).toBe(true);
        // Ajuste a mensagem de erro conforme o que seu UseCase retorna
        // expect(result.error).toMatch(/not found/i); 
    });
    it('NÃO deve permitir votar se o usuário não for participante', async () => {
        const fakeRepo = makeFakeRepo();
        const decision = makeFakeDecision();
        fakeRepo.findById.mockResolvedValue(decision);
        const useCase = new AnswerGroupDecisionUseCase_1.AnswerGroupDecisionUseCase(fakeRepo);
        const result = await useCase.execute({
            decisionId: "decision-123",
            userId: "intruso-123", // Usuário que não está na lista
            optionId: "opt-1"
        });
        expect(result.isFailure).toBe(true);
    });
    it('NÃO deve permitir votar se a decisão já estiver ENCERRADA (FINISHED)', async () => {
        const fakeRepo = makeFakeRepo();
        // Criamos uma decisão já fechada
        const closedDecision = makeFakeDecision({ status: 'FINISHED' });
        fakeRepo.findById.mockResolvedValue(closedDecision);
        const useCase = new AnswerGroupDecisionUseCase_1.AnswerGroupDecisionUseCase(fakeRepo);
        const result = await useCase.execute({
            decisionId: "decision-123",
            userId: "user-2",
            optionId: "opt-1"
        });
        expect(result.isFailure).toBe(true);
    });
});
