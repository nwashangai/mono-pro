import fs from 'fs';
import path from 'path';

import databaseConfig from './database';
import EnvConfigType from './environments/types';

require('dotenv').load();

const loadDbConfig = (env: string) => {
  if (fs.existsSync(path.join(__dirname, './database.ts'))) {
    return databaseConfig[env as keyof typeof databaseConfig];
  }

  throw new Error('Database configuration is required');
};

const ENV = process.env.NODE_ENV || 'development';

const envConfig: { default: EnvConfigType } = require(path.join(
  __dirname,
  'environments',
  ENV
));
const dbConfig = loadDbConfig(ENV);
const config = {
  env: ENV,
  db: dbConfig,
  ...envConfig.default
};

export default config;
