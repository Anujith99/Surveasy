import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import createError from "../utils/createError.js";

const generateJWT = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

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
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };

      res.cookie("authToken", generateJWT(newUser._id), {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/dashboard",
      });
      res.status(201).json(response);
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
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      res.cookie("authToken", generateJWT(user._id), {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/dashboard",
      });
      res.json(response);
    } else {
      throw createError(400, "Incorrect Password");
    }
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res
    .clearCookie("authToken", { path: "/dashboard" })
    .json({ message: "Logout successful" });
};

export default { register, login, logout };
