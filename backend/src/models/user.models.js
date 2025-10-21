import mongoose, { Schema, trusted } from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    tripPlan: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique:true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:""
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationOtp: {
      type: String,
    },
    emailVerificationOtpExpires: {
      type: Date,
    },
    passwordResetOtp: {
      type: String,
    },
    passwordResetOtpExprires: {
      type: Date,
    },
    trips: [tripSchema],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
