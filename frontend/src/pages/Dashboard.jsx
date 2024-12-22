import DashboardCard from "../components/DashboardCard";
import { Briefcase, Star, MessageSquare, BadgeCheck } from "lucide-react";
import { providerData, services, clientRequests } from "../data.json";

function Dashboard() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <DashboardCard title="Total Services" value={services.length} icon={Briefcase} />
            <DashboardCard title="Rating" value={`${providerData.score}/5`} icon={Star} />
            <DashboardCard title="Pending Requests" value={clientRequests.filter(r => r.status === "PENDING").length} icon={MessageSquare} />
            <DashboardCard title="Certifications" value={providerData.certifications.length} icon={BadgeCheck} />
        </div>
    );
}

export default Dashboard;
