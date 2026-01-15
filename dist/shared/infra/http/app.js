"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = require("../../../modules/iam/infra/http/routes/user.routes");
const social_routes_1 = require("../../../modules/social/infra/http/routes/social.routes");
const decision_routes_1 = require("../../../modules/soloDecision/infra/http/routes/decision.routes");
const custom_routes_1 = require("../../../modules/customDecision/infra/http/routes/custom.routes");
const group_routes_1 = require("../../../modules/groupDecision/infra/http/routes/group.routes");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const databaseUrl = process.env.DATABASE_URL || process.env.MONGO_URL || 'mongodb://localhost:27017/decideai';
const connectDB = async () => {
    if (mongoose_1.default.connection.readyState === 0) {
        try {
            await mongoose_1.default.connect(databaseUrl);
            console.log('📦 Database connected successfully (Vercel/Local)!');
        }
        catch (err) {
            console.error('❌ Error connecting to database:', err);
        }
    }
};
connectDB();
app.use('/api/v1/users', user_routes_1.userRouter);
app.use('/api/v1/social', social_routes_1.socialRouter);
app.use('/api/v1/decision', decision_routes_1.decisionRouter);
app.use('/api/v1/custom', custom_routes_1.customDecisionRouter);
app.use('/api/v1/group', group_routes_1.groupDecisionRouter);
app.get('/', (req, res) => {
    res.json({ message: 'Decide Aí API is running 🚀' });
});
exports.default = app;
