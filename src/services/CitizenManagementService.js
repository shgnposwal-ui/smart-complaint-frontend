import api from "../api/axiosConfig";

const getAllCitizens = () => {
    return api.get("/admin/citizens");
};

export default {
    getAllCitizens
};