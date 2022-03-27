import { ConstructorType } from './types';

export default ({ server, dataSource, logger }: ConstructorType) => {
  return {
    start: () => Promise.resolve().then(dataSource.connect).then(server.start),
    logger
  };
};
