import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Requests from "./pages/Requests";
import JobBoard from "./pages/JobBoard";
import Profile from "./pages/Profile";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route
                path="/services/:id"
                element={<ServiceDetails />}/>
            <Route path="/requests" element={<Requests />} />
            <Route path="/jobboard" element={<JobBoard />} />
            <Route path="/profile" element={<Profile />} />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
