import express from 'express'
import { body } from 'express-validator'
import { registerAdmin, loginAdmin, logoutAdmin, refreshAccessToken, ForgetPassword, resetPassword, verify_otp } from '../controllers/admin.controller.js'
import { authAdmin } from '../middlewares/auth.admin.middleware.js';



const router = express.Router();

router.route("/register")
    .post(
        body('fullname').notEmpty().withMessage('Fullname is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        registerAdmin
    );

router.post(
    "/login-admin",
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    loginAdmin
);

router.post("/logout", authAdmin, logoutAdmin);

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