import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: {
      value: true,
      message: "Email is required",
    },
    unique: true,
  },
  username: {
    type: String,
    required: {
      value: true,
      message: "Username is required",
    },
    unique: true,
  },
  password: {
    type: String,
    required: {
      value: true,
      message: "Password is required",
    },
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
