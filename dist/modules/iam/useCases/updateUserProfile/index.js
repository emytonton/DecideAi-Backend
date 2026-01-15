"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfileController = void 0;
const UpdateUserProfileUseCase_1 = require("./UpdateUserProfileUseCase");
const UpdateUserProfileController_1 = require("./UpdateUserProfileController");
const repos_1 = require("../../repos");
const updateUserProfileUseCase = new UpdateUserProfileUseCase_1.UpdateUserProfileUseCase(repos_1.userRepository);
const updateUserProfileController = new UpdateUserProfileController_1.UpdateUserProfileController(updateUserProfileUseCase);
exports.updateUserProfileController = updateUserProfileController;
