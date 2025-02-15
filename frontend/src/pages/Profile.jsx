import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, X } from "lucide-react";

function Profile() {
    const [providerData, setProviderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [certName, setCertName] = useState("");
    const [certDescription, setCertDescription] = useState("");
    const [certImage, setCertImage] = useState(null);


    const fetchProviderData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${import.meta.env.VITE_API2}/api/prestataire/profil`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProviderData(response.data);
            console.log(response.data);
        } catch (err) {
            console.error("Error fetching provider data:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        fetchProviderData();
    }, []);

    const handleCertSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Certification object
        const certificationData = {
            name: certName,
            description: certDescription,
        };

        // Append certification data as a JSON string
        formData.append("certification", JSON.stringify(certificationData));

        // Append the file
        formData.append("file", certImage);

        try {
            const token = localStorage.getItem("token");
            await axios.post(`${import.meta.env.VITE_API2}/api/prestataire/certification/add`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setShowForm(false);
            setCertName("");
            setCertDescription("");
            setCertImage(null);

        } catch (err) {
            console.error("Error adding certification:", err);
        }
        fetchProviderData()
    };


    if (loading) return <div>Loading profile...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="space-y-6 relative">
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative w-1/3">
                        <button onClick={() => setShowForm(false)} className="absolute top-2 right-2">
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Add Certification</h2>
                        <form onSubmit={handleCertSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Certification Name</label>
                                <input type="text" value={certName} onChange={(e) => setCertName(e.target.value)} className="w-full p-2 border rounded" required />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Description</label>
                                <textarea value={certDescription} onChange={(e) => setCertDescription(e.target.value)} className="w-full p-2 border rounded" required></textarea>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Upload Image</label>
                                <input type="file" onChange={(e) => setCertImage(e.target.files[0])} className="w-full p-2 border rounded" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Submit Certification
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            <Card className="border border-gray-400 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium">First Name</label>
                            <p className="text-sm text-stone-500">{providerData.prenom}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Last Name</label>
                            <p className="text-sm text-stone-500">{providerData.nom}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <p className="text-sm text-stone-500">{providerData.email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Phone</label>
                            <p className="text-sm text-stone-500">{providerData.telephone}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Address</label>
                            <p className="text-sm text-stone-500">{providerData.adresse}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">City</label>
                            <p className="text-sm text-stone-500">{providerData.ville}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>



            <Card className="border border-gray-400 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
                <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        {providerData.certifications.map((cert) => (
                            <Card key={cert.id} className="border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:scale-105">
                                <CardHeader>
                                    <CardTitle className="text-sm">{cert.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <img src={`${import.meta.env.VITE_API2}/api${cert.imageUrl}`} alt={cert.name} className="w-full h-64 object-cover rounded-md" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button onClick={() => setShowForm(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border border-gray-400 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:scale-105">
                <CardHeader>
                    <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {providerData.competences.map((competence) => (
                            <div key={competence.id} className="flex items-center justify-between p-2 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:scale-105 border border-gray-400">
                                <div>
                                    <h4 className="font-medium">{competence.name}</h4>
                                    <p className="text-sm text-stone-500">{competence.description}</p>
                                </div>
                            </div>
                        ))}
                        <Button className="mt-4 w-full">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Profile;
