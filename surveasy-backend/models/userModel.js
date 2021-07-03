import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: mongoose.SchemaTypes.String,
      required: [true, "First Name is required"],
      validate: [
        (val) => validator.isAlpha(val),
        "First Name must be only letters",
      ],
    },
    lastName: {
      type: mongoose.SchemaTypes.String,
      validate: [
        (val) => validator.isAlpha(val),
        "Last Name must be only letters",
      ],
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: [true, "Email is required"],
      unique: true,
      index: true,
      validate: [
        (val) => validator.isEmail(val),
        "First Name must be only letters",
      ],
    },
    password: {
      type: mongoose.SchemaTypes.String,
      minLength: [6, "Password must be minimum 6 characters"],
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
