import { Type } from 'typescript';
import * as Types from '../types';

export * from '../types';

export type ConstructorType = {
  config: Types.ConfigType;
  logger: Type.LoggerType;
  mongoose: Types.MongooseType;
};

export interface IDB {
  connect: () => Promise<void>;
}
