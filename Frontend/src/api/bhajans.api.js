import axiosInstance from './interceptors';

const submitBhajan = async (payload) => {
  try {
    const response = await axiosInstance.post('audios/upload-audio', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting Bhajan:", error?.response?.data || error.message);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Failed to submit Bhajan.");
    }
    throw new Error('Network error occurred while submitting Bhajan.');
  }
};


const getPendingBhajans = async () => {
  try {
    const response = await axiosInstance.get('audios/pending');
    return response.data;
  } catch (error) {
    console.error("Error fetching pending Bhajans:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred while fetching pending Bhajans');
  }
};

const updateBhajanStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(`audios/update-status/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating Bhajan status:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred while updating Bhajan status');
  }
};

const getApprovedBhajans = async () => {
  try {
    const response = await axiosInstance.get('audios/all');
    console.log("Approved Bhajans:", response.data); // Debugging line
    return response.data;
  } catch (error) {
    console.error("Error fetching approved Bhajans:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred while fetching approved Bhajans');
  }
};

const getUserBhajans = async () => {
  try {
    const response = await axiosInstance.get('audios/all');
    return response.data;
  } catch (error) {
    console.error("Error fetching user's Bhajans:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred while fetching user Bhajans');
  }
};

export { 
  submitBhajan, 
  getPendingBhajans, 
  updateBhajanStatus, 
  getApprovedBhajans,
  getUserBhajans 
};
