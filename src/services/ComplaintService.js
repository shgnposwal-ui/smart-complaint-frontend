import axiosInstance from "../api/axiosConfig";

const createComplaint = (data) => {
    return axiosInstance.post("/complaints", data);
};

const getMyComplaints = () => {
    return axiosInstance.get("/complaints/my");
};

const getComplaintByNumber = (complaintNumber) => {
    return axiosInstance.get(`/complaints/${complaintNumber}`);
};

const getAllComplaints = () => {
    return axiosInstance.get("/admin/complaints");
};

export default {
    createComplaint,
    getMyComplaints,
    getComplaintByNumber,
    getAllComplaints
};