import { GetUserProfileUseCase } from "./GetUserProfileUseCase";
import { GetUserProfileController } from "./GetUserProfileController";
import { userRepository } from "../../repos";

const getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
const getUserProfileController = new GetUserProfileController(getUserProfileUseCase);

export { getUserProfileController };