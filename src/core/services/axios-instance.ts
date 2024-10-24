import axios from "axios";
import refreshToken from "./refresh-token";


export const axiosAdminInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

axiosAdminInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            // Token expired - handle 401
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                await refreshToken();
                return axiosAdminInstance(originalRequest);
            }

            // Catch all other errors
            const errorMessage = `${error.response.data.message || error.response.statusText}`;

            return Promise.reject(new Error(errorMessage));
        }
        
        return Promise.reject(error);
    }
);
