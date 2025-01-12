import { Link } from "react-router-dom";
import { Cog, MessageSquare, Briefcase, User } from "lucide-react";

function SideBar({ isOpen, onClose, activeTab, setActiveTab }) {
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
                } transition-transform duration-300 ease-in-out w-64 z-50`}
            >
                <div className="p-4 text-white">
                    <h2 className="text-lg font-bold mb-4">Menu</h2>
                    <nav className="space-y-2">
                        <Link
                            to="/"
                            className={`flex items-center px-4 py-2 text-white rounded ${
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
                        <hr/>
                        <Link
                            to="/services"
                            className={`flex items-center px-4 py-2 text-white rounded ${
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
                        <hr/>
                        <Link
                            to="/requests"
                            className={`flex items-center px-4 py-2 text-white rounded ${
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
                        <hr/>
                        <Link
                            to="/jobboard"
                            className={`flex items-center px-4 py-2 text-white rounded ${
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
                        <hr/>
                        <Link
                            to="/profile"
                            className={`flex items-center px-4 py-2 text-white rounded ${
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
                    </nav>
                </div>
            </div>
        </>
    );
}

export default SideBar;
