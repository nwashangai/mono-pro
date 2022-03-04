export type Validation = {
  isValidEmail: (email: string) => boolean;
};

export type makeHash = (value: string) => string;

export type isPasswordMatched = (password: string, hash: string) => boolean;
