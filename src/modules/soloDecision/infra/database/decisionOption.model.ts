import mongoose from 'mongoose';

const DecisionOptionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['movie', 'food', 'drink', 'exercise', 'book'] 
  },
  primaryFilter: { type: String, required: true }, // Ex: 'terror', 'japonesa'
  secondaryFilter: { type: String, required: true }, // Ex: 'netflix', 'jantar'
  imageUrl: { type: String }
}, {
  _id: false,
  timestamps: true
});

export const DecisionOptionModel = mongoose.model('DecisionOption', DecisionOptionSchema);