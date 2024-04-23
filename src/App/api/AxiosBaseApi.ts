import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACK_URL

export const apiInstance = axios.create({
    baseURL: BASE_URL,
})