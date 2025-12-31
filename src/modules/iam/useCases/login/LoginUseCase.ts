import { LoginDTO } from "./LoginDTO";
import { UseCase } from "../../../../shared/core/UseCase";
import { Result } from "../../../../shared/core/Result";
import { IUserRepository } from "../../repos/IUserRepository";
import { AuthService } from "../../services/AuthService";
import { User } from "../../domain/entities/User";

interface LoginResponse {
  accessToken: string;
  user: {
    username: string;
    email: string;
  }
}

export class LoginUseCase implements UseCase<LoginDTO, Promise<Result<LoginResponse>>> {
  private userRepo: IUserRepository;
  private authService: AuthService;

  constructor(userRepo: IUserRepository, authService: AuthService) {
    this.userRepo = userRepo;
    this.authService = authService;
  }

  async execute(request: LoginDTO): Promise<Result<LoginResponse>> {
    const { email, password } = request;

    try {
      
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        return Result.fail("Credenciais inválidas."); 
      }

     
      const passwordValid = await user.password.comparePassword(password);
      if (!passwordValid) {
        return Result.fail("Credenciais inválidas.");
      }

      
      const accessToken = this.authService.signJWT(user);

      
      return Result.ok<LoginResponse>({
        accessToken,
        user: {
          username: user.username,
          email: user.email.value
        }
      });

    } catch (err) {
      return Result.fail(err as any);
    }
  }
}