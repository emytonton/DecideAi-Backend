import { decisionRepo } from "../repos";
import { MakeSoloDecisionUseCase } from "./makeSoloDecision/MakeSoloDecisionUseCase";
import { MakeSoloDecisionController } from "./makeSoloDecision/MakeSoloDecisionController";

const makeSoloDecisionUseCase = new MakeSoloDecisionUseCase(decisionRepo);
export const makeSoloDecisionController = new MakeSoloDecisionController(makeSoloDecisionUseCase);