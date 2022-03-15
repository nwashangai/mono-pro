import * as Types from '../../types';

export * from '../../types';

export type UserControllerConstructorType = {
  codeGenerator: Types.GenerateCode;
  httpStatus: Types.HttpStatus;
  jwtService: any;
  validation: Types.Validation;
  passwordHash: {
    hash: Types.makeHash;
    isHashMatched: Types.isPasswordMatched;
  };
  models: Types.Models;
  emailService: any;
  constants: Types.ConstantsType;
  blockchain: Types.BlockChainType;
  cryptograph: Types.CryptographType;
};
