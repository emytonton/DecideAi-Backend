"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupDecisionRepo = void 0;
const MongooseGroupDecisionRepository_1 = require("./implementations/MongooseGroupDecisionRepository");
const groupDecisionRepo = new MongooseGroupDecisionRepository_1.MongooseGroupDecisionRepository();
exports.groupDecisionRepo = groupDecisionRepo;
