import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Cog, MessageSquare, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NavigationTabs({ activeTab, setActiveTab }) {
    const navigate = useNavigate();

    const handleTabChange = (value) => {
        setActiveTab(value); // Update the active tab state
        navigate(`/${value}`); // Navigate to the corresponding route
    };

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <div className="lg:hidden">
                <TabsList className="grid w-full grid-cols-1 gap-2">
                    <TabsTrigger value="">Dashboard</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="requests">Client Requests</TabsTrigger>
                    <TabsTrigger value="jobboard">Job Board</TabsTrigger>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                </TabsList>
            </div>
            <div className="hidden lg:block">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>Dashboard</span>
                    </TabsTrigger>
                    <TabsTrigger value="services" className="flex items-center gap-2">
                        <Cog className="h-4 w-4" />
                        <span>Services</span>
                    </TabsTrigger>
                    <TabsTrigger value="requests" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Client Requests</span>
                    </TabsTrigger>
                    <TabsTrigger value="jobboard" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        <span>Job Board</span>
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                    </TabsTrigger>
                </TabsList>
            </div>
        </Tabs>
    );
}

export default NavigationTabs;
