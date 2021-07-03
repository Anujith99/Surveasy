import logger from "../config/logger.js";

const loggerMiddleware = (req, res, next) => {
  const start = process.hrtime();
  const duration = getRequestDuration(start);

  const logMessage = `${req.method}: ${req.url} ${
    res.statusCode
  } ${duration.toLocaleString()} ms`;

  logger.info(logMessage);
  next();
};

const getRequestDuration = (start) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export default loggerMiddleware;
