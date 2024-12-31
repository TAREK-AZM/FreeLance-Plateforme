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
                        className="text-indigo-500 hover:text-indigo-600 flex items-center"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Service Details
                    </Link>
                ) : (
                    <Link to="/" className="text-indigo-500 hover:text-indigo-600 flex items-center">
                        <FaArrowLeft className="mr-2" /> Back to Dashboard
                    </Link>
                )}
            </div>

            {/* User Details Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start">
                {/* Profile Image */}
                <img
                    src={user.profileImg || DEFAULT_PROFILE_IMG}
                    alt={`${user.name} ${user.lastName}`}
                    className="w-32 h-32 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                />

                {/* User Info */}
                <div className="mt-6 md:mt-0 md:ml-8 flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {user.name} {user.lastName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
                    <p className="text-gray-800 dark:text-gray-300">{user.description}</p>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
