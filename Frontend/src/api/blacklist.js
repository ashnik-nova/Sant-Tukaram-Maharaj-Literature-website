import axiosInstance from './interceptors';

// Add a new email directly to blacklist
const addEmailToBlacklist = async (email) => {
  try {
    const response = await axiosInstance.post(`blacklist/add-email`, { email });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding email to blacklist:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred');
  }
};

// Remove an email from blacklist
const removeEmailFromBlacklist = async (email) => {
  try {
    const response = await axiosInstance.post(`blacklist/remove-email`, { email });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error removing email from blacklist:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred');
  }
};

// Get all blacklisted emails
const getAllBlacklistedEmails = async () => {
  try {
    const response = await axiosInstance.get(`blacklist/all`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching blacklisted emails:", error);
    if (error.response) {
      throw error.response.data;
    }
    throw new Error('Network error occurred');
  }
};

export {
  addEmailToBlacklist,
  removeEmailFromBlacklist,
  getAllBlacklistedEmails
};
