import * as Types from '../../types';

export * from '../../types';

export type CreateUserReturn = {
  getId: () => string | null;
  getEmail: () => string;
  getName: () => string;
  getPhone: () => string;
  getRole: () => string;
  getNationality: () => string | undefined;
  getLastLogin: () => Date;
  hashPassword: () => string;
  isPasswordMatched: (passwordToCompare: string, hash: string) => boolean;
  getPassword: () => string;
  getCreatedAt: () => Date;
  getUpdatedAt: () => Date;
};

export type CreateUser = (input: Types.CreateUserInput) => CreateUserReturn;

export interface UserType {
  createUser: CreateUser;
}

export type ConstructorType = {
  validator: Types.validation;
  makeHash: Types.makeHash;
  isPasswordMatched: Types.isPasswordMatched;
  httpStatus: Types.HttpStatus;
};
