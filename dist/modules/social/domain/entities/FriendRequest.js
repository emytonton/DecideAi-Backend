"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequest = void 0;
const Entity_1 = require("../../../../shared/core/Entity");
const Result_1 = require("../../../../shared/core/Result");
class FriendRequest extends Entity_1.Entity {
    get senderId() { return this.props.senderId; }
    get receiverId() { return this.props.receiverId; }
    get status() { return this.props.status; }
    get createdAt() { return this.props.createdAt; }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        if (props.senderId === props.receiverId) {
            return Result_1.Result.fail("Você não pode enviar um convite para si mesmo.");
        }
        const request = new FriendRequest({
            ...props,
            status: 'pending',
            createdAt: new Date()
        }, id);
        return Result_1.Result.ok(request);
    }
    accept() {
        this.props.status = 'accepted';
        this.props.updatedAt = new Date();
    }
    decline() {
        this.props.status = 'declined';
        this.props.updatedAt = new Date();
    }
}
exports.FriendRequest = FriendRequest;
