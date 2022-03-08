import * as Types from '../types';

export * from '../types';

export type ConstructorType = {
  server: any;
  logger: Types.LoggerType;
  dataSource: Types.IDB;
};

export interface IDB {
  connect: () => Promise<void>;
}
