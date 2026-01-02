import mongoose from 'mongoose';

const FriendRequestSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  senderId: { type: String, required: true, ref: 'User' },   
  receiverId: { type: String, required: true, ref: 'User' }, 
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date }
}, {
  _id: false,
  timestamps: true
});


FriendRequestSchema.index({ senderId: 1, receiverId: 1 });

export const FriendRequestModel = mongoose.model('FriendRequest', FriendRequestSchema);