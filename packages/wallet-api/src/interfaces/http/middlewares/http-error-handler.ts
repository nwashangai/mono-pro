import * as Types from '../types';

export default (
  err: {
    message: string;
    stack: any;
  },
  req: Types.RequestObj,
  res: typeof Types.Response,
  next: () => void,
  logger: Types.LoggerType,
  config: Types.ConfigType,
  httpStatus: Types.HttpStatus
) => {
  if (err) {
    logger.error(err);

    const response = Object.assign(
      {
        type: 'InternalServerError',
        requestHeaders: req.headers
      },
      config.env === 'development' && {
        message: err.message,
        stack: err.stack
      }
    );

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
  } else {
    return next();
  }

  return null;
};
