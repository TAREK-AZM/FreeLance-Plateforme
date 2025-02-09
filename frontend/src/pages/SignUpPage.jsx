import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import VantaBackground from "@/components/VantaBackground";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API2; // Use environment variable for API base URL

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
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle input field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset errors

        const endpoint =
            activeForm === "client"
                ? `${API_BASE_URL}/api/client/register`
                : `${API_BASE_URL}/api/prestataire/register`;

        try {
            const response = await axios.post(endpoint, formData);

            if (response.status === 200) {
                navigate("/login"); // Redirect to login after successful sign-up
            }
        } catch (err) {
            console.error("❌ Registration Error:", err);
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
                            activeForm === "prestataire" ? "text-cyan-950 underline" : "text-gray-400"
                        }`}
                        onClick={() => setActiveForm("prestataire")}
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
                            <div className="mb-4">
                                <Label htmlFor="motDePasse" className="text-cyan-950">Password</Label>
                                <Input id="motDePasse" type="password" value={formData.motDePasse} onChange={handleChange} required />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                            <Button type="submit">Sign Up</Button>
                        </form>
                    )}

                    {/* Service Provider Form */}
                    {activeForm === "prestataire" && (
                        <form onSubmit={handleSubmit} className="flex-1">
                            <h2 className="text-lg font-semibold text-cyan-950 mb-4">Sign Up as Service Provider</h2>
                            {["prenom", "nom", "email", "telephone", "ville", "adresse"].map((field) => (
                                <div className="mb-4" key={field}>
                                    <Label htmlFor={field} className="text-cyan-950">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                                    <Input id={field} type="text" value={formData[field]} onChange={handleChange} required />
                                </div>
                            ))}
                            <div className="mb-4">
                                <Label htmlFor="motDePasse" className="text-cyan-950">Password</Label>
                                <Input id="motDePasse" type="password" value={formData.motDePasse} onChange={handleChange} required />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                            <Button type="submit">Sign Up</Button>
                        </form>
                    )}
                </div>
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
