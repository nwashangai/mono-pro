export default (err, req, res, next, logger, config, httpStatus) => {
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
