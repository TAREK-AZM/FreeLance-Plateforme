import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const DEFAULT_IMAGE = "https://via.placeholder.com/300x200?text=No+Image+Available";

const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
};

function ServiceCard({ id, title, description, price, status, image, onEdit, onDelete }) {


    return (
        <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="bg-gray-50 border border-gray-400  shadow-2xl border-solid relative rounded-lg"
        >
            <Link to={`/prestataires/services/${id}`} className="block">
                <motion.img
                    src={`${import.meta.env.VITE_API2}/api${image}`}
                    alt={title}
                    className="w-full h-40 object-cover rounded-t-md"
                    onError={(e) => {
                        e.target.src = ``;
                    }}
                    whileHover={{ scale: 1.1 }}
                />
                <CardHeader className="p-4">
                    <CardTitle className="text-gray-900">{title}</CardTitle>
                    <CardDescription className="text-gray-600">{description}</CardDescription>
                </CardHeader>
            </Link>
            <CardContent>
                <div className="space-y-2">
                    <Link to={`/prestataires/services/${id}`} className="block">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Price:</span>
                            <span className="font-medium text-gray-900">${price}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Status:</span>
                            <Badge
                                variant={status ? "default" : "secondary"}
                                className={`py-1 px-3 rounded-full text-sm ${
                                    status ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                                }`}
                            >
                                {status ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                    </Link>
                    <div className="flex justify-between mt-4 space-x-2">
                        <Button
                            variant="outline"
                            className="flex-1 text-blue-600 border-blue-600 transition-all duration-200 ease-in-out hover:bg-blue-600 hover:text-white hover:shadow-lg"
                            onClick={onEdit}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            className="flex-1 text-red-600 border-red-600 transition-all duration-200 ease-in-out hover:bg-red-600 hover:text-white hover:shadow-lg"
                            onClick={() => onDelete(id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </CardContent>
        </motion.div>
    );
}

export default ServiceCard;
