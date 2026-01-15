"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRequestRepo = void 0;
const MongooseFriendRequestRepository_1 = require("./implementations/MongooseFriendRequestRepository");
const friendRequestRepo = new MongooseFriendRequestRepository_1.MongooseFriendRequestRepository();
exports.friendRequestRepo = friendRequestRepo;
