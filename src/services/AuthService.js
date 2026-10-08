import axiosInstance from "../api/axiosConfig";

const login = (data) => {
    return axiosInstance.post("/api/auth/login", data);
};

const register = (data) => {
    return axiosInstance.post("/api/users/register", data);
};

export default {
    login,
    register
};