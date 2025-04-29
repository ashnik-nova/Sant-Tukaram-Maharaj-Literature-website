import axiosInstance from "./axiosInstance";

const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get("admins/all");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response) {
        throw error.response.data;
        }
        throw new Error("Network error occurred");
    }
    }

export { getAllUsers };