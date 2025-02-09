import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Cog, MessageSquare, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function NavigationTabs({ activeTab, setActiveTab }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleTabChange = (value) => {
        setActiveTab(value); // Update the active tab state
        navigate(`/${value}`); // Navigate to the corresponding route
    };

    // Sync the activeTab state with the current URL path
    useEffect(() => {
        const path = location.pathname.slice(1); // Remove the leading slash
        setActiveTab(path || ""); // Update activeTab to the current path or default to the dashboard
    }, [location.pathname, setActiveTab]);

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6 border-t border-b border-gray-300">
            <div className="hidden lg:block">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="prestataires" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>Dashboard</span>
                    </TabsTrigger>
                    <TabsTrigger value="prestataires/services" className="flex items-center gap-2">
                        <Cog className="h-4 w-4" />
                        <span>Services</span>
                    </TabsTrigger>
                    <TabsTrigger value="prestataires/requests" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Client Requests</span>
                    </TabsTrigger>
                    <TabsTrigger value="prestataires/jobboard" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>Job Board</span>
                    </TabsTrigger>
                    <TabsTrigger value="prestataires/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                    </TabsTrigger>
                </TabsList>
            </div>
        </Tabs>
    );
}

export default NavigationTabs;
