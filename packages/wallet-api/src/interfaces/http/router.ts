import { RouterConstructorType } from './types';
import httpLogger from './middlewares/http-logger';
import makeCallback from './utils/makeExpressCallback';
import errorHandler from './middlewares/http-error-handler';

export default ({
  config,
  logger,
  httpStatus,
  statusMonitor,
  framework: { Router: expressRouter },
  bodyParser,
  validation,
  cors,
  compression,
  ramda,
  morgan,
  userController
}: RouterConstructorType) => {
  const router = expressRouter();
  const apiRouter = expressRouter();

  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  if (config.env !== 'test') {
    router.use(httpLogger(logger, morgan));
  }

  apiRouter
    .use(
      cors({
        // origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })
    )
    .use(bodyParser.json())
    .use(compression());

  /**
   * Add routes here
   */
  apiRouter.post(
    '/auth/register',
    validation.validateStartRegistration,
    makeCallback(userController.startRegistration)
  );

  apiRouter.post(
    '/auth/complete-registration',
    validation.validateRegistration,
    makeCallback(userController.completeRegistration)
  );

  apiRouter.post(
    '/auth/login',
    validation.validateLogin,
    makeCallback(userController.login)
  );

  apiRouter.get('/users/:email', makeCallback(userController.getUserData));

  router.use(`/api/${config.version}`, apiRouter);

  router.use(ramda.partialRight(errorHandler, [logger, config, httpStatus]));

  return router;
};
