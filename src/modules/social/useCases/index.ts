import { friendRequestRepo } from "../repos";
import { userRepository } from "../../iam/repos"; 

import { SendFriendRequestUseCase } from "./sendFriendRequest/SendFriendRequestUseCase";
import { SendFriendRequestController } from "./sendFriendRequest/SendFriendRequestController";

import { AnswerFriendRequestUseCase } from "./answerFriendRequest/AnswerFriendRequestUseCase";
import { AnswerFriendRequestController } from "./answerFriendRequest/AnswerFriendRequestController";

import { GetFriendsUseCase } from "./getFriends/GetFriendsUseCase";
import { GetFriendsController } from "./getFriends/GetFriendsController";

import { RemoveFriendUseCase } from "./removeFriend/RemoveFriendUseCase";
import { RemoveFriendController } from "./removeFriend/RemoveFriendController";

const sendFriendRequestUseCase = new SendFriendRequestUseCase(friendRequestRepo, userRepository);
export const sendFriendRequestController = new SendFriendRequestController(sendFriendRequestUseCase);

const answerFriendRequestUseCase = new AnswerFriendRequestUseCase(friendRequestRepo);
export const answerFriendRequestController = new AnswerFriendRequestController(answerFriendRequestUseCase);

const getFriendsUseCase = new GetFriendsUseCase(friendRequestRepo, userRepository);
export const getFriendsController = new GetFriendsController(getFriendsUseCase);

const removeFriendUseCase = new RemoveFriendUseCase(friendRequestRepo);
export const removeFriendController = new RemoveFriendController(removeFriendUseCase);