import { use } from "react";
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie";

let isRefreshing = false;
let failedRequestsQueue = [];

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // First, check if this is a login request by examining the URL
        const isLoginRequest =
            originalRequest.url.includes('/login') ||
            originalRequest.url.includes('/signin') ||
            (originalRequest.data &&
                typeof originalRequest.data === 'string' &&
                (originalRequest.data.includes('username') ||
                    originalRequest.data.includes('email') ||
                    originalRequest.data.includes('password')));

        // If it's a login request with a 401, just return the error
        if (error.response?.status === 401 && isLoginRequest) {
            console.log("Login failed with invalid credentials");
            return Promise.reject(error);
        }

        // For other 401 errors (likely token expiration), try to refresh
        if (error.response?.status === 401) {
            // Get user role - if not available, can't refresh
            let user = Cookies.get("role");
            if (!user) {
                console.error("No user role found in cookies. Cannot refresh token.");
                return Promise.reject(error);
            }

            // Map role to API path
            if (user === "user") {
                user = "users";
            }
            else if (user === "serviceprovider") {
                user = "providers";
            }
            else if (user === "admin") {
                user = "admins";
            }

            // Skip refresh token requests
            if (originalRequest.url.includes(`/${user}/refresh-accessToken`)) {
                return Promise.reject(error);
            }

            if (!originalRequest._retry) {
                originalRequest._retry = true;

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedRequestsQueue.push({ resolve, reject });
                    })
                        .then(() => axiosInstance(originalRequest))
                        .catch((err) => Promise.reject(err));
                }

                isRefreshing = true;

                try {
                    console.log(`Attempting to refresh token for ${user}`);
                    const { data } = await axiosInstance.post(`/${user}/refresh-accessToken`);
                    Cookies.set("accessToken", data.accessToken, { secure: true, sameSite: "Strict" });
                    failedRequestsQueue.forEach((prom) => prom.resolve());
                    failedRequestsQueue = [];

                    console.log("Access token refreshed successfully");
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error("Failed to refresh token:", refreshError);
                    failedRequestsQueue.forEach((prom) => prom.reject(refreshError));
                    failedRequestsQueue = [];
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    Cookies.remove("role");

                    alert("Session expired! Please log in again.");
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;