import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        console.log("Waiting for authentication to load...");
        return null; // ✅ Prevents redirecting before auth loads
    }

    if (!user) {
        console.log("User not found. Redirecting to login...");
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        console.log("Unauthorized access. Redirecting to home...");
        return <Navigate to="/" replace />;
    }

    console.log("User is authenticated:", user);
    return <Outlet />;
};

export default ProtectedRoute;
