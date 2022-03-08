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
};

export type makeHash = (value: string) => string;

export type isPasswordMatched = (password: string, hash: string) => boolean;
