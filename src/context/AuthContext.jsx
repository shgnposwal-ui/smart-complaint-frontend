import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, isTokenExpired } from "../utils/TokenUtils";
import { TOKEN_KEY } from "../utils/Constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem(TOKEN_KEY);

        if (token && !isTokenExpired(token)) {
            setUser({
                token,
                role: localStorage.getItem("role"),
                userId: localStorage.getItem("userId"),
                fullName: localStorage.getItem("fullName"),
                email: localStorage.getItem("email")
            });
        }

    }, []);

    const login = (response) => {

        localStorage.setItem(TOKEN_KEY, response.token);

        localStorage.setItem("role", response.role);

        localStorage.setItem("userId", response.userId);

        localStorage.setItem("fullName", response.fullName);

        localStorage.setItem("email", response.email);

        setUser(response);
    };

    const logout = () => {

        localStorage.removeItem(TOKEN_KEY);

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);