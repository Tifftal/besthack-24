import { SendNotification } from "./types";
import { apiInstance } from "../AxiosBaseApi";

const ENDPOINTS = {
    send_notification: '/main/department/push',
};

export const sendPushNotification = async (payload: SendNotification) => {
    try {
        const { data, status } = await apiInstance.post(ENDPOINTS.send_notification, {
            ...payload
        })

        return status === 200 ? data : '';
    } catch (error) {
        console.error(`Error occured while sending notification: ${error}`);
    }
}
