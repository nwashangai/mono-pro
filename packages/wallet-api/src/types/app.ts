import * as mongoose from 'mongoose';
import morgan from 'morgan';
import config from '../config';
import * as constants from '../constants';
import { Logger } from 'winston';

export type { IDB } from '../app/types';

export type LoggerType = Logger;

export interface App {
  start: () => Promise<void>;
  logger: Logger;
}

export type GenerateCode = () => string;

export type HttpStatus = {
  [key: string]: string;
};

export type ConfigType = typeof config;
export type MongooseType = typeof mongoose;
export type MorganType = typeof morgan;
export type ConstantsType = typeof constants;
