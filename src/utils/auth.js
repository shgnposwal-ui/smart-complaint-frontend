export const TOKEN_KEY = "jwtToken";
export const USER_ROLE = "userRole";

export const saveAuth = (token, role) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_ROLE, role);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getRole = () => {
    return localStorage.getItem(USER_ROLE);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ROLE);
};

export const isLoggedIn = () => {
    return !!getToken();
};