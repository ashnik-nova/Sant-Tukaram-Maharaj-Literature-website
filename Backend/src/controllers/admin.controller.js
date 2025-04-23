import { Admin } from "../models/admin.model.js";
import createAdmin from '../services/admin.service.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import fs from 'fs'
import path from "path";
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const generateRefreshTokenAccessToken = async (adminid) => {
    try {
        const admin = await Admin.findById(adminid);
        const refreshToken = admin.generateRefreshToken();
        const accessToken = admin.generateAccessToken();
        admin.refreshToken = refreshToken;

        await admin.save({ validateBeforeSave: false })

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerAdmin = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        throw new ApiError(400, "Validation failed", errors.array());
    }

    const { fullname, email, password, adminCode } = req.body;

    const isadminAlready = await Admin.findOne({ email });

    if (isadminAlready) {
        throw new ApiError(400, "Admin already exists");
    }

    const admin = await createAdmin({
        fullname,
        email,
        password,
        adminCode
    });

    if (!admin || !admin._id) {
        throw new ApiError(500, "Failed to create Admin");
    }

    const createdAdmin = await Admin.findById(admin?._id).select(
        "-password -refreshToken"
    )

    if (!createdAdmin) {
        throw new ApiError(500, "Something went wrong while registering the admin")
    }

    return res.status(201).json(
        new ApiResponse(200, createdAdmin, "Admin registered Successfully")
    )
})

const loginAdmin = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        throw new ApiError(400, "Validation failed", errors.array());
    }

    const { email, password, adminCode, role } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email or Password not provided.", errors.array());
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new ApiError(400, "Admin does not exist");
    }

    const isPasswordValid = await admin.comparePassword(password);

    const isAdminCodeValid = await admin.compareAdminCode(adminCode);
    console.log(isAdminCodeValid, adminCode, admin.adminCode);
    console.log(isPasswordValid, password, admin.password);

    if (!isPasswordValid || !isAdminCodeValid) {
        throw new ApiError(401, "Invalid Admin Credentials.");
    }

    const { accessToken, refreshToken } = await generateRefreshTokenAccessToken(admin._id);

    const LoggedinAdmin = await Admin.findById(admin._id).select("-password -refreshToken")


    const refreshTokenExpiry = 7 * 24 * 60 * 60;
    const accessTokenExpiry = 15 * 60;

    const options = {
        httpOnly: true,
        secure: false
    };

    res.cookie("accessToken", accessToken, {
        ...options,
        expires: new Date(Date.now() + accessTokenExpiry * 1000)
    });

    res.cookie("refreshToken", refreshToken, {
        ...options,
        expires: new Date(Date.now() + refreshTokenExpiry * 1000)
    });

    res.cookie("role", role, {
        ...options,
        httpOnly: false,
        expires: new Date(Date.now() + refreshTokenExpiry * 1000)
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                admin: LoggedinAdmin,
                accessToken,
                refreshToken
            },
            "Admin logged in successfully"
        )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
    await Admin.findByIdAndUpdate(
        req.admin._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Admin logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const IncomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!IncomingRefreshToken) {
        throw new ApiError(401, "Refresh token not provided");
    }

    try {

        const decoded = jwt.verify(IncomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const admin = await Admin.findById(decoded?._id);

        if (!admin || IncomingRefreshToken !== admin.refreshToken) {
            throw new ApiError(401, "Invalid Refresh Token");
        }

        const currentTime = Math.floor(Date.now() / 1000);
        const TimeLeft = decoded.exp - currentTime;

        const newRefreshToken = IncomingRefreshToken;

        const now = Date.now();
        const lastActivity = decoded.lastActivity || now;

        if (now - lastActivity > 86400) {
            throw new ApiError(401, "Refresh token expired");
        }

        if (TimeLeft < 86400) {
            newRefreshToken = admin.generateRefreshToken();
            admin.refreshToken = newRefreshToken;
            admin.save({ validateBeforeSave: false });
        }

        const accessToken = admin.generateAccessToken();

        const options = {
            httpOnly: true,
            secure: false
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            )


    } catch (error) {
        throw new ApiError(401, "Invalid Refresh Token");
    }

})


const ForgetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }

        const otp = crypto.randomInt(100000, 999999);

        const otpToken = admin.generateOTPToken(otp);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);


        const templatepath = path.join(__dirname, '../emailTemplates/resetPassword.html');
        let emailTemplate = fs.readFileSync(templatepath, 'utf8');

        emailTemplate = emailTemplate.replace('{{OTP}}', otp);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Reset Password OTP',
            html: emailTemplate
        };

        await transporter.sendMail(mailOptions);

        const otpTokenExpiry = 5 * 60;
        const options = {
            httpOnly: true,
            secure: false,
            expires: new Date(Date.now() + otpTokenExpiry * 1000)
        }
        return res
            .cookie('OTP_Token', otpToken, options)
            .status(200).json(
                new ApiResponse(200, { otpToken }, "OTP sent successfully")
            )

    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while sending OTP")
    }
})

const verify_otp = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const otpToken = req.cookies.OTP_Token;
    console.log(otpToken);

    try {
        if (!otpToken) {
            throw new ApiError(400, "OTP token missing");
        }

        const decoded = jwt.verify(otpToken, process.env.OTP_TOKEN_SECRET);

        if (decoded.otp.toString() !== otp.toString()) {
            throw new ApiError(400, "Invalid OTP");
        }

        return res.status(200).json(
            new ApiResponse(200, {}, "OTP verified successfully.")
        );
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(400, "OTP expired");
        } else if (error.name === 'JsonWebTokenError') {
            throw new ApiError(401, "Invalid token format");
        } else {
            throw error;
        }
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    const otpToken = req.cookies.OTP_Token;
    try {

        const decoded = jwt.verify(otpToken, process.env.OTP_TOKEN_SECRET);
        const email = decoded?.email;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }

        admin.password = newPassword;
        admin.refreshToken = null;
        await admin.save({ validateBeforeSave: false });

        return res.status(200).json(
            new ApiResponse(200, {}, "Password reset successfully")
        )

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(400, "OTP expired");
        }
        throw new ApiError(501, "Server Error");
    }
})



export { registerAdmin, loginAdmin, logoutAdmin, refreshAccessToken, ForgetPassword, verify_otp, resetPassword }