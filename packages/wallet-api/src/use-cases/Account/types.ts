import * as Types from '../../types';
import { AccountReturn } from '../../wallet/account';

export * from '../../types';

export type ConstructorType = {
  models: Types.Models;
  httpStatus: Types.HttpStatus;
  validation: Types.Validation;
  cryptograph: Types.CryptographType;
  blockchain: Types.BlockChainType;
  constants: Types.ConstantsType;
};

export interface AccountInterface {
  getWallet: (userId: string, currency: string) => Promise<AccountReturn>;
  getAllWallets: (
    userId: string
  ) => Promise<{ [key: string]: AccountReturn }[]>;
}

export type BuilType = {
  validation: Types.Validation;
  cryptograph: Types.CryptographType;
  models: Types.Models;
  httpStatus: Types.HttpStatus;
  blockchain: Types.BlockChainType;
  constants: Types.ConstantsType;
};
