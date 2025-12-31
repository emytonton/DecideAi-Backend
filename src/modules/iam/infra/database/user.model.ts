import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true }, 
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  avatar: { type: String },
  createdAt: { type: Date, required: true }
}, {
  _id: false, 
  timestamps: true
});

export const UserModel = mongoose.model('User', UserSchema);