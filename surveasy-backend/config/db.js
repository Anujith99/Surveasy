import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });

    logger.info(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
