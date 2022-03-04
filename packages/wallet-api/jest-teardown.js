/* eslint-disable no-underscore-dangle */
module.exports = async function tearDown({ watch, watchAll } = {}) {
  if (!watch && !watchAll) {
    await global.__MONGOD__.stop();
  }
};
