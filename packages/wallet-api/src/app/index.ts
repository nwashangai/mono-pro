export default ({ server, dataSource, logger }) => {
  return {
    start: () =>
      Promise.resolve().then(dataSource.connect()).then(server.start),
      logger
  };
};
