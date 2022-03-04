import mongoose from 'mongoose';
// const ObjectID = require("mongodb").ObjectID;

export interface IWallet extends mongoose.Document {
  _id?: string;
  owner: string;
  currency: string;
  type: string;
  address: string;
  isBlocked: boolean;
  publicKey: string;
  privateKey: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const { Schema } = mongoose;

const walletSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: String,
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
