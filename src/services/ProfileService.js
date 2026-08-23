import api from "../api/axiosConfig";

const getProfile = () => {
    return api.get("/users/profile");
};

const updateProfile = (data) => {
    return api.put("/users/profile", data);
};

const changePassword = (data) => {
    return api.put("/users/change-password", data);
};

export default {
    getProfile,
    updateProfile,
    changePassword
};