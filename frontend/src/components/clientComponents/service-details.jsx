import { useEffect, useState, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { MapPin, Star, Check, User, Briefcase } from "lucide-react"
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentForm from "./comment-form"
import { DemandAlert } from "./Alert"
import { se } from "date-fns/locale";


const API_BASE_URL = import.meta.env.VITE_API2; // API Base URL from environment variables

export default function ServiceDetails() {
    const { id } = useParams()
    const [service, setService] = useState(null)
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); const [combinedData, setCombinedData] = useState([]); // Combined comments and evaluations


    const fetchService = useCallback(async (serviceId) => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token
            const response = await axios.get(`${API_BASE_URL}/api/client/service/${serviceId}/serviceDetails`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token for authentication
                },
            });

            if (response.status === 200) {
                console.log("✅ Fetched Service:", response.data);
                setService(response.data); // Update state with real API data
            } else {
                console.warn("⚠️ API returned unexpected response:", response);
            }
        } catch (error) {
            console.error("❌ Error fetching service:", error);
        }
    }, []);

    // Fetch comments and evaluations, then combine them
    const fetchAndCombineData = useCallback(async (serviceId) => {
        try {
            const token = localStorage.getItem("token");

            // Fetch comments
            const commentsResponse = await axios.get(`${API_BASE_URL}/api/client/services/${serviceId}/commentaires`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Fetch evaluations (stars)
            const evaluationsResponse = await axios.get(`${API_BASE_URL}/api/client/services/${serviceId}/evaluations`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (commentsResponse.status === 200 && evaluationsResponse.status === 200) {
                const comments = commentsResponse.data;
                const evaluations = evaluationsResponse.data;

                // Combine comments and evaluations by client ID
                const combined = comments.map(comment => {
                    const evaluation = evaluations.find(e => e.client.id === comment.client.id);
                    return {
                        client: comment.client,
                        comment: comment.content,
                        datePosted: comment.datePosted,
                        stars: evaluation ? evaluation?.etoiles : null, // Add stars if evaluation exists
                    };
                });

                setCombinedData(combined); // Update state with combined data
            }
        } catch (error) {
            console.error("Error fetching or combining data:", error);
        }
    }, []);

    const onSubmit = async ({ comment }) => {
        // Update comments as an array
        setComments((prev) => [...prev, comment]);
    };

    const handelDommanderService = useCallback(async (serviceId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${API_BASE_URL}/api/client/services/${id}/demandes`,
                {}, // Empty body or add request data here
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.status === 200) {
                console.log("✅ Service demanded: ", response.data);
                setShowConfirmAlert(false); // Hide confirm alert
                setShowSuccessAlert(true); // Show success alert
            }
        } catch (error) {
            console.error("❌ Error handling service: ", error);
            throw error; // Rethrow to handle in the calling function
        }
    }, []);

    // Fetch data on component mount
    useEffect(() => {
        fetchService(id);
        fetchAndCombineData(id);
    }, [id, fetchService, fetchAndCombineData]);

    console.log("🚀 ~ file: service-details.jsx ~ line 101 ~ useEffect ~ combinedData", combinedData);
    console.log("🚀🚀🚀🚀🚀 ~ service: ", service);
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <DemandAlert
                isOpen={showConfirmAlert}
                onClose={() => setShowConfirmAlert(false)}
                onConfirm={handelDommanderService}
                message="Are you sure you want to request this service?"
                butonsDesable={false}
            />

            {/* Success Alert */}
            <DemandAlert
                isOpen={showSuccessAlert}
                onClose={() => setShowSuccessAlert(false)}
                message="La demande a bien été envoyée"
                butonsDesable={true}
            />

            <div className="mx-auto max-w-6xl">
                {/* Header */}




                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    {service?.titre && (
                        <h1 className="text-3xl font-bold text-[#12AE65] mb-6 pb-4 border-b-2 border-[#12AE65]">
                            <Briefcase className="inline-block mr-2 h-8 w-8 mb-1" />
                            {service?.titre}
                        </h1>
                    )}
                    <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20 border-4 border-[#12AE65]">
                            {service?.prestataire.imageUrl ? (
                                <AvatarImage src={API_BASE_URL + "/api" + service?.prestataire.imageUrl} alt={service?.prestataire.prenom || "Service provider"} />
                            ) : (
                                <AvatarFallback className="text-2xl font-bold text-[#12AE65] bg-[#E6F9EF]">
                                    {service?.prestataire.prenom ? service?.prestataire.prenom[0] : "?"}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Posted by: <span className="text-[#12AE65]">{service?.prestataire.prenom || "Unknown"}</span>
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-3 text-sm text-gray-600">
                                {service?.prestataire.ville && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-[#12AE65]" />
                                        <span>{service?.prestataire.ville}</span>
                                    </div>
                                )}
                                {service?.prestataire.adresse && (
                                    <div className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-[#12AE65]" />
                                        <span>{service?.prestataire.adresse}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
                    {/* Main content */}
                    <div className="space-y-4 ">

                        <section className="w-full h-[400px] overflow-hidden border border-2 rounded-lg">
                            <img
                                src={API_BASE_URL + "/api" + service?.image || "/placeholder.svg"}
                                alt="Development"
                                width={800}
                                height={300}
                                className="rounded-lg w-full h-full object-cover"
                            />
                        </section>


                        <section>
                            <h2 className="mb-4 text-2xl font-semibold">About The Service</h2>
                            <p className="text-muted-foreground">{service?.description}</p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold">Categories</h2>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-green-50 text-green-700">
                                    {service?.category?.name}
                                </Badge>

                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-semibold">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {service?.prestataire?.competences?.map((competence) => (
                                    <Badge key={competence.id} variant="secondary" className="bg-green-50 text-green-700">
                                        {competence.nom}
                                    </Badge>
                                ))}
                            </div>
                        </section>


                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 h-fit">
                        <Card className="p-6  ">
                            {/* defaultValue={data.pricing.defaultTier} */}
                            <Tabs className="mb-6">

                                <TabsContent key={combinedData?.client?.prenom.toLowerCase()} >
                                    <h3 className="mb-4 font-bold text-4xl text-[#12A365] ">Service Info</h3>
                                    <div className="mb-6">
                                        <div className="text-3xl font-bold">$ {service?.prix.toFixed(2)}</div>
                                    </div>

                                    <div className="space-y-4 mb-4">

                                        <div className="flex justify-between py-2">
                                            <span className="text-2xl font-medium">Total Revision</span>
                                            <span className="text-2xl font-medium">{combinedData?.length}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => setShowConfirmAlert(true)}
                                        className="w-full bg-green-500 hover:bg-green-600"
                                    >
                                        Domander Service
                                    </Button>
                                </TabsContent>
                                {/* ))} */}

                            </Tabs>


                        </Card>


                    </div>
                </div>
            </div>

            <div className="mt-8 space-y-4">
                {/* Feedback Section */}
                <Card className="mt-8 p-6">
                    <h2 className="text-2xl font-bold mb-6">Feedback received (by clients)</h2>

                    {/* Recent Reviews */}

                    <div className="mt-8 space-y-4">
                        {combinedData?.map((feedback, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="font-medium">{feedback?.client?.prenom}</div>
                                    <div className="flex items-center text-[#FFA500]">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < (feedback?.stars || 0) ? "fill-current" : "fill-gray-200"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700">{feedback?.comment}</p>
                            </div>
                        ))}
                    </div>
                </Card>


                {/* Comment Form */}
                <CommentForm onSubmit={onSubmit} serviceId={id} />
                {/*  Add your CommentForm component here */}
            </div>
        </div>
    );

}


