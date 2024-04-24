import axios from 'axios';
import { refresh } from './user';

const BASE_URL = import.meta.env.VITE_BACK_URL;
export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('atoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // access token expired
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await refresh(localStorage.getItem('rtoken')!);
        localStorage.setItem('atoken', response.access);
        originalRequest.headers.Authorization = `Bearer ${response.access}`;
        return apiInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    if (error.response.status === 403) {
      localStorage.removeItem('atoken');
      localStorage.removeItem('rtoken');
    }

    return Promise.reject(error);
  },
);

export const test_one = async () => {
  const response = await apiInstance.get('/main/test/401');
  return response.data;
};

export const test_two = async () => {
  const response = await apiInstance.get('/main/test/403');
  return response.data;
};