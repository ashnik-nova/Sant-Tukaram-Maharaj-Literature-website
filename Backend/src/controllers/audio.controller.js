import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';
import Audio from '../models/audio.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const uploadAudio = asyncHandler(async (req, res) => {
  const filePath = req.file.path;
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
      folder: 'literature_website/audios',
    });

    const audio = await Audio.create({
      title: req.body.title,
      audioUrl: result.secure_url,
      createdBy: req.user._id, 
    });

    console.log('Uploaded Audio URL:', result.secure_url);

    fs.unlinkSync(filePath);

    res.status(201).json(
      new ApiResponse(201, audio, 'Audio uploaded successfully')
    );
  } catch (error) {
    console.error(error);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw new ApiError(500, 'Error uploading audio');
  }
});

export const getAllAudios = asyncHandler(async (req, res) => {
  try {
    const audios = await Audio.find();
    res.status(200).json(new ApiResponse(200, audios, 'Fetched all audios'));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, 'Error fetching audios');
  }
});

export const getPendingAudios = asyncHandler(async (req, res) => {
  try {
    const pendingAudios = await Audio.find({ status: 'pending' }).populate('createdBy', 'fullname email'); 
    res.status(200).json(new ApiResponse(200, pendingAudios, 'Fetched pending audios'));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, 'Error fetching pending audios');
  }
});

// Update Audio Status Controller
export const updateAudioStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // expected values: "approved" or "rejected"

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    throw new ApiError(400, 'Invalid status value');
  }

  try {
    const audio = await Audio.findById(id);

    if (!audio) {
      throw new ApiError(404, 'Audio not found');
    }

    audio.status = status;
    await audio.save();

    res.status(200).json(new ApiResponse(200, audio, `Audio ${status} successfully`));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, `Error updating audio status`);
  }
});
