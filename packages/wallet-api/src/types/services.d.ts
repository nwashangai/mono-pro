import * as models from '../repositories';

export type EmailService = {
  sendMail: (email: string, subject: string, body: string) => Promise<void>;
};

export type Models = typeof models;
export type IUser = models.IUser;
export type IVerification = models.IVerification;
