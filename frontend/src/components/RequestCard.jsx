import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function RequestCard({ title, description, status }) {
    const getBadgeStyle = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";
            case "IN PROGRESS":
                return "bg-blue-100 text-blue-700";
            case "COMPLETED":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="relative group">
            <Card className="border border-gray-400 shadow-2xl hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg">
                <CardHeader>
                    {/* Title and Status */}
                    <div className="flex items-center justify-between">
                        <CardTitle className="font-semibold text-lg text-gray-900">{title}</CardTitle>
                        <Badge
                            className={`py-1 px-3 rounded-full text-sm ${getBadgeStyle(status)}`}
                        >
                            {status}
                        </Badge>
                    </div>
                    <CardDescription className="text-gray-600 mt-2">{description}</CardDescription>
                </CardHeader>

                {/* Footer with Hover Effects */}
                {status === "PENDING" && (
                    <CardContent className="relative">
                        <div className="flex justify-around items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="relative group">
                                <button className="text-base text-green-600 hover:text-green-800 font-medium font-sans transition-colors duration-200">
                                    Accept
                                </button>
                                <div className="h-0.5 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                            </div>
                            <div className="relative group">
                                <button className="text-base text-red-600 hover:text-red-800 font-medium font-sans transition-colors duration-200">
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
