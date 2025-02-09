import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import VantaBackground from "@/components/VantaBackground";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API; // Use environment variable for API base URL

const SignUpPage = () => {
    const [activeForm, setActiveForm] = useState("client");
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        motDePasse: "",
        ville: "",
        adresse: "",
        // description: "",
        // imageFile: null // Store the selected image file
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // const handleFileChange = (e) => {
    //     setFormData({ ...formData, imageFile: e.target.files[0] }); // Store the selected file
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset errors

        const endpoint = activeForm === "client"
            ? `${API_BASE_URL}/api/client/register`
            : `${API_BASE_URL}/api/prestataire/register`;

        try {
            let response;

            if (activeForm === "provider") {
                // Use FormData for file uploads
                const formDataToSend = new FormData();
                formDataToSend.append("prenom", formData.prenom);
                formDataToSend.append("nom", formData.nom);
                formDataToSend.append("email", formData.email);
                formDataToSend.append("telephone", formData.telephone);
                formDataToSend.append("motDePasse", formData.motDePasse);
                formDataToSend.append("ville", formData.ville);
                formDataToSend.append("adresse", formData.adresse);
                // formDataToSend.append("description", formData.description);
                // if (formData.imageFile) {
                //     formDataToSend.append("imageUrl", formData.imageFile);
                // }

                response = await axios.post(endpoint, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                // Send JSON request for clients
                const requestData = { ...formData };
                // delete requestData.imageFile; // Remove file field for clients

                response = await axios.post(endpoint, requestData);
            }

            if (response.status === 200) {
                navigate("/"); // Redirect to login after successful sign-up
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <VantaBackground color={0x4a90e2} backgroundColor={0xffffff} gradient={true} />

            <div className="relative bg-white/20 backdrop-blur-md shadow-xl rounded-lg p-8 w-full max-w-4xl">
                <h1 className="text-3xl font-extrabold text-center mb-6">
                    <span className="text-cyan-950">FreeLance</span>
                </h1>

                {/* Tab Navigation */}
                <div className="flex justify-center space-x-8 mb-6">
                    <div
                        className={`flex items-center gap-2 text-lg font-medium cursor-pointer ${
                            activeForm === "client" ? "text-cyan-950 underline" : "text-gray-400"
                        }`}
                        onClick={() => setActiveForm("client")}
                    >
                        <ChevronLeft size={18} />
                        Client
                    </div>
                    <div
                        className={`flex items-center gap-2 text-lg font-medium cursor-pointer ${
                            activeForm === "provider" ? "text-cyan-950 underline" : "text-gray-400"
                        }`}
                        onClick={() => setActiveForm("provider")}
                    >
                        Service Provider
                        <ChevronRight size={18} />
                    </div>
                </div>

                {/* Forms Container */}
                <div className="flex space-x-6">
                    {/* Client Form */}
                    {activeForm === "client" && (
                        <form onSubmit={handleSubmit} className="flex-1">
                            <h2 className="text-lg font-semibold text-cyan-950 mb-4">Sign Up as Client</h2>
                            {["prenom", "nom", "email", "telephone", "ville", "adresse"].map((field) => (
                                <div className="mb-4" key={field}>
                                    <Label htmlFor={field} className="text-cyan-950">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input id={field} type="text" value={formData[field]} onChange={handleChange} required />
                                </div>
                            ))}
                            {/* Password Field (Hidden) */}
                            <div className="mb-4">
                                <Label htmlFor="motDePasse" className="text-cyan-950">Password</Label>
                                <Input id="motDePasse" type="password" value={formData.motDePasse} onChange={handleChange} required />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                            <Button type="submit">Sign Up</Button>
                        </form>
                    )}

                    {/* Service Provider Form */}
                    {activeForm === "provider" && (
                        <form onSubmit={handleSubmit} className="flex-1" encType="multipart/form-data">
                            <h2 className="text-lg font-semibold text-cyan-950 mb-4">Sign Up as Service Provider</h2>
                            {["prenom", "nom", "email", "telephone", "ville", "adresse"].map((field) => (
                                <div className="mb-4" key={field}>
                                    <Label htmlFor={field} className="text-cyan-950">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input id={field} type="text" value={formData[field]} onChange={handleChange} required />
                                </div>
                            ))}
                            {/* Password Field (Hidden) */}
                            <div className="mb-4">
                                <Label htmlFor="motDePasse" className="text-cyan-950">Password</Label>
                                <Input id="motDePasse" type="password" value={formData.motDePasse} onChange={handleChange} required />
                            </div>
                            {/*<div className="mb-4">*/}
                            {/*    <Label htmlFor="imageFile" className="text-cyan-950">Upload Business Image</Label>*/}
                            {/*    <Input id="imageFile" type="file" onChange={handleFileChange} required />*/}
                            {/*</div>*/}
                            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                            <Button type="submit">Sign Up</Button>
                        </form>
                    )}
                </div>
                {/* Already have an account? */}
                <p className="text-sm text-center text-slate-700 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
