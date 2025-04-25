import mongoose from 'mongoose';

const abhangaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
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
    category: {
        type: String,
        required: [true, "Category is required"],
        index: true
    }
}, { timestamps: true });

export const Abhanga = mongoose.model("Abhanga", abhangaSchema);
