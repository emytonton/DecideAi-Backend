"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userListRepo = void 0;
const MongooseUserListRepository_1 = require("./implementations/MongooseUserListRepository");
const userListRepo = new MongooseUserListRepository_1.MongooseUserListRepository();
exports.userListRepo = userListRepo;
