import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

// Helper function to intercept API requests for bearer token authentication
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token)
    {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});