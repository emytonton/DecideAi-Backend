
import { groupDecisionRepo } from "../repos";
import { userRepository } from "../../iam/repos"; 


import { CreateGroupDecisionUseCase } from "./createGroupDecision/CreateGroupDecisionUseCase";
import { CreateGroupDecisionController } from "./createGroupDecision/CreateGroupDecisionController";

const createGroupDecisionUseCase = new CreateGroupDecisionUseCase(groupDecisionRepo, userRepository);
export const createGroupDecisionController = new CreateGroupDecisionController(createGroupDecisionUseCase);


import { AnswerGroupDecisionUseCase } from "./answerGroupDecision/AnswerGroupDecisionUseCase";
import { AnswerGroupDecisionController } from "./answerGroupDecision/AnswerGroupDecisionController";

const answerGroupDecisionUseCase = new AnswerGroupDecisionUseCase(groupDecisionRepo, userRepository);
export const answerGroupDecisionController = new AnswerGroupDecisionController(answerGroupDecisionUseCase);

// ... (Create e Answer anteriores)

// List
import { GetMyDecisionsUseCase } from "./getMyDecisions/GetMyDecisionsUseCase";
import { GetMyDecisionsController } from "./getMyDecisions/GetMyDecisionsController";

const getMyDecisionsUseCase = new GetMyDecisionsUseCase(groupDecisionRepo);
export const getMyDecisionsController = new GetMyDecisionsController(getMyDecisionsUseCase);

// Mark Viewed
import { MarkViewedUseCase } from "./markViewed/MarkViewedUseCase";
import { MarkViewedController } from "./markViewed/MarkViewedController";

const markViewedUseCase = new MarkViewedUseCase(groupDecisionRepo);
export const markViewedController = new MarkViewedController(markViewedUseCase);