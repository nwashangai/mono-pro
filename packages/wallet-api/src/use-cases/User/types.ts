import { _UpdateWriteOpResult } from 'mongoose';
import { UserType, CreateUserType } from '../../wallet/user';
import * as Types from '../../types';

export * from '../../types';

export type CreateUser = (input: Types.CreateUserInput) => Promise<Types.IUser>;
export type UpdateUser = (
  _id: string,
  info: Types.IUser
) => Promise<_UpdateWriteOpResult>;
export type GetUsers = (
  filter?: Types.IUser,
  limit?: number,
  start?: number
) => Promise<CreateUserType[]>;
export type GetUser = (_id: string) => Promise<CreateUserType | null>;
export type UpdatePassword = (
  _id: string,
  password: string
) => Promise<_UpdateWriteOpResult>;
export type Login = (
  email: string,
  password: string
) => Promise<{
  id: string | null;
  email: string;
  name: string;
  country: string | undefined;
  phone: string;
  lastLogin: Date;
  role: string;
}>;

export type BuildReturn = {
  createNewUser: CreateUser;
  updateUserInfo: UpdateUser;
  getUsers: GetUsers;
  getUser: GetUser;
  updatePassword: UpdatePassword;
  login: Login;
};

export type Build = () => BuildReturn;

export type ConstructorType = {
  models: Types.Models;
  httpStatus: Types.HttpStatus;
  makeNewUser: UserType;
};

export type BuilType = {
  validation: Types.Validation;
  passwordHash: {
    hash: Types.makeHash;
    isHashMatched: Types.isPasswordMatched;
  };
  models: Types.Models;
  httpStatus: Types.HttpStatus;
};
