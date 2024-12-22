import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavigationTabs from "./components/NavigationTabs";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Requests from "./pages/Requests";
import JobBoard from "./pages/JobBoard";
import Profile from "./pages/Profile";

function App() {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-stone-100">
                {/* Sticky Header and NavigationTabs */}
                <div className="sticky top-0 z-50">
                    <Header name={'Abdelwahid Abbad'} email={'abdelwahid@gmail.com'}/>

                </div>
                <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {/* Main Content */}
                <main className="flex-grow container mx-auto py-6 px-4">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/requests" element={<Requests />} />
                        <Route path="/jobboard" element={<JobBoard />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
