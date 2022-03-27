import * as Types from '../../types';

export * from '../../types';

export type AccountReturn = {
  getId: () => string | null;
  getOwner: () => string;
  getCurrency: () => string;
  getType: () => string;
  getAddress: () => string;
  getPublicKey: () => Buffer;
  isBlocked: () => boolean;
  getPrivateKey: () => string;
  getCreatedAt: () => Date;
  getUpdatedAt: () => Date;
};

export type IAccount = (input: Types.AccountType) => AccountReturn;

export interface WalletType {
  account: IAccount;
}

export type ConstructorType = {
  validation: Types.Validation;
  httpStatus: Types.HttpStatus;
};
