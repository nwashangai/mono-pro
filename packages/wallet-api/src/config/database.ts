const path = require('path');

const dotEnvPath = path.resolve('.env');

/**
 * since mocha don't see enviroment variables we have to use dotenv
 */
require('dotenv').config({ path: dotEnvPath });

const databaseConfig = {
  development: {
    url: process.env.DATABASE_URL
  },
  test: {
    url: process.env.DATABASE_URL,
    logging: false // remove logs
  },
  staging: {
    url: process.env.DATABASE_URL,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  }
};

export type ConfigType = typeof databaseConfig;

export default databaseConfig;
