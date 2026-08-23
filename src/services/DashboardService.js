import axiosInstance from "../api/axiosConfig";

const getAdminDashboard = () => {
    return axiosInstance.get("/admin/dashboard");
};

export default {
    getAdminDashboard,
};