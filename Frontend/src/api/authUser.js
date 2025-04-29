import axiosInstance from './interceptors';

const loginUser = async (payload, endpoint) => {
  try {
    const response = await axiosInstance.post(endpoint, payload);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Error", error)
      throw error.response.data;
  }
};

const signupUser = async (userData, endpoint) => {
  try {
    const response = await axiosInstance.post(endpoint, userData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      return error.response.data;
    }
    throw new Error('Network error occurred)');
  }
};

const logoutUser = async (role) => {
const user = ( role === "user" ? "user" : "admin" );

  try {
    const response = await axiosInstance.post(`${user}s/logout-${user}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      throw error.response.data;
    }
  }
};

const sentotp = async (email, role) => {
  const user = ( role === "user" ? "users" : ( role === "serviceprovider" ) ? "providers" : "admins" );
  try {
    const response = await axiosInstance.post(`${user}/forget-password`, { email })
    console.log()
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

const verify_otp = async (otp, role) => {
  const user = ( role === "user" ? "users" : ( role === "serviceprovider" ) ? "providers" : "admins" );
  try {
    const response = await axiosInstance.post(`${user}/verify-otp`, { otp })
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
  }
}

const Reset_Password = async (newPassword, role) => {
  const user = ( role === "user" ? "users" : ( role === "serviceprovider" ) ? "providers" : "admins" );
  try {
    const response = await axiosInstance.post(`${user}/reset-password`, { newPassword });
    return response;
  } catch (error) {
    throw error
  }
}

const updateUserDetails = async (userData) => {
  try {
    const response = await axiosInstance.put('users/change-user-details', userData); // Adjust URL as per your API route
    console.log("User details updated:", response.data); // Debugging line
    return response.data;
  } catch (error) {
    console.error("Error updating user details:", error);
    if (error.response) {
      throw error.response.data; // Return the error response from the server
    }
    throw new Error('Network error occurred while updating user details');
  }
};



export { loginUser, signupUser, logoutUser, sentotp, verify_otp, Reset_Password, updateUserDetails };