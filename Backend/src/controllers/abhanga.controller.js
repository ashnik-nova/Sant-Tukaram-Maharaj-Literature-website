import { Abhanga } from "../models/abhanga.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const submitAbhanga = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const userId = req.user._id;

    if (!title || !content || !category) {
        throw new ApiError(400, "Title, content, and category are required");
    }

    const abhanga = await Abhanga.create({
        title,
        content,
        category,
        createdBy: userId,
        status: "pending"
    });

    return res.status(201).json(
        new ApiResponse(201, abhanga, "Abhanga submitted for review")
    );
});


// Admin views all pending Abhangas
const getPendingAbhangas = asyncHandler(async (req, res) => {
    const pendingAbhangas = await Abhanga.find({ status: "pending" }).populate("createdBy", "fullname email");

    return res.status(200).json(
        new ApiResponse(200, pendingAbhangas, "Pending Abhangas fetched")
    );
});

const getApprovedAbhangas = asyncHandler(async (req, res) => {
    
   const approvedAbhangas = await Abhanga.find({ status: "approved" });

    return res.status(200).json(
        new ApiResponse(200, approvedAbhangas, `Approved Abhangas `)
    );
});


// Admin accepts/rejects an Abhanga
const updateAbhangaStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
        throw new ApiError(400, "Invalid status");
    }

    const abhanga = await Abhanga.findById(id);
    if (!abhanga) {
        throw new ApiError(404, "Abhanga not found");
    }

    abhanga.status = status;
    await abhanga.save();

    return res.status(200).json(
        new ApiResponse(200, abhanga, `Abhanga ${status}`)
    );
});

const getAllAbhangas = asyncHandler(async (req, res) => {
    const abhangas = await Abhanga.find(); // No filter at all

    return res.status(200).json(
        new ApiResponse(200, abhangas, "Fetched all Abhangas successfully")
    );
});

const getuserAbhangas = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const abhangas = await Abhanga.find({ createdBy: userId });

    return res.status(200).json(
        new ApiResponse(200, abhangas, "Fetched user's Abhangas successfully")
    );
});

export {
    submitAbhanga,
    getPendingAbhangas,
    updateAbhangaStatus,
    getApprovedAbhangas,
    getuserAbhangas
};
