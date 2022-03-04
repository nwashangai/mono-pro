import * as Types from '../../types';

export * from '../../types';

export type RegisterReturn = {
  getId: () => string | null;
  getEmail: () => string;
  isVerified: () => boolean;
  getCode: () => string;
  getCreatedAt: () => Date;
  getUpdatedAt: () => Date;
};

export type Register = (input: Types.RegisterInput) => RegisterReturn;

export interface Verification {
  register: Register;
}

export type ConstructorType = {
  validator: Types.validation;
  generateCode: Types.GenerateCode;
  httpStatus: Types.HttpStatus;
};
