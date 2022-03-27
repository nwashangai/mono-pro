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

export type RouterConstructorType = {
  config: Types.ConfigType;
  logger: Types.LoggerType;
  httpStatus: Types.HttpStatus;
  validation: Types.Validation;
  statusMonitor: any;
  framework: any;
  bodyParser: any;
  cors: any;
  compression: any;
  ramda: any;
  morgan: any;
  userController: any;
};

export type ServerConstructorType = {
  config: Types.ConfigType;
  router: any;
  logger: Types.LoggerType;
  framework: any;
  bodyParser: any;
  compression: any;
};
