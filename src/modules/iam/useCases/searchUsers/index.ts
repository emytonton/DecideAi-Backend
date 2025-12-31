import { SearchUsersUseCase } from "./SearchUsersUseCase";
import { SearchUsersController } from "./SearchUsersController";
import { userRepository } from "../../repos";

const searchUsersUseCase = new SearchUsersUseCase(userRepository);
const searchUsersController = new SearchUsersController(searchUsersUseCase);
export { searchUsersController };