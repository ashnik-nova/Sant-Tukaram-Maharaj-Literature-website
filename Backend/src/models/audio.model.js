import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
      },
      status: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending'
      },
}, {timestamps: true});

const Audio = mongoose.model('Audio', audioSchema);

export default Audio;
