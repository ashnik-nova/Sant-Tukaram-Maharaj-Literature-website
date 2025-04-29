import axiosInstance from './interceptors'; 

// 1. Submit a new Abhanga
const submitAbhanga = async (payload) => {
  try {
    const response = await axiosInstance.post('abhangas/submit', payload);
    return response.data;
  } catch (error) {
    console.error("Error submitting Abhanga:", error?.response?.data || error.message);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to submit Abhanga.");
    }
    throw new Error('Network error occurred while submitting Abhanga.');
  }
};

// 2. Get all pending Abhangas (for Admin)
const getPendingAbhangas = async () => {
  try {
    const response = await axiosInstance.get('abhangas/pending');
    return response.data;
  } catch (error) {
    console.error("Error fetching pending Abhangas:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred while fetching pending Abhangas');
  }
};

// 3. Approve/Reject an Abhanga (Admin Review)
const updateAbhangaStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(`abhangas/review/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating Abhanga status:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred while updating Abhanga status');
  }
};

// 4. Get all approved Abhangas (Public route)
const getApprovedAbhangas = async () => {
  try {
    const response = await axiosInstance.get('abhangas/all-approved');
    console.log("Approved Abhangas:", response.data); // Debugging line
    return response.data;
  } catch (error) {
    console.error("Error fetching approved Abhangas:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred while fetching approved Abhangas');
  }
};

// 5. Get Abhangas created by the logged-in user (My Abhangas)
const getUserAbhangas = async () => {
  try {
    const response = await axiosInstance.get('abhangas/getuserabhanga');
    return response.data;
  } catch (error) {
    console.error("Error fetching user's Abhangas:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred while fetching user Abhangas');
  }
};

export { 
  submitAbhanga, 
  getPendingAbhangas, 
  updateAbhangaStatus, 
  getApprovedAbhangas,
  getUserAbhangas 
};
