import mongoose from 'mongoose';
// const ObjectID = require("mongodb").ObjectID;

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  country?: string;
  password: string;
  role: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  country: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: 'REGULAR'
  },
  lastLogin: {
    type: Date,
    default: Date.now()
  },
  createdAt: {
    type: Date,
    required: [true, 'createdAt is required'],
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    required: [true, 'udpatedAt is required'],
    default: Date.now()
  }
});

const users = mongoose.model<IUser>('users', usersSchema);
export default users;
