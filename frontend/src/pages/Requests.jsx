import { useState } from "react";
import RequestCard from "../components/RequestCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { clientRequests } from "../data.json";

function Requests() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRequests = clientRequests.filter(request =>
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <form className="flex gap-2 mb-6">
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-500" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Search
                </Button>
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
