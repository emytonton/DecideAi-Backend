import mongoose from 'mongoose';

const GroupDecisionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  creatorId: { type: String, required: true, ref: 'User' },
  title: { type: String, required: true },
  options: [{ type: String, required: true }],
  status: { type: String, enum: ['open', 'finished'], default: 'open' },
  winner: { type: String }, 
  
  participants: [{
    _id: false,
    userId: { type: String, required: true, ref: 'User' },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    vote: { type: String } 
  }],
  
  createdAt: { type: Date, default: Date.now }
}, {
  _id: false,
  timestamps: true
});

export const GroupDecisionModel = mongoose.model('GroupDecision', GroupDecisionSchema);