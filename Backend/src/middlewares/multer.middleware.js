import multer from 'multer';
import path from 'path';
import { ApiError } from '../utils/ApiError.js';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Only allow audio files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|mpeg|wav|ogg/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Only audio files are allowed!'), false);
  }
};

// Setup multer upload
const upload = multer({ storage, fileFilter });

// Middleware to handle single file upload - FIXED VERSION
const uploadSingleFile = (fieldName) => {
  return upload.single(fieldName);
};

export { uploadSingleFile };