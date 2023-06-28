import { model, Schema } from "mongoose";

import { EUserStatus } from "../enums/user-status.enum";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "Minimum value for age is 1"],
      max: [199, "Maximum value for age is 199"],
    },
    status: {
      type: String,
      default: EUserStatus.Inactive,
      enum: EUserStatus,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("user", userSchema);
