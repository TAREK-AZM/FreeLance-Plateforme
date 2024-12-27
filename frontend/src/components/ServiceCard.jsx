import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Default placeholder image
const DEFAULT_IMAGE = "https://via.placeholder.com/300x200?text=No+Image+Available";

function ServiceCard({ id, title, description, price, status, img, onEdit, onDelete }) {
    img = `${import.meta.env.VITE_FRONTEND}${img}`
    console.log(img)
    return (
        <Card className="bg-gray-50 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
            <Link to={`/services/${id}`} className="block">
                <CardHeader>
                    {/* Picture Section with Fallback */}

                    <img
                        src={img || DEFAULT_IMAGE}
                        alt={title}
                        className="w-full h-40 object-cover rounded-t-md"
                        onError={(e) => {
                            e.target.src = DEFAULT_IMAGE; // Fallback if the image fails to load
                        }}
                    />
                    <CardTitle className="text-gray-900 mt-2">{title}</CardTitle>
                    <CardDescription className="text-gray-600">{description}</CardDescription>
                </CardHeader>
            </Link>
            <CardContent>
                <div className="space-y-2">
                    <Link to={`/services/${id}`} className="block">
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
        </Card>
    );
}

export default ServiceCard;
