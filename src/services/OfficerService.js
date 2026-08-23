import api from "../api/axiosConfig";

const getDashboard = () => {
    return api.get("/officer/dashboard");
};

const getAssignedComplaints = () => {
    return api.get("/officer/complaints");
};

const updateComplaintStatus = (complaintNumber, data) => {
    return api.put(
        `/officer/complaints/${complaintNumber}/status`,
        data
    );
};

export default {
    getDashboard,
    getAssignedComplaints,
    updateComplaintStatus
};