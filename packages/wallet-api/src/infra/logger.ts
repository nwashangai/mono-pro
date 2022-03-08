import fs from 'fs';

import winston from 'winston';
import * as Types from '../types';

type LoggerBuildType = {
  config: Types.ConfigType;
};

const logger = ({ config }: LoggerBuildType) => {
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }

  winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green'
  });

  const writer = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'info.log' }),
      new winston.transports.Console()
    ]
  });

  if (config.env !== 'production') {
    writer.add(
      new winston.transports.Console({
        format: winston.format.simple()
      })
    );
  }

  return writer;
};

export type LoggerType = winston.Logger;
export default logger;
