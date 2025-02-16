import DashboardCard from "../components/DashboardCard";
import { Briefcase, Star, MessageSquare, BadgeCheck } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [providerData, setProviderData] = useState(null);
    const [services, setServices] = useState([]);
    const [clientRequests, setClientRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [providerRes, servicesRes, clientRequestsRes] = await Promise.all([
                 axios.get(`${import.meta.env.VITE_API2}/api/prestataire/profil`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
                    axios.get(`${import.meta.env.VITE_API2}/api/prestataire/mesServices`, {
                        headers: {
                            Authorization: `Bearer ${token}`, // Attach token in Authorization header
                        },
                    }),
                    axios.get(`${import.meta.env.VITE_API}/clientRequests`),
                ]);

                setProviderData(providerRes.data);
                setServices(servicesRes.data);
                setClientRequests(clientRequestsRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <DashboardCard title="Total Services" value={services.length} icon={Briefcase} />
            <DashboardCard title="Rating" value={`${providerData?.score || 0}/5`} icon={Star} />
            <DashboardCard title="Pending Requests" value={clientRequests.filter(r => r.status === "PENDING").length} icon={MessageSquare} />
            <DashboardCard title="Certifications" value={providerData?.certifications?.length || 0} icon={BadgeCheck} />
        </div>
    );
};

export default Dashboard;
