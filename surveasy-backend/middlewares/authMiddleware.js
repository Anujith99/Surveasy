import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import createError from "../utils/createError.js";
import logger from "../config/logger.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (token) {
      try {
        let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.userID).select("-password");
        logger.info(req.user);

        next();
      } catch (err) {
        logger.error(err);
        const tokenError = createError(400, "Not authenticated-invalid token");
        next(tokenError);
      }
    } else {
      throw createError(401, "Not authenticated-no token");
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
