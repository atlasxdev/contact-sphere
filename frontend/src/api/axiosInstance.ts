import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_DEV_URL;

export const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "Content-Type": "application/json",
        timeout: 1000,
    },
});
