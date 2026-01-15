"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSoloDecisionController = void 0;
const repos_1 = require("../repos");
const MakeSoloDecisionUseCase_1 = require("./makeSoloDecision/MakeSoloDecisionUseCase");
const MakeSoloDecisionController_1 = require("./makeSoloDecision/MakeSoloDecisionController");
const makeSoloDecisionUseCase = new MakeSoloDecisionUseCase_1.MakeSoloDecisionUseCase(repos_1.decisionRepo);
exports.makeSoloDecisionController = new MakeSoloDecisionController_1.MakeSoloDecisionController(makeSoloDecisionUseCase);
