import { S3StorageProvider } from "../../../../shared/infra/providers/implementations/S3StorageProvider";
import { userRepository } from "../../repos"; 
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { UpdateUserAvatarController } from "./UpdateUserAvatarController";

const storageProvider = new S3StorageProvider();

const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
  userRepository,
  storageProvider
);

const updateUserAvatarController = new UpdateUserAvatarController(
  updateUserAvatarUseCase
);

export { updateUserAvatarController };