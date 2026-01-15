"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionOption = void 0;
const Entity_1 = require("../../../../shared/core/Entity");
const Result_1 = require("../../../../shared/core/Result");
class DecisionOption extends Entity_1.Entity {
    get title() { return this.props.title; }
    get category() { return this.props.category; }
    get primaryFilter() { return this.props.primaryFilter; }
    get secondaryFilter() { return this.props.secondaryFilter; }
    get imageUrl() { return this.props.imageUrl; }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return Result_1.Result.ok(new DecisionOption(props, id));
    }
}
exports.DecisionOption = DecisionOption;
