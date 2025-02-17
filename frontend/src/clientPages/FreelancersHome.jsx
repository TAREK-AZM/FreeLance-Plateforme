import { useState, useEffect } from "react";
import Header from "../components/clientComponents/header";
import Hero from "../components/clientComponents/freelancers-hero";
import FreelancerGrid from "../components/clientComponents/freelancers-grid";
import Footer from "../components/clientComponents/footer";
import { useFreelancerStore } from "../store/store";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API2; // Environment variable for API base URL

export default function FreelancersHome() {
  const [activeCategory, setActiveCategory] = useState("freelancers"); // Default category
  const [searchQuery, setSearchQuery] = useState("");
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const FetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token
        console.log("🔑🔑🔑🔑 Using Token:🔑🔑", token);

        const response = await axios.get(`${BASE_URL}/api/prestataire/all`, {
          headers: {
            Authorization: `${token}`, // Attach token in Authorization header
          },
        });

        console.log("✅ freelancers fetched:", response.data);
        setFreelancers(response.data); // Store services in Zustand
      } catch (error) {
        console.error("❌ Error fetching services:", error);
      }
    };

    FetchFreelancers(); // Call the fetch function when component mounts
  }, []);


  // Filter freelancers based on search query
  // const filteredFreelancers = freelancers.filter((freelancer) =>
  //   freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   freelancer.role.toLowerCase().includes(searchQuery.toLowerCase())
  // );


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

        {/* Dynamic Section Rendering */}
        {activeCategory === "freelancers" && <FreelancerGrid freelancers={freelancers} />}
        
      </main>
      <Footer />
    </div>
  );
}
