import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
};

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);

        if (!decoded.exp) {
            return true;
        }

        return decoded.exp * 1000 < Date.now();

    } catch (error) {
        return true;
    }
};