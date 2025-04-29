import express from 'express';
import { body } from 'express-validator';
import {
  addEmailToBlacklist,
  removeEmailFromBlacklist,
  getBlacklistedEmails,
} from '../controllers/blacklist.controller.js';
import { authAdmin } from '../middlewares/auth.admin.middleware.js';

const router = express.Router();

router.route("/add-email").post(
  authAdmin,
  body('email').isEmail().withMessage('Invalid email format'),
  addEmailToBlacklist
);

router.route("/remove-email").post(
  authAdmin,
  body('email').isEmail().withMessage('Invalid email format'),
  removeEmailFromBlacklist
);

router.route("/all").get(authAdmin, getBlacklistedEmails);

export default router;
