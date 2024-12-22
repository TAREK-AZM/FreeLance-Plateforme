import { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import { services } from "../data.json";

function Services() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <form className="flex gap-2 mb-6">
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        placeholder="Search services..."
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map(service => (
                    <ServiceCard key={service.id} {...service} />
                ))}
                <div className="flex items-center justify-center min-h-[200px] border-stone-200 shadow-md hover:shadow-lg">
                    <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Services;
