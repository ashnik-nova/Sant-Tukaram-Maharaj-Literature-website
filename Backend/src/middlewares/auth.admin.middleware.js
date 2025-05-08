import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authAdmin = asyncHandler( async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log(token, "token in authAdmin middleware");
    if (!token) {
        throw new ApiError(401, "Access token is required");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const admin = await Admin.findById(decodedToken._id).select("-password -refreshToken");
        if (!admin) {
            throw new ApiError(401, "Invalid Access Token");
        }

        if (decodedToken.role !== "admin") {
            throw new ApiError(403, "Unauthorized Access");
        }

        req.admin = admin;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})