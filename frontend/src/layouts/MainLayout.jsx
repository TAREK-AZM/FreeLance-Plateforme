import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationTabs from "../components/NavigationTabs";
import { useState } from "react";
import VantaBackground from "@/components/VantaBackground.jsx";

const MainLayout = () => {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="min-h-screen flex flex-col bg-stone-100 dark:bg-stone-900 relative">
            {/* Add VantaBackground as a positioned element */}
            <div className="absolute inset-0 z-0">
                <VantaBackground />
            </div>

            {/* Layout content */}
            <div className="relative z-10">
                <div className="sticky top-0 z-50">
                    <Header name={'Abdelwahid Abbad'} email={'abdelwaih@gmail.com'} />
                    <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>



                <main className="flex-grow container mx-auto py-6 px-4">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;

