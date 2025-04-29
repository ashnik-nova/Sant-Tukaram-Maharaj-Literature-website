// models/BlacklistEmail.js
import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    blacklistedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const BlacklistEmail = mongoose.model("BlacklistEmail", blacklistSchema);

