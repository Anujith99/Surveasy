import createError from "../utils/createError.js";
import logger from "../config/logger.js";

export const notFoundMiddleware = (req, res, next) => {
  next(createError(404, `Not Found`));
};

export const errorHandlingMiddleware = (err, req, res, next) => {
  let errorMessage = { message: err.message };
  if (process.env.NODE_ENV === "development") {
    errorMessage["stack"] = err.stack;
  }

  res.status(err.status || 500);

  logger.error(`${req.method}: ${req.url} ${res.statusCode} `);
  logger.error(err.stack);

  res.json(errorMessage);

  next();
};
