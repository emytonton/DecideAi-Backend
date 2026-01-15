"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileController = void 0;
const GetUserProfileUseCase_1 = require("./GetUserProfileUseCase");
const GetUserProfileController_1 = require("./GetUserProfileController");
const repos_1 = require("../../repos");
const getUserProfileUseCase = new GetUserProfileUseCase_1.GetUserProfileUseCase(repos_1.userRepository);
const getUserProfileController = new GetUserProfileController_1.GetUserProfileController(getUserProfileUseCase);
exports.getUserProfileController = getUserProfileController;
