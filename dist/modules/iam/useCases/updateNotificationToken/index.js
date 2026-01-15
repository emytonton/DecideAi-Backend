"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationTokenController = void 0;
const repos_1 = require("../../repos");
const UpdateNotificationTokenUseCase_1 = require("./UpdateNotificationTokenUseCase");
const UpdateNotificationTokenController_1 = require("./UpdateNotificationTokenController");
const updateNotificationTokenUseCase = new UpdateNotificationTokenUseCase_1.UpdateNotificationTokenUseCase(repos_1.userRepository);
const updateNotificationTokenController = new UpdateNotificationTokenController_1.UpdateNotificationTokenController(updateNotificationTokenUseCase);
exports.updateNotificationTokenController = updateNotificationTokenController;
