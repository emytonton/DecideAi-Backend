import { CreateUserUseCase } from "./CreateUserUseCase";
import { IUserRepository } from "../../repos/IUserRepository";
import { User } from "../../domain/entities/User";


const makeFakeRepo = (): IUserRepository => {
  return {
    exists: jest.fn().mockResolvedValue(false), 
    existsByUsername: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockResolvedValue(void 0), 
    findById: jest.fn(), 
  } as unknown as IUserRepository;
};

describe('Create User UseCase', () => {
  
  it('deve conseguir criar um usuário novo com sucesso', async () => {

    const fakeRepo = makeFakeRepo();
    const useCase = new CreateUserUseCase(fakeRepo);

    const request = {
      username: 'testeuser',
      email: 'teste@email.com',
      password: 'Password123'
    };

   
    const result = await useCase.execute(request);

    
    expect(result.isSuccess).toBe(true); 
    expect(result.getValue()).toHaveProperty('id');
    expect(fakeRepo.save).toHaveBeenCalled(); 
  });

  it('não deve deixar criar usuário com e-mail duplicado', async () => {
    
    const fakeRepo = makeFakeRepo();
  
    (fakeRepo.exists as jest.Mock).mockResolvedValue(true); 
    
    const useCase = new CreateUserUseCase(fakeRepo);

    const request = {
      username: 'testeuser2',
      email: 'jaexiste@email.com',
      password: 'Password123'
    };

    
    const result = await useCase.execute(request);

   
    expect(result.isFailure).toBe(true);
    expect(result.error).toEqual('O e-mail já está em uso.');
  });
});