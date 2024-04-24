import { apiInstance } from '../AxiosBaseApi';

const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  refresh: '/auth/refresh',
  me: '/main/auth/user/me',
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
  const response = await apiInstance.post(ENDPOINTS.register, {
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

export const refresh = async (refresh: string) => {
  const response = await apiInstance.post(ENDPOINTS.refresh, {
    refresh,
  });

  if (response.status === 400) {
    throw new Error('Bad request');
  }

  return response.data;
};

export const me = async () => {
  const response = await apiInstance.get(ENDPOINTS.me);

  if (response.status === 400) {
    throw new Error('Bad request');
  }

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  return response.data;
};