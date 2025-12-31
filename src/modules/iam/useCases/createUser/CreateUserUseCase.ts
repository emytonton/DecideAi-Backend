import { CreateUserDTO } from "./CreateUserDTO";
import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserRepository } from "../../repos/IUserRepository";
import { UserEmail } from "../../domain/valueObjects/UserEmail";
import { UserPassword } from "../../domain/valueObjects/UserPassword";
import { User } from "../../domain/entities/User";

type Response = Result<any>;

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>> {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

 async execute(request: CreateUserDTO): Promise<Response> {
    const { username, email, password } = request;

    try {
     
      const userAlreadyExists = await this.userRepo.exists(email);
      if (userAlreadyExists) {
        return Result.fail("O e-mail já está em uso.");
      }

     
      const usernameTaken = await this.userRepo.existsByUsername(username);
      if (usernameTaken) {
        return Result.fail("Este nome de usuário já está em uso.");
      }

     
      const emailOrError = UserEmail.create(email);
      const passwordOrError = UserPassword.create(password);

      const combinedPropsResult = Result.combine([emailOrError, passwordOrError]);
      
      if (combinedPropsResult.isFailure) {
        return Result.fail(combinedPropsResult.error as string);
      }

   
      const userOrError = User.create({
        username,
        email: emailOrError.getValue(),
        password: passwordOrError.getValue(),
      });

      if (userOrError.isFailure) {
        return Result.fail(userOrError.error as string);
      }

      const user = userOrError.getValue();

  
      await this.userRepo.save(user);

     
      return Result.ok({
        id: user.id.toString(),
        username: user.username,
        email: user.email.value
      });

    } catch (err) {
      return Result.fail(err as any);
    }
  }
}