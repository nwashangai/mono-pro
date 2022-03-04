import mongoose from 'mongoose';
import config from '../config';
import logger from '../infra/logger';

export type Logger = {
  info: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
  debug: (message: string) => void;
};

export interface App {
  start: () => Promise<void>;
  logger: Logger;
}

export type GenerateCode = () => string;

export type HttpStatus = {
  [key: string]: string;
};

export type ConfigType = typeof config;
export type LoggerType = typeof logger;
export type MongooseType = typeof mongoose;
