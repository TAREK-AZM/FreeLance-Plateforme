import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from "react-router-dom";
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
import Home from "./clientPages/Home";
import FreelancersHome from "./clientPages/FreelancersHome";
import JobsHome from "./clientPages/JobsHome";
import ServicesHome from "./clientPages/ServicesHome";
import FreelancerDetails from "./clientPages/FreelanderDetailsPage";
import ServiceClientDetails from "./clientPages/ServiceDetailsPage";
import JobDetails from "./components/clientComponents/Job-Details";
import DashboearClient from "./clientPages/ClientDashboard";
import OffresClient from "./components/clientComponents/offres-client";
import Notification from "./components/clientComponents/Notification-Modal";
import Conversation from "./components/clientComponents/Conversation-Modal";

// i mean by jobs the offres that the client post 
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
           {/* Public routes */}
           <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Redirect the first-time visit to the client homepage */}
            <Route path="/" element={<Navigate to="/client/homepage" />} />

            {/* Protected Routes for "PRESTATAIRE" (Service Providers) */}
            <Route element={<ProtectedRoute allowedRoles={['PRESTATAIRE']} />}>
                <Route path="/prestataires" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="services" element={<Services />} />
                    <Route path="services/:id" element={<ServiceDetails />} />
                    <Route path="user/:userId" element={<UserDetails />} />
                    <Route path="requests" element={<Requests />} />
                    <Route path="jobboard" element={<JobBoard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="users" element={<Users />} />
                </Route>
            </Route>

            {/* Client Pages (Home is the default under /client) */}
            <Route path="/client">
                <Route index element={<Navigate to="homepage" />} /> {/* ✅ Redirects "/client" to "/client/homepage" */}
                <Route path="homepage" element={<Home />} />
                {/* freelancers */}
                <Route path="freelancers" element={<FreelancersHome />} />
                <Route path="freelancers/:id" element={<FreelancerDetails />} />

                {/* jobs */}
                <Route path="jobs" element={<JobsHome />} />
                <Route path="jobs/:id" element={<JobDetails />} />

                {/* services */}
                <Route path="services" element={<ServicesHome />} />
                <Route path="services/:id" element={<ServiceClientDetails />} />


                {/* Client Dashboard - Nested routes inside `DashboearClient` */}
                <Route path="dashboard" element={<DashboearClient />}>
                    <Route index element={<OffresClient />} />
                    {/* <Route path="service/:id/serviceDetails" element={<Profile />} /> */}
                    <Route path="notifications/:id" element={<Notification />} />
                    <Route path="conversations/:id" element={<Conversation />} />
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
