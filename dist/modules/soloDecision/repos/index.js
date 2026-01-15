"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decisionRepo = void 0;
const MongooseDecisionOptionRepository_1 = require("./implementations/MongooseDecisionOptionRepository");
const decisionRepo = new MongooseDecisionOptionRepository_1.MongooseDecisionOptionRepository();
exports.decisionRepo = decisionRepo;
