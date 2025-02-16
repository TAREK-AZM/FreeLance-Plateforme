import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {toast} from "react-hot-toast";

function RequestCard({ id, service, status, onUpdate }) {
    const [currentStatus, setCurrentStatus] = useState(status);
    const token = localStorage.getItem("token");

    const getBadgeStyle = (status) => {
        switch (status) {
            case "EN_COURS":
                return "bg-yellow-100 text-yellow-700";
            case "ANNULEE":
                return "bg-red-100 text-red-700";
            case "TERMINEE":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Accept Request
    const handleAccept = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_API2}/api/prestataire/demande/${id}/accepter`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // setCurrentStatus("TERMINEE"); // Update status in UI
            // onUpdate(id);
        } catch (err) {
            console.error("Error accepting request:", err);
            // alert("Failed to accept the request.");
        }
        setCurrentStatus("TERMINEE");
        toast.success("Request succesfully accepted!");
    };

    // Decline Request
    const handleDecline = async () => {
        try {
            await axios.patch(`${import.meta.env.VITE_API2}/api/prestataire/demande/${id}/annuler`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // setCurrentStatus("ANNULEE"); // Update status in UI
            // onUpdate(id);
        } catch (err) {
            console.error("Error declining request:", err);
            // alert("Failed to decline the request.");
        }
        setCurrentStatus("ANNULEE");
        toast.success("Request succesfully declined!");
    };

    return (
        <div className="relative group">
            <Card className="border border-gray-400 shadow-2xl hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg">
                <CardHeader>
                    {/* Title and Status */}
                    <div className="flex items-center justify-between">
                        <CardTitle className="font-semibold text-lg text-gray-900">{service.titre}</CardTitle>
                        <Badge
                            className={`py-1 px-3 rounded-full text-sm ${getBadgeStyle(currentStatus)}`}
                        >
                            {currentStatus}
                        </Badge>
                    </div>
                    <CardDescription className="text-gray-600 mt-2">{service.description}</CardDescription>
                </CardHeader>

                {/* Accept/Decline Buttons (Only if status is EN_COURS) */}
                {currentStatus === "EN_COURS" && (
                    <CardContent className="relative">
                        <div className="flex justify-around items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="relative group">
                                <button
                                    className="text-base text-green-600 hover:text-green-800 font-medium font-sans transition-colors duration-200"
                                    onClick={handleAccept}
                                >
                                    Accept
                                </button>
                                <div className="h-0.5 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </div>
                            <div className="relative group">
                                <button
                                    className="text-base text-red-600 hover:text-red-800 font-medium font-sans transition-colors duration-200"
                                    onClick={handleDecline}
                                >
                                    Decline
                                </button>
                                <div className="h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </div>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}

export default RequestCard;
