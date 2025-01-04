import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VantaBackground from "@/components/VantaBackground";

const SignUpPage = () => {
    const [activeForm, setActiveForm] = useState("client");

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

                {/* Forms */}
                <div className="flex space-x-6">
                    {/* Client Form */}
                    <form
                        className={`flex-1 transition-opacity ${
                            activeForm === "client" ? "opacity-100" : "opacity-50 blur-md"
                        }`}
                    >
                        <h2 className="text-lg font-semibold text-cyan-950 mb-4">Sign Up as Client</h2>
                        <div className="mb-4">
                            <Label htmlFor="name" className="text-cyan-950">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                className="mt-1 w-full placeholder-gray-500"
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="text-cyan-950">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 w-full placeholder-gray-500"
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" className="text-cyan-950">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="mt-1 w-full placeholder-gray-500"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-cyan-950 hover:bg-cyan-900 text-gray-100">
                            Sign Up
                        </Button>
                    </form>

                    {/* Service Provider Form */}
                    <form
                        className={`flex-1 transition-opacity ${
                            activeForm === "provider" ? "opacity-100" : "opacity-50 blur-md"
                        }`}
                    >
                        <h2 className="text-lg font-semibold text-cyan-950 mb-4">Sign Up as Service Provider</h2>
                        <div className="mb-4">
                            <Label htmlFor="businessName" className="text-cyan-950">Business Name</Label>
                            <Input
                                id="businessName"
                                type="text"
                                placeholder="Enter your business name"
                                className="mt-1 w-full placeholder-gray-500"
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="email" className="text-cyan-950">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 w-full placeholder-gray-500"
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="password" className="text-cyan-950">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="mt-1 w-full placeholder-gray-500"
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="description" className="text-cyan-950">Business Description</Label>
                            <Input
                                id="description"
                                type="text"
                                placeholder="Describe your business"
                                className="mt-1 w-full placeholder-gray-500"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-cyan-950 hover:bg-cyan-900 text-gray-100">
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
