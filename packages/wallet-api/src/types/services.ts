import * as models from '../repositories';
import mongoose from 'mongoose';
import BlockChainService from '../infra/BlockchainService';
import CryptographService from '../infra/Cryptograph';

export { ObjectID } from 'mongodb';

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
export type GenerateWallet = (
  type: string
) => Promise<{
  [key: string]: string | Date | undefined | Buffer;
} | null>;
export type GenerateSpecificWallet = () => Promise<{
  [key: string]: string | Date | undefined | Buffer;
}>;
export interface Blockchain {
  generateWallet: GenerateWallet | GenerateSpecificWallet;
}
export type BlockChainType = BlockChainService;
export interface Cryptograph {
  encrypt: (value: any) => any;
  decrypt: (value: any) => any;
}
export type CryptographType = CryptographService;
