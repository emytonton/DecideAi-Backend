import mongoose from 'mongoose';

const UserListSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true, ref: 'User' },
  title: { type: String, required: true },
  options: [{ type: String, required: true }], 
  createdAt: { type: Date, default: Date.now }
}, {
  _id: false,
  timestamps: true
});

export const UserListModel = mongoose.model('UserList', UserListSchema);