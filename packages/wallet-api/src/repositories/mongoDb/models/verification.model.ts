import mongoose from 'mongoose';
// const ObjectID = require("mongodb").ObjectID;

export interface IVerification extends mongoose.Document {
  _id?: string;
  email: string;
  code: string;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const { Schema } = mongoose;

const verificationsSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  code: {
    type: String,
    required: [true, 'code is required']
  },
  isVerified: {
    type: Boolean,
    default: false
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

const verifications = mongoose.model<IVerification>(
  'verifications',
  verificationsSchema
);
export default verifications;
