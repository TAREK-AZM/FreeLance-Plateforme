import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivateAccount() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleActivate = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.post(`${import.meta.env.VITE_API2}/api/auth/activate`, {
                code,
            });
            if (response.status === 200) {
                navigate("/login");
            }
        } catch (err) {
            setError("Invalid or expired activation code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="shadow-xl rounded-2xl">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold text-center mb-4">Activate Your Account</h2>
                        <p className="text-sm text-gray-600 mb-4 text-center">
                            Enter the activation code sent to your email
                        </p>
                        <Input
                            type="text"
                            placeholder="Enter activation code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="mb-4"
                        />
                        {error && (
                            <div className="flex items-center text-red-600 text-sm mb-4">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                {error}
                            </div>
                        )}
                        <Button
                            className="w-full"
                            onClick={handleActivate}
                            disabled={loading || !code.trim()}
                        >
                            {loading ? "Activating..." : "Activate"}
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
