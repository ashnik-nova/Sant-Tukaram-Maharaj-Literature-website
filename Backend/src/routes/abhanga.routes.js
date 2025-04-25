import express from 'express';
import { body } from 'express-validator';
import {
  submitAbhanga,
  getPendingAbhangas,
  updateAbhangaStatus,
  getApprovedAbhangas
} from '../controllers/abhanga.controller.js';
import { authUser } from '../middlewares/auth.user.middleware.js';
import { authAdmin } from '../middlewares/auth.admin.middleware.js';

const router = express.Router();

// ✏️ Customer submits a new Abhanga
router.post(
  '/submit',
  authUser,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  submitAbhanga
);

// 🔍 Admin fetches all pending Abhangas
router.get('/pending', authAdmin, getPendingAbhangas);

// ✅ Admin reviews Abhanga (approve or reject)
router.put(
  '/review/:id',
  authAdmin,
  [
    body('status')
      .isIn(['approved', 'rejected'])
      .withMessage('Status must be either approved or rejected'),
  ],
  updateAbhangaStatus
);

// 🌍 Public route: Get all approved Abhangas
router.get('/all-approved', getApprovedAbhangas);

export default router;
