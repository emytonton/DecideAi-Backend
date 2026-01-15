"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupDecision = void 0;
const Entity_1 = require("../../../../shared/core/Entity");
const Result_1 = require("../../../../shared/core/Result");
class GroupDecision extends Entity_1.Entity {
    get creatorId() { return this.props.creatorId; }
    get title() { return this.props.title; }
    get options() { return this.props.options; }
    get participants() { return this.props.participants; }
    get status() { return this.props.status; }
    get winner() { return this.props.winner; }
    get createdAt() { return this.props.createdAt; }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        let participants = [];
        if (props.participants && Array.isArray(props.participants)) {
            participants = props.participants;
        }
        else if (props.invitedUserIds && Array.isArray(props.invitedUserIds)) {
            participants = props.invitedUserIds.map((uid) => ({
                userId: uid,
                status: 'pending',
                hasViewedResult: false
            }));
            participants.push({
                userId: props.creatorId,
                status: 'accepted',
                hasViewedResult: false
            });
        }
        else {
            return Result_1.Result.fail("Dados inválidos: É necessário fornecer 'invitedUserIds' (novo) ou 'participants' (banco).");
        }
        return Result_1.Result.ok(new GroupDecision({
            creatorId: props.creatorId,
            title: props.title,
            options: props.options,
            participants: participants,
            status: props.status || 'open',
            winner: props.winner,
            createdAt: props.createdAt ? new Date(props.createdAt) : new Date()
        }, id));
    }
    markResultAsViewed(userId) {
        const participant = this.props.participants.find(p => p.userId === userId);
        if (!participant)
            return Result_1.Result.fail("Participante não encontrado.");
        participant.hasViewedResult = true;
        return Result_1.Result.ok();
    }
    vote(userId, option) {
        const participant = this.props.participants.find(p => p.userId === userId);
        if (!participant)
            return Result_1.Result.fail("Usuário não participa desta decisão.");
        if (participant.status === 'declined')
            return Result_1.Result.fail("Usuário recusou participar.");
        if (!this.props.options.includes(option))
            return Result_1.Result.fail("Opção inválida.");
        participant.vote = option;
        participant.status = 'accepted';
        this.checkCompletion();
        return Result_1.Result.ok();
    }
    decline(userId) {
        const participant = this.props.participants.find(p => p.userId === userId);
        if (!participant)
            return Result_1.Result.fail("Usuário não encontrado.");
        participant.status = 'declined';
        participant.vote = undefined;
        this.checkCompletion();
        return Result_1.Result.ok();
    }
    checkCompletion() {
        const activeParticipants = this.props.participants.filter(p => p.status !== 'declined');
        const allVoted = activeParticipants.every(p => !!p.vote);
        if (allVoted && activeParticipants.length > 0) {
            this.calculateWinner(activeParticipants);
            this.props.status = 'finished';
        }
    }
    calculateWinner(activeParticipants) {
        const votes = {};
        activeParticipants.forEach(p => {
            if (p.vote)
                votes[p.vote] = (votes[p.vote] || 0) + 1;
        });
        let maxVotes = 0;
        Object.values(votes).forEach(count => { if (count > maxVotes)
            maxVotes = count; });
        const candidates = Object.keys(votes).filter(opt => votes[opt] === maxVotes);
        const randomIndex = Math.floor(Math.random() * candidates.length);
        this.props.winner = candidates[randomIndex];
    }
}
exports.GroupDecision = GroupDecision;
