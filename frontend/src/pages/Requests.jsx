import { useState, useEffect } from "react";
import axios from "axios";
import RequestCard from "../components/RequestCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function Requests() {
    const [searchTerm, setSearchTerm] = useState("");
    const [clientRequests, setClientRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientRequests = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API}/clientRequests`); // Replace with your API URL
                setClientRequests(response.data);
            } catch (err) {
                console.error("Error fetching client requests:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClientRequests();
    }, []); // Runs only once after the component mounts

    const filteredRequests = clientRequests.filter(request =>
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading requests...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <form className="flex gap-2 mb-6">
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-500" />
                </div>

            </form>
            <div className="grid gap-4">
                {filteredRequests.map(request => (
                    <RequestCard key={request.id} {...request} />
                ))}
            </div>
        </div>
    );
}

export default Requests;
