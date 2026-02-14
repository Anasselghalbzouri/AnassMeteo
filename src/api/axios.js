import axios from 'axios';
import { store } from '../store/apps';
import { logout } from '../store/authSlice';

const axiosInstance = axios.create({
    baseURL: 'https://your-api-url.com/api', // Replace with your actual API URL
});

// Request interceptor to add the JWT token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 Unauthorized errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Dispatch logout action if token is invalid or expired
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
