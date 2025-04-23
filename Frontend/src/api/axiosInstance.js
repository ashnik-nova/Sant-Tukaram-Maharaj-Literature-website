import axios from "axios";
const baseurl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseurl,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default axiosInstance;