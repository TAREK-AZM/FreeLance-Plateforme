import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Requests from "./pages/Requests";
import JobBoard from "./pages/JobBoard";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserDetails from "./pages/UserDetails";
import Users from "./pages/Users"

import ProtectedRoute from "./components/ProtectedRoute";
import {AuthProvider} from "./context/AuthContext";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Public routes without MainLayout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />


            <Route element={<ProtectedRoute allowedRoles={['PRESTATAIRE']} />}>
            {/* Routes with MainLayout */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<ServiceDetails />} />
                <Route path="/user/:userId" element={<UserDetails />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/jobboard" element={<JobBoard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/users" element={<Users />} />
            </Route>
            </Route>
        </>
    )
);

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
