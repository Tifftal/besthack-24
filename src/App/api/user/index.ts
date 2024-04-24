import { getFirebaseToken } from '../../config/firebase/firebaseConfig';
import { apiInstance } from '../AxiosBaseApi';

const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  refresh: '/auth/refresh',
  me: '/main/auth/user/me',
  push: '/main/auth/user/token',
};

export const login = async (username: string, password: string) => {
  const response = await apiInstance.post(ENDPOINTS.login, {
    username,
    password,
  });

  if (response.status === 400) {
    throw new Error('Bad request');
  }

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (response.status === 409) {
    throw new Error('Conflict');
  }

    return response.data;
};

export const register = async (username: string, password: string) => {
  const { data, status } = await apiInstance.post(ENDPOINTS.register, {
    username,
    password,
  });

  if (status === 400) {
    throw new Error('Bad request');
  }

  if (status === 401) {  
    throw new Error('Unauthorized');
  }

  if (status === 409) {
    throw new Error('Conflict');
  }

  return data;
};

export const refresh = async (refresh: string) => {
  const { data, status } = await apiInstance.post(ENDPOINTS.refresh, {
    refresh,
  });

  if (status === 400) {
    throw new Error('Bad request');
  }

  return data;
};

export const me = async () => {
  const { data, status } = await apiInstance.get(ENDPOINTS.me);

  if (status === 400) {
    throw new Error('Bad request');
  }

  if (status === 401) {
    throw new Error('Unauthorized');
  }

  return data;
};

export const generatePushToken = async () => {
  try {
    const firebaseToken = await getFirebaseToken();
    if (firebaseToken) {
      const { status } = await apiInstance.post(`${ENDPOINTS.push}?token=${firebaseToken}`);
  
      return status;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
