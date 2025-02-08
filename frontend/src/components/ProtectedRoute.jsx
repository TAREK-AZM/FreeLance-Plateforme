import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

    return <Outlet />;
};

export default ProtectedRoute;
