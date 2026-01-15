"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserList = void 0;
const Entity_1 = require("../../../../shared/core/Entity");
const Result_1 = require("../../../../shared/core/Result");
class UserList extends Entity_1.Entity {
    get userId() { return this.props.userId; }
    get title() { return this.props.title; }
    get options() { return this.props.options; }
    get createdAt() { return this.props.createdAt; }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        if (props.options.length < 2) {
            return Result_1.Result.fail("A lista precisa ter pelo menos 2 opções para sortear.");
        }
        if (!props.title || props.title.trim().length === 0) {
            return Result_1.Result.fail("O título da lista é obrigatório.");
        }
        return Result_1.Result.ok(new UserList({
            ...props,
            createdAt: new Date()
        }, id));
    }
    update(title, options) {
        if (options.length < 2) {
            return Result_1.Result.fail("A lista precisa ter pelo menos 2 opções.");
        }
        if (!title || title.trim().length === 0) {
            return Result_1.Result.fail("O título da lista é obrigatório.");
        }
        this.props.title = title;
        this.props.options = options;
        return Result_1.Result.ok();
    }
}
exports.UserList = UserList;
