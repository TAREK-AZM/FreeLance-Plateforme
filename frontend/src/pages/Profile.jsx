import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil } from "lucide-react";

function Profile() {
    const [providerData, setProviderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API}/providerData`); // Replace with your API URL
                setProviderData(response.data);
            } catch (err) {
                console.error("Error fetching provider data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProviderData();
    }, []); // Runs only once after the component mounts

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="space-y-6">
            {/* Personal Information */}
            <Card className="border border-gray-400 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <p className="text-sm text-stone-500">{providerData.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <p className="text-sm text-stone-500">{providerData.email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Phone</label>
                            <p className="text-sm text-stone-500">{providerData.phone}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Verification Status</label>
                            <Badge variant={providerData.isVerified ? "default" : "secondary"}>
                                {providerData.isVerified ? "Verified" : "Unverified"}
                            </Badge>
                        </div>
                    </div>
                    <Button variant="outline" className="transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105">
                        <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                    </Button>
                </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border border-gray-400 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
                <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {providerData.certifications.map((cert) => (
                            <Card
                                key={cert.id}
                                className="border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:scale-105"
                            >
                                <CardHeader>
                                    <CardTitle className="text-sm">{cert.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={`${import.meta.env.VITE_FRONTEND}${cert.img}`}
                                        alt={cert.title}
                                        className="w-full h-64 object-cover rounded-md"
                                    />
                                </CardContent>
                            </Card>
                        ))}
                        <Card className="flex items-center justify-center min-h-[200px] border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:scale-105">
                            <Button variant="outline" className="transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105 border border-gray-400">
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
                            </Button>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border border-gray-400 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
                <CardHeader>
                    <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {providerData.skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="flex items-center justify-between p-2 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:scale-105 border border-gray-400"
                            >
                                <div>
                                    <h4 className="font-medium">{skill.title}</h4>
                                    <p className="text-sm text-stone-500">{skill.description}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105">
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-105 border border-gray-400">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Profile;
