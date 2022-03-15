import * as Types from '../../types';

export * from '../../types';

export type CreateUserReturn = {
  getId: () => string | null | Types.ObjectID;
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

export type CreateUser = (
  input: Types.CreateUserInput | Types.IUser
) => CreateUserReturn;

export interface UserType {
  createUser: CreateUser;
}

export type ConstructorType = {
  validator: Types.Validation;
  makeHash: Types.makeHash;
  isPasswordMatched: Types.isPasswordMatched;
  httpStatus: Types.HttpStatus;
  constants: Types.ConstantsType;
};
