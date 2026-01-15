"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsersController = void 0;
const SearchUsersUseCase_1 = require("./SearchUsersUseCase");
const SearchUsersController_1 = require("./SearchUsersController");
const repos_1 = require("../../repos");
const searchUsersUseCase = new SearchUsersUseCase_1.SearchUsersUseCase(repos_1.userRepository);
const searchUsersController = new SearchUsersController_1.SearchUsersController(searchUsersUseCase);
exports.searchUsersController = searchUsersController;
