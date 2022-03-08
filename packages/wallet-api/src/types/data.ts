import * as service from './services';
import { Request } from 'express';

export { Router, Response } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export type RequestObj = Request;

export type RegisterInput =
  | {
      _id?: string;
      email: string;
      code?: string;
      isVerified?: boolean;
      createdAt?: Date;
      updatedAt?: Date;
    }
  | service.IVerification;

export type CreateUserReturn = {
  getId: () => string | null;
  getEmail: () => string;
  getName: () => string;
  getPhone: () => string;
  getRole: () => string;
  getNationality: () => string | null;
  getLastLogin: () => Date;
  hashPassword: () => string;
  isPasswordMatched: (passwordToCompare: string, hash: string) => boolean;
  getPassword: () => string;
  getCreatedAt: () => Date;
  getUpdatedAt: () => Date;
};

export type CreateUserInput =
  | {
      _id?: string;
      email: string;
      name: string;
      phone: string;
      country?: string;
      role?: string;
      lastLogin?: Date;
      password: string;
      createdAt?: Date;
      updatedAt?: Date;
    }
  | service.IUser;

export type AccountType = {
  _id?: string | null;
  owner?: string;
  currency: string;
  type: string;
  address: string;
  isBlocked?: boolean;
  publicKey: string;
  privateKey: string;
  createdAt?: Date;
  updatedAt?: Date;
};
