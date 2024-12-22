import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationTabs from "../components/NavigationTabs";
import { useState } from "react";

const MainLayout = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="min-h-screen flex flex-col bg-stone-100">
            <div className="sticky top-0 z-50">
                <Header />

            </div>
            <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-grow container mx-auto py-6 px-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
