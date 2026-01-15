"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const MongooseUserRepository_1 = require("./implementations/MongooseUserRepository");
const userRepository = new MongooseUserRepository_1.MongooseUserRepository();
exports.userRepository = userRepository;
