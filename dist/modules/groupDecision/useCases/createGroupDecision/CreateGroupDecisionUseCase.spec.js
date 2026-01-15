"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateGroupDecisionUseCase_1 = require("./CreateGroupDecisionUseCase");
const makeFakeDecisionRepo = () => {
    return {
        save: jest.fn().mockResolvedValue(void 0),
        findById: jest.fn(),
        findManyByUserId: jest.fn(),
    };
};
const makeFakeUserRepo = () => {
    return {
        exists: jest.fn().mockResolvedValue(true),
        findById: jest.fn().mockResolvedValue({ notificationToken: 'token-fake' }),
        save: jest.fn(),
    };
};
describe('Create Group Decision', () => {
    it('deve criar uma decisão com sucesso quando tudo estiver correto', async () => {
        const fakeDecisionRepo = makeFakeDecisionRepo();
        const fakeUserRepo = makeFakeUserRepo();
        const useCase = new CreateGroupDecisionUseCase_1.CreateGroupDecisionUseCase(fakeDecisionRepo, fakeUserRepo);
        const request = {
            creatorId: 'user-1',
            title: 'Onde vamos jantar?',
            options: ['Pizza', 'Sushi'],
            invitedUserIds: ['user-2', 'user-3']
        };
        const result = await useCase.execute(request);
        expect(result.isSuccess).toBe(true);
        expect(result.getValue()).toHaveProperty('id');
        expect(fakeDecisionRepo.save).toHaveBeenCalled();
    });
    it('deve falhar se tentar criar com menos de 2 opções', async () => {
        const fakeDecisionRepo = makeFakeDecisionRepo();
        const fakeUserRepo = makeFakeUserRepo();
        const useCase = new CreateGroupDecisionUseCase_1.CreateGroupDecisionUseCase(fakeDecisionRepo, fakeUserRepo);
        const request = {
            creatorId: 'user-1',
            title: 'Escolha solteira',
            options: ['Só tem eu'],
            invitedUserIds: ['user-2']
        };
        const result = await useCase.execute(request);
        expect(result.isFailure).toBe(true);
    });
    it('deve falhar se não tiver título', async () => {
        const fakeDecisionRepo = makeFakeDecisionRepo();
        const fakeUserRepo = makeFakeUserRepo();
        const useCase = new CreateGroupDecisionUseCase_1.CreateGroupDecisionUseCase(fakeDecisionRepo, fakeUserRepo);
        const request = {
            creatorId: 'user-1',
            title: '',
            options: ['A', 'B'],
            invitedUserIds: ['user-2']
        };
        const result = await useCase.execute(request);
        expect(result.isFailure).toBe(true);
    });
});
