import { SendNotification } from "./types";
import { apiInstance } from "../AxiosBaseApi";

const ENDPOINTS = {
    send_notification: '/main/department/push',
    get_history: '/main/pushes',
    get_push: '/main/push/'
};

export const sendPushNotification = async (payload: SendNotification, departure: string) => {
    try {
        const { data, status } = await apiInstance.post(`${ENDPOINTS.send_notification}?id=${departure}`, {
            ...payload
        })

        return status === 200 ? data : '';
    } catch (error) {
        console.error(`Error occured while sending notification: ${error}`);
    }
}

export const getHistory = async ({ creatorId, fromDepartmentId, toUserId }: { creatorId?: string, fromDepartmentId?: string, toUserId?: string }) => {
    let URL = `${ENDPOINTS.get_history}/?page=0&size=10000&sort=pushTime,desc`;
    if (creatorId !== undefined) {
        URL += `&creatorUserId=${creatorId}`
    }
    if (fromDepartmentId !== undefined) {
        if (creatorId !== undefined) {
            URL += `&fromDepartmentId=${fromDepartmentId}`
        }
        else {
            URL += `&fromDepartmentId=${fromDepartmentId}`
        }
    }

    if (toUserId !== undefined) {
        if (creatorId !== undefined || fromDepartmentId !== undefined) {
            URL += `&toUserId=${toUserId}`
        } else {
            URL += `&toUserId=${toUserId}`
        }
    }

    try {
        const response = await apiInstance.get(URL)
        return response
    }
    catch (error) {
        console.error(`Error occured: ${error}`)
    }
}

export const getPush = async (id: string) => {
    try {
        const response = await apiInstance.get(`${ENDPOINTS.get_push}${id}`)
        return response
    }
    catch (error) {
        console.error(`Error occured: ${error}`)
    }
}