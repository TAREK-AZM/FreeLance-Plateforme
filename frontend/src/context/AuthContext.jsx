import { createContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Prevents early rendering

    useEffect(() => {
        console.log("Checking localStorage...");
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (token && role) {
            console.log("User found in localStorage:", { token, role });
            setUser({ token, role });
        }

        setLoading(false); // ✅ Stops infinite re-renders
    }, []);

    const login = (token, role) => {
        console.log("Logging in:", { token, role });
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setUser({ token, role });
    };

    const logout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null);
    };

    const authValue = useMemo(() => ({ user, login, logout, loading }), [user, loading]);

    if (loading) return null; // ✅ Waits before rendering anything

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
