import * as Types from '../types';

export * from '../types';

export type ConstructorType = {
  config: Types.ConfigType;
  logger: Types.LoggerType;
  orm: Types.MongooseType;
};

export interface IDB {
  connect: () => Promise<void>;
}
