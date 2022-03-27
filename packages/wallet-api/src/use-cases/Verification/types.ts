import * as Types from '../../types';

export * from '../../types';

export type StartRegistration = (input: Types.RegisterInput) => Promise<void>;
export type IsCodeValid = (email: string, code: string) => Promise<boolean>;
export type Verify = (email: string) => Promise<number>;

export type BuildReturn = {
  startRegistration: StartRegistration;
  verify: Verify;
  isCodeValid: IsCodeValid;
};

export type Build = () => BuildReturn;
export interface VerificationType {
  build: Build;
  startRegistration: StartRegistration;
  verify: Verify;
  isCodeValid: IsCodeValid;
}

export type ConstructorType = {
  validation: Types.Validation;
  codeGenerator: Types.GenerateCode;
  emailService: Types.EmailService;
  models: Types.Models;
  httpStatus: Types.HttpStatus;
};
