import express from 'express'
import { body } from 'express-validator'
import { registerUser, loginUser, logoutUser, refreshAccessToken, ForgetPassword, resetPassword, verify_otp } from '../controllers/user.controller.js'
import { authUser } from '../middlewares/auth.user.middleware.js';



const router = express.Router();

router.route("/register")
    .post(
        body('fullname').notEmpty().withMessage('Full Name is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        registerUser
    );

router.post(
    "/login-user",
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    loginUser
);

router.post("/logout-user", authUser, logoutUser);

router.route("/refresh-accessToken")
    .post(
        body('refreshToken').notEmpty().withMessage('Refresh token is required'),
        refreshAccessToken
    );

router.route("/forget-password").post(
    body('email').isEmail().withMessage('Invalid email format'),
    ForgetPassword
);

router.route("/verify-otp").post(
    body('otp').notEmpty().withMessage("Please Provide the otp."),
    verify_otp
)

router.route("/reset-password")
    .post(
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        resetPassword
    );

export default router;