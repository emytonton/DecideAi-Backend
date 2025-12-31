import { UpdateUserProfileUseCase } from "./UpdateUserProfileUseCase";
import { UpdateUserProfileController } from "./UpdateUserProfileController";
import { userRepository } from "../../repos";

const updateUserProfileUseCase = new UpdateUserProfileUseCase(userRepository);
const updateUserProfileController = new UpdateUserProfileController(updateUserProfileUseCase);
export { updateUserProfileController };