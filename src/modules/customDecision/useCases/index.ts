import { userListRepo } from "../repos";

import { CreateUserListUseCase } from "./createUserList/CreateUserListUseCase";
import { CreateUserListController } from "./createUserList/CreateUserListController";

import { GetUserListsUseCase } from "./GetUserLists/GetUserListsUseCase";
import { GetUserListsController } from "./GetUserLists/GetUserListsController";

import { DeleteUserListUseCase } from "./deleteUserList/DeleteUserListUseCase";
import { DeleteUserListController } from "./deleteUserList/DeleteUserListController";

import { PickRandomOptionUseCase } from "./pickRandomOption/PickRandomOptionUseCase";
import { PickRandomOptionController } from "./pickRandomOption/PickRandomOptionController";

import { UpdateUserListUseCase } from "./updateUserList/UpdateUserListUseCase";
import { UpdateUserListController } from "./updateUserList/UpdateUserListController";


const createUserListUseCase = new CreateUserListUseCase(userListRepo);
export const createUserListController = new CreateUserListController(createUserListUseCase);


const getUserListsUseCase = new GetUserListsUseCase(userListRepo);
export const getUserListsController = new GetUserListsController(getUserListsUseCase);


const deleteUserListUseCase = new DeleteUserListUseCase(userListRepo);
export const deleteUserListController = new DeleteUserListController(deleteUserListUseCase);


const pickRandomOptionUseCase = new PickRandomOptionUseCase(userListRepo);
export const pickRandomOptionController = new PickRandomOptionController(pickRandomOptionUseCase);

const updateUserListUseCase = new UpdateUserListUseCase(userListRepo);
export const updateUserListController = new UpdateUserListController(updateUserListUseCase);