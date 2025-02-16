import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import VantaBackground from "@/components/VantaBackground";
import AuthContext from "../context/AuthContext"; // Import Auth Context

const API_BASE_URL = import.meta.env.VITE_API2; // Use environment variable for API base URL

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset errors

        console.log("🔵 Attempting login with:", { email, password });
        console.log("🔵 API Endpoint:", `${API_BASE_URL}/api/auth/login`);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                email,
                password: password, // Ensure backend expects "motDePasse" instead of "password"
            });
            console.log("✅ this is the reponse:", response);

            console.log("✅ Response Status:", response.status);
            console.log("✅ Response Data:", response.data);

            if (response.status === 200 && response.data.refreshToken && response.data.role) {
                console.log("🔑 Token Received:", response.data.refreshToken);
            
                // ✅ Store the access token correctly in localStorage
                localStorage.setItem("token", response.data.refreshToken);
            
                console.log("👤 User Role:", response.data.role);
            
                login(response.data.refreshToken, response.data.role); // Save to AuthContext
            
                // ✅ Navigate based on user role
                if (response.data.role === "PRESTATAIRE") {
                    navigate("/prestataires");
                } else {
                    navigate("/");
                }
            } else {
                console.warn("⚠️ Unexpected Response Data:", response.data);
                setError("Invalid credentials");
            }
        } catch (err) {
            console.error("❌ Login Request Failed:", err);
            console.error("❌ Error Response:", err.response);

            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <VantaBackground color={0x4a90e2} backgroundColor={0xffffff} gradient={true} />

            {/* Glass Effect Card */}
            <div className="relative bg-white/20 backdrop-blur-md shadow-xl rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-6">
                    <span className="text-cyan-950">FreeLance</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label htmlFor="email" className="text-cyan-950">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1 w-full placeholder-gray-500"
                            required
                        />
                    </div>
                    <div className="mb-4 text-right">
                        <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
                    <Button
                        type="submit"
                        className="w-full bg-cyan-950 hover:bg-cyan-900 text-gray-100"
                    >
                        Sign In
                    </Button>
                </form>
                <p className="text-sm text-center text-slate-700 mt-6">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Register for free
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
