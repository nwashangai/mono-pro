import mongoose from 'mongoose';
// const ObjectID = require("mongodb").ObjectID;

export interface IWallet extends mongoose.Document {
  owner: string;
  currency: string;
  type: string;
  address: string;
  isBlocked: boolean;
  publicKey: Buffer;
  privateKey: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const { Schema } = mongoose;

const walletSchema = new Schema({
  owner: {
    type: String,
    default: 'application'
  },
  currency: {
    type: String,
    required: [true, 'currency is required']
  },
  type: {
    type: String
  },
  address: {
    type: String,
    required: [true, 'address is required']
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  publicKey: {
    type: Buffer,
    required: [true, 'public key is required']
  },
  privateKey: {
    type: String,
    required: [true, 'private key is required']
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

const wallets = mongoose.model<IWallet>('wallets', walletSchema);
export default wallets;
