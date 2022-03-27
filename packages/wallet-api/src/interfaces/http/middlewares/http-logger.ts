import * as Types from '../types';

export default (logger: Types.LoggerType, morgan: Types.MorganType) => {
  return morgan('common', {
    stream: {
      write: (message: string) => {
        logger.info(message.slice(0, -1));
      }
    }
  });
};
