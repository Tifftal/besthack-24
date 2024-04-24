import { apiInstance } from "../AxiosBaseApi";

const ENDPOINTS = {
    department: '/main/department',
    department_user: (id: string, userId: string) => `/main/department/${id}/user?userId=${userId}`,
    department_users: (id: string) => `/main/department/${id}/users`,
}

export const getDepartments = async () => {
    const response = await apiInstance.get(ENDPOINTS.department + `?page=0&size=100&sort=asc`);
    return response.data.content;
}

export const getDepartmentById = async (id: string) => {
    const response = await apiInstance.get(ENDPOINTS.department + `/${id}`);
    return response.data;
}

export const updateDepartment = async (id: string, name: string) => {
    const response = await apiInstance.put(ENDPOINTS.department + `/${id}`, { name });
    return response.data;
}

export const createDepartment = async (name: string) => {
    const response = await apiInstance.post(ENDPOINTS.department, { name });
    return response;
}

export const bindUserToDepartment = async (id: string, userId: string, roles: string[]) => {
    const response = await apiInstance.post(ENDPOINTS.department_user(id, userId), { roles });
    return response.data;
}

export const getDepartmentUsers = async (id: string) => {
    const response = await apiInstance.get(ENDPOINTS.department_users(id));
    return response;
}

export const updateCanSendToDepartment = async (id: string, departments: string[]) => {
    const response = await apiInstance.put(ENDPOINTS.department + `/${id}/can-send-to`, departments);
    return response;
}
