import { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import FormModal from "../components/FormModal";
import { Input } from "@/components/ui/input.jsx";
import { PlusCircle, Search } from "lucide-react";
import { Card } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Toaster,toast} from "react-hot-toast";

function Services() {
    const [searchTerm, setSearchTerm] = useState("");
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [editData, setEditData] = useState(null);

    // Fetch all services
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API}/services`);
            setServices(response.data);
        } catch (err) {
            console.error("Error fetching services:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // Add new service
    const handleAdd = () => {
        setEditData(null); // Reset form for new service
        setModalVisible(true);
    };

    // Edit existing service
    const handleEdit = (service) => {
        setEditData(service); // Pre-fill form with existing data
        setModalVisible(true);
    };

    // Delete a service
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API}/services/${id}`);
            setServices((prevServices) => prevServices.filter((service) => service.id !== id));
            console.log(`Service with ID ${id} deleted successfully`);
            toast.success("Service deleted successfully!");
        } catch (err) {
            console.error("Error deleting service:", err);
        }
    };

    // Close the modal and refresh the services list
    const closeModal = () => {
        setModalVisible(false);
        toast.success('service edited successfully!')
        fetchServices(); // Refresh services after adding/editing
    };

    // Filter services based on search term
    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading services...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <Toaster position="top-center"
                     reverseOrder={false} />

            <form className="flex gap-2 mb-6">
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-500" />
                </div>
            </form>

            {/* Service Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                    <ServiceCard
                        key={service.id}
                        {...service}
                        onEdit={() => handleEdit(service)} // Pass service to edit
                        onDelete={() => handleDelete(service.id)} // Pass ID to delete
                    />
                ))}
                {/* Add New Service Card */}
                <Card className="flex items-center justify-center min-h-[200px] border-stone-200 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
                    <Button
                        variant="outline"
                        className="transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105"
                        onClick={handleAdd}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
                    </Button>
                </Card>
            </div>

            {/* Form Modal for Add/Edit */}
            <FormModal
                isVisible={isModalVisible}
                onClose={closeModal}
                onSubmit="services"
                formData={editData}
                isEdit={!!editData}
            />
        </div>
    );
}

export default Services;
