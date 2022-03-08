import * as models from '../repositories';
import mongoose from 'mongoose';

export type EmailService = {
  sendMail: (email: string, subject: string, body: string) => Promise<void>;
};

export type Models = {
  users: mongoose.Model<models.IUser>;
  verifications: mongoose.Model<models.IVerification>;
  wallets: mongoose.Model<models.IWallet>;
};
export type IUser = models.IUser;
export type IVerification = models.IVerification;
export type IWallet = models.IWallet;
