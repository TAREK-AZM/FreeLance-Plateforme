import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationTabs from "../components/NavigationTabs";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const MainLayout = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-h-screen flex flex-col bg-stone-100">
            <div className="sticky top-0 z-50">
                <Header
                    name={"Abdelwahid Abbad"}
                    email={"abdelwahid@gmail.com"}
                    onMenuToggle={toggleSidebar}
                />
            </div>
            {/* Only show NavigationTabs when Sidebar is not open */}
            {!isSidebarOpen && (
                <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
            <main className="flex-grow container mx-auto py-6 px-4">
                <Outlet />
            </main>
            <Footer />
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
};

export default MainLayout;
