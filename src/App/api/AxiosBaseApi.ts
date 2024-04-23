import axios from "axios";
const BASE_URL = import.meta.env.BACK_URL

export const apiInstance = axios.create({
    baseURL: BASE_URL,
})

export const apiMainInstance = axios.create({
    baseURL: import.meta.env.VITE_MAIN_URL,
})