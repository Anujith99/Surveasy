import express from "express";
import cors from "cors";

import loggerMiddleware from "./middlewares/loggerMiddleware.js";

import logger from "./config/logger.js";

const app = express();

app.use(
  cors({ origin: process.env.ALLOWED_ORIGIN, optionsSuccessStatus: 200 })
);
app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "This is the base route" });
});

let port = process.env.port || 5000;

app.listen(port, (err) => {
  if (err) {
    logger.error("Error when starting up server");
  } else {
    logger.info(`Server listening on port ${port}`);
  }
});
