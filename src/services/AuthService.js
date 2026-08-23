import axiosInstance from "../api/axiosConfig";

const login = (data) => {
    return axiosInstance.post("/auth/login", data);
};

const register = (data) => {
    return axiosInstance.post("/users/register", data);
};

export default {
    login,
    register
};