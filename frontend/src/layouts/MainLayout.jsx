import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationTabs from "../components/NavigationTabs";
import { useEffect, useState } from "react";
import VantaBackground from "@/components/VantaBackground.jsx";
import axios from "axios";

const MainLayout = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [providerData, setProviderData] = useState(null);

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_API2}/api/prestataire/profil`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token in Authorization header
                    },
                });
                setProviderData(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching provider data:", err);
            }
        };

        fetchProviderData();
    }, [import.meta.env.VITE_API2]);

    return (
        <div className="min-h-screen flex flex-col bg-stone-100 dark:bg-stone-900 relative">
            {/* Add VantaBackground as a positioned element */}
            <div className="absolute inset-0 z-0">
                <VantaBackground />
            </div>

            {/* Layout content */}
            <div className="relative z-10">
                <div className="sticky top-0 z-50">
                    <Header
                        name={providerData ? `${providerData.nom} ${providerData.prenom}` : "Loading..."}
                        email={providerData ? providerData.email : "Loading..."}
                    />
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
