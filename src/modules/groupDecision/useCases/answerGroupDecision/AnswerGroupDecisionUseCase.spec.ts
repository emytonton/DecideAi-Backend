import { AnswerGroupDecisionUseCase } from "./AnswerGroupDecisionUseCase";
import { IGroupDecisionRepository } from "../../repos/IGroupDecisionRepository";
import { IUserRepository } from "../../../iam/repos/IUserRepository"; 
import { GroupDecision } from "../../domain/entities/GroupDecision";


const makeFakeDecisionRepo = (): IGroupDecisionRepository => {
  return {
    save: jest.fn().mockResolvedValue(void 0),
    findById: jest.fn(),
    findManyByUserId: jest.fn(),
  } as unknown as IGroupDecisionRepository;
};


const makeFakeUserRepo = (): IUserRepository => {
  return {
    exists: jest.fn().mockResolvedValue(true), 
    findById: jest.fn(),
    save: jest.fn(),
  } as unknown as IUserRepository;
};


const makeFakeDecision = (props: any = {}): GroupDecision => {
  return GroupDecision.create({
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
    
    const fakeDecisionRepo = makeFakeDecisionRepo();
    const fakeUserRepo = makeFakeUserRepo();
    
    const decision = makeFakeDecision(); 
    (fakeDecisionRepo.findById as jest.Mock).mockResolvedValue(decision);

    const useCase = new AnswerGroupDecisionUseCase(fakeDecisionRepo, fakeUserRepo);

  
    const result = await useCase.execute({
      decisionId: "decision-123",
      userId: "user-2",
      voteOption: "opt-1" 
    });

    
    expect(result.isSuccess).toBe(true);
    expect(fakeDecisionRepo.save).toHaveBeenCalled();
  });

  it('NÃO deve permitir votar se a decisão não existir', async () => {
    const fakeDecisionRepo = makeFakeDecisionRepo();
    const fakeUserRepo = makeFakeUserRepo();

    (fakeDecisionRepo.findById as jest.Mock).mockResolvedValue(null);

    const useCase = new AnswerGroupDecisionUseCase(fakeDecisionRepo, fakeUserRepo);

    const result = await useCase.execute({
      decisionId: "decision-inexistente",
      userId: "user-2",
      voteOption: "opt-1" 
    });

    expect(result.isFailure).toBe(true);
  });

  it('NÃO deve permitir votar se o usuário não for participante', async () => {
    const fakeDecisionRepo = makeFakeDecisionRepo();
    const fakeUserRepo = makeFakeUserRepo();
    
    const decision = makeFakeDecision(); 
    (fakeDecisionRepo.findById as jest.Mock).mockResolvedValue(decision);

    const useCase = new AnswerGroupDecisionUseCase(fakeDecisionRepo, fakeUserRepo);

    const result = await useCase.execute({
      decisionId: "decision-123",
      userId: "intruso-123", 
      voteOption: "opt-1" 
    });

    expect(result.isFailure).toBe(true);
  });

  it('NÃO deve permitir votar se a decisão já estiver ENCERRADA (FINISHED)', async () => {
    const fakeDecisionRepo = makeFakeDecisionRepo();
    const fakeUserRepo = makeFakeUserRepo();

    const closedDecision = makeFakeDecision({ status: 'FINISHED' }); 
    (fakeDecisionRepo.findById as jest.Mock).mockResolvedValue(closedDecision);

    const useCase = new AnswerGroupDecisionUseCase(fakeDecisionRepo, fakeUserRepo);

    const result = await useCase.execute({
      decisionId: "decision-123",
      userId: "user-2",
      voteOption: "opt-1" 
    });

    expect(result.isFailure).toBe(true);
  });
});