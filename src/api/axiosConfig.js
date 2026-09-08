import axios from "axios";
import { TOKEN_KEY } from "../utils/Constants";

const api = axios.create({
    baseURL: "https://smart-complaint-portal-production.up.railway.app/api",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;