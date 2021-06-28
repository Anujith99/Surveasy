import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import {
  notFoundMiddleware,
  errorHandlingMiddleware,
} from "./middlewares/errorMiddlewares.js";

import logger from "./config/logger.js";

dotenv.config();

const app = express();

app.use(
  cors({ origin: process.env.ALLOWED_ORIGIN, optionsSuccessStatus: 200 })
);
app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "This is the base route" });
});

app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

let port = process.env.port || 5000;

app.listen(port, (err) => {
  if (err) {
    logger.error("Error when starting up server");
  } else {
    logger.info(`Server listening on port ${port}`);
  }
});
