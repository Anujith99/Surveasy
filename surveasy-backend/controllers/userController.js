import User from "../models/userModel.js";
import createError from "../utils/createError.js";

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
      res.json(response);
    } else {
      throw createError(400, "Incorrect Password");
    }
  } catch (error) {
    next(error);
  }
};

export default { register, login };
