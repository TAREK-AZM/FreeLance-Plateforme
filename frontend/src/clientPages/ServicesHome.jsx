
import { useState, useEffect} from "react";
import Header from "../components/clientComponents/header";
import Hero from "../components/clientComponents/jobs-hero";
import ServicesGrid from "../components/clientComponents/services-grid";
import Footer from "../components/clientComponents/footer";
import { useServiceStore } from "../store/store";
import axios from "axios";
export default function FreelancersHome() {
  const [activeCategory, setActiveCategory] = useState("services"); // Default category
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API2; // API Base URL from environment variables

  // Zustand data

const setServices = useServiceStore((state) => state.setServices);
  const services = useServiceStore((state) => state.services);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token
        console.log("🔑🔑🔑🔑 Using Token:🔑🔑", token);

        const response = await axios.get(`${API_BASE_URL}/api/client/services/all`, {
          headers: {
            Authorization: `${token}`, // Attach token in Authorization header
          },
        });

        console.log("✅ Services fetched:", response.data);
        setServices(response.data); // Store services in Zustand
      } catch (error) {
        console.error("❌ Error fetching services:", error);
      }
    };

    fetchServices(); // Call the fetch function when component mounts
  }, [setServices]);


  // Filter results based on search query

  console.log(services)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
    
        {activeCategory === "services" && <ServicesGrid services={services} />} 
      </main>
      <Footer />
    </div>
  );
}
