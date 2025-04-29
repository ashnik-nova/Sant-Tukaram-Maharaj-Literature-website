import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BlacklistEmail } from "../models/blaclklist.model.js"
import { User } from "../models/user.model.js";

const addEmailToBlacklist = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed", errors.array());
  }

  const { email } = req.body;

  const existing = await BlacklistEmail.findOne({ email });
  if (existing) {
    throw new ApiError(400, "Email already blacklisted");
  }

  // Add to blacklist
  const blacklisted = await BlacklistEmail.create({ email });

  // Remove user from User collection (adjust model name if needed)
  const deletedUser = await User.findOneAndDelete({ email });

  return res.status(201).json(
    new ApiResponse(201, {
      blacklisted,
      deletedUser,
    }, "Email blacklisted and user removed successfully")
  );
});

const removeEmailFromBlacklist = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, "Validation failed", errors.array());
  }

  const { email } = req.body;

  const result = await BlacklistEmail.findOneAndDelete({ email });

  if (!result) {
    throw new ApiError(404, "Email not found in blacklist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email removed from blacklist"));
});

const getBlacklistedEmails = asyncHandler(async (req, res) => {
  const blacklisted = await BlacklistEmail.find();

  return res
    .status(200)
    .json(new ApiResponse(200, blacklisted, "Blacklisted emails retrieved"));
});

export {
  addEmailToBlacklist,
  removeEmailFromBlacklist,
  getBlacklistedEmails,
};
