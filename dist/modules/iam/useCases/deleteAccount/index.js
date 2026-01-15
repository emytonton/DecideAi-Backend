"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccountController = void 0;
const DeleteAccountUseCase_1 = require("./DeleteAccountUseCase");
const DeleteAccountController_1 = require("./DeleteAccountController");
const repos_1 = require("../../repos");
const deleteAccountUseCase = new DeleteAccountUseCase_1.DeleteAccountUseCase(repos_1.userRepository);
const deleteAccountController = new DeleteAccountController_1.DeleteAccountController(deleteAccountUseCase);
exports.deleteAccountController = deleteAccountController;
