import { DeleteAccountUseCase } from "./DeleteAccountUseCase";
import { DeleteAccountController } from "./DeleteAccountController";
import { userRepository } from "../../repos";

const deleteAccountUseCase = new DeleteAccountUseCase(userRepository);
const deleteAccountController = new DeleteAccountController(deleteAccountUseCase);
export { deleteAccountController };