import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import VantaBackground from "@/components/VantaBackground";

const LoginPage = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            {/* Vanta Background with gradient */}
            <VantaBackground color={0x4a90e2} backgroundColor={0xffffff} gradient={true} />

            {/* Glass Effect Card */}
            <div className="relative bg-white/20 backdrop-blur-md shadow-xl rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-extrabold text-center mb-6">
                    <span className="text-cyan-950">FreeLance</span>

                </h1>
                <form>
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
                    <div className="mb-4 text-right">
                        <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>
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
