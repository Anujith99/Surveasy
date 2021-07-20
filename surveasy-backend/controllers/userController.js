import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import createError from "../utils/createError.js";
import logger from "../config/logger.js";

const generateJWT = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

let cookieOptions = {
  httpOnly: true,
  path: "/dashboard",
};

if (process.env.NODE_ENV !== "development") {
  cookieOptions = { ...cookieOptions, sameSite: "none", secure: true };
}

const register = async (req, res, next) => {
  try {
    const user = req.body;
    const userExists = await User.findOne({ email: user.email });

    if (userExists) {
      throw createError(400, "Account with this email already exists.");
    }

    const newUser = await User.create(user);

    if (newUser) {
      let response = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };

      logger.info(response);

      res.cookie("authToken", generateJWT(newUser._id), {
        ...cookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(201).json({ user: response });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(400, "Incorrect Email Address");
    }

    const isMatched = await user.matchPassword(password);

    if (isMatched) {
      let response = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      logger.info(response);
      res.cookie("authToken", generateJWT(user._id), {
        ...cookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.json({ user: response });
    } else {
      throw createError(400, "Incorrect Password");
    }
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  try {
    res
      .clearCookie("authToken", cookieOptions)
      .json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

const getUser = (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      throw createError(401, "Not authenticated");
    }

    logger.info(user);

    let userResponse = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.json({ user: userResponse });
  } catch (error) {
    next(error);
  }
};

export default { register, login, logout, getUser };
