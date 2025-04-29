import express from 'express';
import { uploadSingleFile } from '../middlewares/multer.middleware.js';
import { uploadAudio, getAllAudios, getPendingAudios, updateAudioStatus } from '../controllers/audio.controller.js';
import { authUser } from '../middlewares/auth.user.middleware.js';
import { authAdmin } from '../middlewares/auth.admin.middleware.js';

const router = express.Router();

router.post('/upload-audio', authUser, uploadSingleFile('audio'), uploadAudio);
router.get('/all',  getAllAudios);
router.get('/pending', authAdmin, getPendingAudios);
router.put('/update-status/:id', authAdmin,  updateAudioStatus);

export default router;
