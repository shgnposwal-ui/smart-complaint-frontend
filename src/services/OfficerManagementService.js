import api from "../api/axiosConfig";

const getAllOfficers = () => {
    return api.get("/admin/officers");
};

const updateOfficerStatus = (id, active) => {
    return api.put(
        `/admin/officers/${id}/status?active=${active}`
    );
};

export default {
    getAllOfficers,
    updateOfficerStatus
};