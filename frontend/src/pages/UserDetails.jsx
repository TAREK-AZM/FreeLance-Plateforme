import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

const DEFAULT_PROFILE_IMG = `${import.meta.env.VITE_FRONTEND}/assets/profile/default-profile.jpg`;

const UserDetails = () => {
    const { userId } = useParams();
    const location = useLocation();
    const { serviceId } = location.state || {}; // Retrieve service ID from state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to load user data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-700 dark:text-gray-300">Loading user data...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-700 dark:text-gray-300">User not found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8">
            <Toaster position="top-center" reverseOrder={false} />

            {/* Back Link to Service Details */}
            <div className="flex items-center mb-6">
                {serviceId ? (
                    <Link
                        to={`/services/${serviceId}`}
                        className="text-indigo-500 hover:text-indigo-600 flex items-center transition-all"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Service Details
                    </Link>
                ) : (
                    <Link to="/" className="text-indigo-500 hover:text-indigo-600 flex items-center transition-all">
                        <FaArrowLeft className="mr-2" /> Back to Dashboard
                    </Link>
                )}
            </div>

            {/* User Details Card */}
            <div className="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start transition-transform transform hover:scale-105">
                {/* Profile Image */}
                <div className="relative">
                    <img
                        src={user.profileImg || DEFAULT_PROFILE_IMG}
                        alt={`${user.name} ${user.lastName}`}
                        className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-500 opacity-30 animate-pulse"></div>
                </div>

                {/* User Info */}
                <div className="mt-6 md:mt-0 md:ml-8 flex-1">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                        {user.name} {user.lastName}
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        <span className="font-semibold">Email: </span>
                        {user.email}
                    </p>
                    <p className="text-md text-gray-600 dark:text-gray-400 leading-relaxed">
                        {user.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;