import axiosInstance from "../api/axiosConfig";

const getMyComplaints = () => {
    return axiosInstance.get("/complaints/my");
};

export default {
    getMyComplaints
};