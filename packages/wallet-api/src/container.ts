import * as fs from 'fs';

import {
  createContainer,
  asValue,
  asClass,
  asFunction,
  InjectionMode
} from 'awilix';
import statusMonitor from 'express-status-monitor';
import * as httpStatus from 'http-status';
import framework from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import * as ramda from 'ramda';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import { orm } from './infra/serviceLoader';
import * as winston from 'winston';
import bcrypt from 'bcrypt';
import userEntity from './wallet/user';
import verificationEntity from './wallet/verification';
import userCases from './use-cases/User';
import verificationCases from './use-cases/Verification';
import DataSource from './db';
import app from './app';
import router from './interfaces/http/router';
import * as models from './repositories';
import config from './config';
import codeGenerator from './infra/codeGenerator';
import EmailService from './infra/EmailService';
import Blockchain from './infra/BlockchainService';
import Cryptograph from './infra/Cryptograph';
import * as constants from './constants';
import JWTService from './infra/JWTService';
import logger from './infra/logger';
import validation from './infra/validation';
import errorWatch from './infra/errorWatch';
import passwordHash from './infra/hashPassword';
import UserController from './controllers/UserController';
import server from './interfaces/http/server';
import * as types from './types';

const container = createContainer({ injectionMode: InjectionMode.PROXY });

// SYSTEM
container.register({
  app: asFunction(app).singleton(),
  userEntity: asFunction(userEntity).singleton(),
  verificationEntity: asFunction(verificationEntity).singleton(),
  userUseCases: asFunction(userCases).singleton(),
  verificationUseCases: asFunction(verificationCases).singleton(),
  models: asValue(models),
  constants: asValue(constants),
  config: asValue(config),
  server: asFunction(server).singleton(),
  dataSource: asClass(DataSource).singleton(),
  blockchain: asClass(Blockchain).singleton(),
  cryptograph: asClass(Cryptograph).singleton(),
  codeGenerator: asFunction(codeGenerator).singleton(),
  validation: asFunction(validation).singleton(),
  errorWatch: asFunction(errorWatch).singleton(),
  emailService: asClass(EmailService).singleton(),
  userController: asClass(UserController).singleton(),
  jwtService: asClass(JWTService).singleton(),
  passwordHash: asFunction(passwordHash),
  logger: asFunction(logger).singleton(),
  router: asFunction(router).singleton(),
  jwt: asValue(jwt),
  orm: asValue(orm),
  fs: asValue(fs),
  winston: asValue(winston),
  bcrypt: asValue(bcrypt),
  types: asValue(types),
  framework: asValue(framework),
  bodyParser: asValue(bodyParser),
  cors: asValue(cors),
  compression: asValue(compression),
  ramda: asValue(ramda),
  statusMonitor: asValue(statusMonitor),
  httpStatus: asValue(httpStatus),
  morgan: asValue(morgan)
});

export default container;
