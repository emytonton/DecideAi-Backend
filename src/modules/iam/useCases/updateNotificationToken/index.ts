import { userRepository } from "../../repos";
import { UpdateNotificationTokenUseCase } from "./UpdateNotificationTokenUseCase";
import { UpdateNotificationTokenController } from "./UpdateNotificationTokenController";

const updateNotificationTokenUseCase = new UpdateNotificationTokenUseCase(userRepository);
const updateNotificationTokenController = new UpdateNotificationTokenController(updateNotificationTokenUseCase);

export { updateNotificationTokenController };