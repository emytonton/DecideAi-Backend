import { LoginUseCase } from "./LoginUseCase";
import { LoginController } from "./LoginController";
import { userRepository } from "../../repos";
import { AuthService } from "../../services/AuthService";

const authService = new AuthService();
const loginUseCase = new LoginUseCase(userRepository, authService);
const loginController = new LoginController(loginUseCase);

export {
  loginUseCase,
  loginController
};