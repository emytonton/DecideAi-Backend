"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseUserRepository = void 0;
const UserMap_1 = require("../../mappers/UserMap");
const user_model_1 = require("../../infra/database/user.model");
class MongooseUserRepository {
    async findById(id) {
        const rawUser = await user_model_1.UserModel.findOne({ _id: id, deletedAt: null });
        return UserMap_1.UserMap.toDomain(rawUser);
    }
    async exists(email) {
        const user = await user_model_1.UserModel.findOne({
            email: email,
            deletedAt: null
        });
        return !!user;
    }
    async existsByUsername(username) {
        const user = await user_model_1.UserModel.findOne({
            username: username,
            deletedAt: null
        });
        return !!user;
    }
    async findByEmail(email) {
        const rawUser = await user_model_1.UserModel.findOne({ email });
        return UserMap_1.UserMap.toDomain(rawUser);
    }
    async findByUsername(username) {
        const rawUser = await user_model_1.UserModel.findOne({ username });
        return UserMap_1.UserMap.toDomain(rawUser);
    }
    async save(user) {
        const rawUser = await UserMap_1.UserMap.toPersistence(user);
        await user_model_1.UserModel.findOneAndUpdate({ _id: rawUser._id }, rawUser, { upsert: true, new: true });
    }
    async searchByUsername(query) {
        const users = await user_model_1.UserModel.find({
            username: { $regex: query, $options: 'i' },
            deletedAt: null
        }).limit(20);
        return users.map(user => UserMap_1.UserMap.toDomain(user));
    }
    async findAllByIds(ids) {
        const users = await user_model_1.UserModel.find({
            _id: { $in: ids },
            deletedAt: null
        });
        return users.map(u => UserMap_1.UserMap.toDomain(u));
    }
}
exports.MongooseUserRepository = MongooseUserRepository;
