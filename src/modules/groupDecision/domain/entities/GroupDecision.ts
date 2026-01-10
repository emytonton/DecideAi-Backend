import { Entity } from "../../../../shared/core/Entity";
import { Result } from "../../../../shared/core/Result";

export type ParticipantStatus = 'pending' | 'accepted' | 'declined';

interface Participant {
  userId: string;
  status: ParticipantStatus;
  vote?: string;
  hasViewedResult: boolean;
}

interface GroupDecisionProps {
  creatorId: string;
  title: string;
  options: string[];
  participants: Participant[];
  status: 'open' | 'finished';
  winner?: string;
  createdAt: Date;
}

export class GroupDecision extends Entity<GroupDecisionProps> {
  get creatorId(): string { return this.props.creatorId; }
  get title(): string { return this.props.title; }
  get options(): string[] { return this.props.options; }
  get participants(): Participant[] { return this.props.participants; }
  get status(): string { return this.props.status; }
  get winner(): string | undefined { return this.props.winner; }
  get createdAt(): Date { return this.props.createdAt; }

  private constructor(props: GroupDecisionProps, id?: string) {
    super(props, id);
  }

 
  public static create(props: any, id?: string): Result<GroupDecision> {
    
    let participants: Participant[] = [];

    
    if (props.participants && Array.isArray(props.participants)) {
      participants = props.participants;
    } 
    
    else if (props.invitedUserIds && Array.isArray(props.invitedUserIds)) {
      participants = props.invitedUserIds.map((uid: string) => ({
        userId: uid,
        status: 'pending',
        hasViewedResult: false
      }));

     
      participants.push({ 
        userId: props.creatorId, 
        status: 'accepted', 
        hasViewedResult: false 
      });
    } else {
      
      return Result.fail("Dados inválidos: É necessário fornecer 'invitedUserIds' (novo) ou 'participants' (banco).");
    }

    return Result.ok<GroupDecision>(new GroupDecision({
      creatorId: props.creatorId,
      title: props.title,
      options: props.options,
      participants: participants,
      status: props.status || 'open',
      winner: props.winner,
      createdAt: props.createdAt ? new Date(props.createdAt) : new Date()
    }, id));
  }

  public markResultAsViewed(userId: string): Result<void> {
    const participant = this.props.participants.find(p => p.userId === userId);
    if (!participant) return Result.fail("Participante não encontrado.");
    
    participant.hasViewedResult = true;
    return Result.ok();
  }

  public vote(userId: string, option: string): Result<void> {
    const participant = this.props.participants.find(p => p.userId === userId);
    if (!participant) return Result.fail("Usuário não participa desta decisão.");
    if (participant.status === 'declined') return Result.fail("Usuário recusou participar.");

    if (!this.props.options.includes(option)) return Result.fail("Opção inválida.");

    participant.vote = option;
    participant.status = 'accepted';
    
    this.checkCompletion();
    return Result.ok();
  }

  public decline(userId: string): Result<void> {
    const participant = this.props.participants.find(p => p.userId === userId);
    if (!participant) return Result.fail("Usuário não encontrado.");
    
    participant.status = 'declined';
    participant.vote = undefined; 
    this.checkCompletion();
    return Result.ok();
  }

  private checkCompletion() {
    const activeParticipants = this.props.participants.filter(p => p.status !== 'declined');
    const allVoted = activeParticipants.every(p => !!p.vote);

    if (allVoted && activeParticipants.length > 0) {
      this.calculateWinner(activeParticipants);
      this.props.status = 'finished';
    }
  }

  private calculateWinner(activeParticipants: Participant[]) {
    const votes: Record<string, number> = {};
    activeParticipants.forEach(p => {
      if (p.vote) votes[p.vote] = (votes[p.vote] || 0) + 1;
    });

    let maxVotes = 0;
    Object.values(votes).forEach(count => { if (count > maxVotes) maxVotes = count; });

    const candidates = Object.keys(votes).filter(opt => votes[opt] === maxVotes);
    const randomIndex = Math.floor(Math.random() * candidates.length);
    this.props.winner = candidates[randomIndex];
  }
}