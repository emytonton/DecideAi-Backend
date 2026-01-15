"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseUserListRepository = void 0;
const UserList_1 = require("../../domain/entities/UserList");
const userList_model_1 = require("../../infra/database/userList.model");
class MongooseUserListRepository {
    async save(userList) {
        const raw = {
            _id: userList.id.toString(),
            userId: userList.userId,
            title: userList.title,
            options: userList.options,
            createdAt: userList.createdAt
        };
        await userList_model_1.UserListModel.findOneAndUpdate({ _id: raw._id }, raw, { upsert: true, new: true });
    }
    async findByUserId(userId) {
        const docs = await userList_model_1.UserListModel.find({ userId }).sort({ createdAt: -1 });
        return docs.map(d => {
            const data = d.toObject();
            return UserList_1.UserList.create({
                userId: data.userId,
                title: data.title,
                options: data.options,
            }, d._id.toString()).getValue();
        });
    }
    async findById(listId) {
        const doc = await userList_model_1.UserListModel.findById(listId);
        if (!doc)
            return null;
        const data = doc.toObject();
        return UserList_1.UserList.create({
            userId: data.userId,
            title: data.title,
            options: data.options,
        }, doc._id.toString()).getValue();
    }
    async delete(listId) {
        await userList_model_1.UserListModel.deleteOne({ _id: listId });
    }
}
exports.MongooseUserListRepository = MongooseUserListRepository;
