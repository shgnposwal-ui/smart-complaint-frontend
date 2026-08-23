import axiosInstance from "../api/axiosConfig";

const getDashboard = () => {
    return axiosInstance.get("/citizen/dashboard");
};

export default {
    getDashboard
};