import { Link, useNavigate } from "react-router-dom";
import { Cog, MessageSquare, Briefcase, User, LogOut } from "lucide-react";
import { useContext, useCallback } from "react";
import AuthContext from "../context/AuthContext";

function SideBar({ isOpen, onClose, activeTab, setActiveTab }) {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        logout(); // Clears authentication state
        navigate("/login"); // Redirects to login page
    }, [logout, navigate]);

    return (
        <>
            {/* Overlay for closing the sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 bg-gray-900 bg-opacity-90 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out w-64 z-50 flex flex-col`}
            >
                <div className="p-4 text-white">
                    <h2 className="text-lg font-bold mb-4">Menu</h2>
                    <nav className="space-y-2">

                        {/* ✅ Dashboard (Correct Route) */}
                        <Link
                            to="/prestataires"
                            className={`flex items-center px-4 py-3 text-white rounded ${
                                activeTab === "dashboard" ? "bg-gray-700" : ""
                            }`}
                            onClick={() => {
                                setActiveTab("dashboard");
                                onClose();
                            }}
                        >
                            <Briefcase className="mr-2 w-5 h-5"/>
                            Dashboard
                        </Link>



                        <hr className="border-gray-700"/>

                        {/* ✅ Services */}
                        <Link
                            to="/prestataires/services"
                            className={`flex items-center px-4 py-3 text-white rounded ${
                                activeTab === "services" ? "bg-gray-700" : ""
                            }`}
                            onClick={() => {
                                setActiveTab("services");
                                onClose();
                            }}
                        >
                            <Cog className="mr-2 w-5 h-5"/>
                            Services
                        </Link>

                        <hr className="border-gray-700"/>

                        {/* ✅ Client Requests */}
                        <Link
                            to="/prestataires/requests"
                            className={`flex items-center px-4 py-3 text-white rounded ${
                                activeTab === "requests" ? "bg-gray-700" : ""
                            }`}
                            onClick={() => {
                                setActiveTab("requests");
                                onClose();
                            }}
                        >
                            <MessageSquare className="mr-2 w-5 h-5"/>
                            Client Requests
                        </Link>

                        <hr className="border-gray-700"/>

                        {/* ✅ Job Board */}
                        <Link
                            to="/prestataires/jobboard"
                            className={`flex items-center px-4 py-3 text-white rounded ${
                                activeTab === "jobboard" ? "bg-gray-700" : ""
                            }`}
                            onClick={() => {
                                setActiveTab("jobboard");
                                onClose();
                            }}
                        >
                            <Briefcase className="mr-2 w-5 h-5"/>
                            Job Board
                        </Link>

                        <hr className="border-gray-700"/>

                        {/* ✅ Profile */}
                        <Link
                            to="/prestataires/profile"
                            className={`flex items-center px-4 py-3 text-white rounded ${
                                activeTab === "profile" ? "bg-gray-700" : ""
                            }`}
                            onClick={() => {
                                setActiveTab("profile");
                                onClose();
                            }}
                        >
                            <User className="mr-2 w-5 h-5"/>
                            Profile
                        </Link>

                        <hr className="border-gray-700"/>
                    </nav>

                    {/* ✅ Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-3 text-red-500 hover:text-red-400 transition-colors w-full"
                    >
                        <LogOut className="mr-2 w-5 h-5" />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default SideBar;
