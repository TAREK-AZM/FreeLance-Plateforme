import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import VantaBackground from "@/components/VantaBackground";
import axios from "axios";

const SignUpPage = () => {
    const [activeForm, setActiveForm] = useState("client");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        businessName: "",
        description: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset errors

        const role = activeForm === "client" ? "client" : "provider";

        try {
            const response = await axios.post("/api/signup", {
                ...formData,
                role
            });

            if (response.status === 201) {
                navigate("/login"); // Redirect to login after successful sign-up
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Vanta Background with gradient */}
            <VantaBackground color={0x4a90e2} backgroundColor={0xffffff} gradient={true} />

            {/* Glass Effect Card */}
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
                    <form
                        onSubmit={handleSubmit}
                        className={`flex-1 transition-opacity ${
                            activeForm === "client" ? "opacity-100" : "opacity-50 blur-md pointer-events-none"
                        }`}
                    >
                        <h2 className="text-lg font-semibold text-cyan-950 mb-4">Sign Up as Client</h2>
                        <div className="mb-4">
                            <Label htmlFor="name" className="text-cyan-950">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="mt-1 w-full placeholder-gray-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="text-cyan-950">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="mt-1 w-full placeholder-gray-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" className="text-cyan-950">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="mt-1 w-full placeholder-gray-500"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                        <Button type="submit" className="w-full bg-cyan-950 hover:bg-cyan-900 text-gray-100">
                            Sign Up
                        </Button>
                    </form>

                    {/* Service Provider Form */}
                    <form
                        onSubmit={handleSubmit}
                        className={`flex-1 transition-opacity ${
                            activeForm === "provider" ? "opacity-100" : "opacity-50 blur-md pointer-events-none"
                        }`}
                    >
                        <h2 className="text-lg font-semibold text-cyan-950 mb-4">Sign Up as Service Provider</h2>
                        <div className="mb-4">
                            <Label htmlFor="businessName" className="text-cyan-950">Business Name</Label>
                            <Input
                                id="businessName"
                                type="text"
                                value={formData.businessName}
                                onChange={handleChange}
                                placeholder="Enter your business name"
                                className="mt-1 w-full placeholder-gray-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="text-cyan-950">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="mt-1 w-full placeholder-gray-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" className="text-cyan-950">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="mt-1 w-full placeholder-gray-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="description" className="text-cyan-950">Business Description</Label>
                            <Input
                                id="description"
                                type="text"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your business"
                                className="mt-1 w-full placeholder-gray-500"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                        <Button type="submit" className="w-full bg-cyan-950 hover:bg-cyan-900 text-gray-100">
                            Sign Up
                        </Button>
                    </form>
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
