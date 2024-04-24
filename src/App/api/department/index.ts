import { apiInstance } from "../AxiosBaseApi";

const ENDPOINTS = {
    department: '/department',
    department_user: (id: string, userId: string) => `/department/${id}/user?userId=${userId}`,
    department_users: (id: string, userId: string) => `/department/${id}/users?userId=${userId}`,
}

export const getDepartments = async () => {
    const response = await apiInstance.get(ENDPOINTS.department);
    return response.data;
}

export const getDepartmentById = async (id: string) => {
    const response = await apiInstance.get(ENDPOINTS.department + `/${id}`);
    return response.data;
}

export const updateDepartment = async (id: string) => {
    const response = await apiInstance.put(ENDPOINTS.department + `/${id}`);
    return response.data;
}

export const createDepartment = async (name: string) => {
    const response = await apiInstance.post(ENDPOINTS.department, {name});
    return response.data;
}

export const bindUserToDepartment = async (id: string, userId: string, roles: string[]) => {
    const response = await apiInstance.post(ENDPOINTS.department_user(id, userId), {roles});
    return response.data;
}

export const getDepartmentUsers = async (id: string, userId: string) => {
    const response = await apiInstance.get(ENDPOINTS.department_users(id, userId));
    return response.data;
}
