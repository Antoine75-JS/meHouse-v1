import mongoose from 'mongoose';
import { UserT } from 'usersT';

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String
  },
  username: {
    type: String,
    required: [true, 'Please enter a username']
  },
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Please enter a username']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  organisations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Organisation'
    }
  ]
});

const User = mongoose.model('User', userSchema);

export default User;