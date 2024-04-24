import { UserInitials } from 'App/pages/ProfilePage/ProfilePage';
import { getFirebaseToken } from '../../config/firebase/firebaseConfig';
import { apiInstance } from '../AxiosBaseApi';

const USERS_LIMIT = 1000000;

const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  refresh: '/auth/refresh',
  me: '/main/auth/user/me',
  edit: '/main/auth/user',
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

export const updateUser = async (user: UserInitials) => {
  const {data, status} = await apiInstance.put(ENDPOINTS.edit, {
    ...user
  })

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

}

export const getUsers = async () => {
  try {
    const { data, status } = await apiInstance.get(`/main/user?page=0&size=${USERS_LIMIT}&sort=ASC`);

    return status === 200 ? data : [];
  } catch(err) {
    console.error("Error occured while fetching users: ", err);
  }
}
