type ValidateType = (value: string) => boolean;

export type Validation = {
  isValidEmail: ValidateType;
  isValidPhone: ValidateType;
  isValidName: ValidateType;
  isValidCountry: ValidateType;
  isValidPassword: ValidateType;
  validateRegistration: (input: any) => any;
  validateStartRegistration: (input: any) => any;
  validateAddress: (address: string, type: string) => boolean;
  validateLogin: (input: any) => any;
};

export type makeHash = (value: string) => string;

export type isPasswordMatched = (password: string, hash: string) => boolean;

export type GenerateWalletReturn = {
  privateKey: string;
  address: string;
  publicKey: Buffer;
  type: string;
  timestamp: Date;
};
