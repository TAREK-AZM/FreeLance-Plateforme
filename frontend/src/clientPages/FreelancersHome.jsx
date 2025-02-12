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

  // Zustand store
  const freelancers = useFreelancerStore((state) => state.freelancers);
  const setFreelancers = useFreelancerStore((state) => state.setFreelancers);

  // Fetch freelancers from API
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const freelancersFake = [ {
          name: "Francesco",
          role: "Mobile App Maintenance and Optimization Specialist with Expertise in Cross-Platform Development, Bug Fixing, and Performance Enhancement for E-commerce Applications",
          rating: 5.0,
          reviews: 1,
          projects: 3,
          rate: 26.0,
          skills: ["E-commerce", "Shopify", "UX/UI"],
          image: "https://demo.yo-gigs.com/image/show/4/7/MEDIUM",
        }]
        setFreelancers(freelancersFake); // Update Zustand store

        const token = localStorage.getItem("token"); // Retrieve token
        const response = await axios.get(`${BASE_URL}/freelancers`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authentication
          },
        });
       
        console.log("✅ Fetched Freelancers:", response.data);

        if (response.status === 200) {
          // const freelancersFake = [ {
          //   name: "Francesco",
          //   role: "Mobile App Maintenance and Optimization Specialist with Expertise in Cross-Platform Development, Bug Fixing, and Performance Enhancement for E-commerce Applications",
          //   rating: 5.0,
          //   reviews: 1,
          //   projects: 3,
          //   rate: 26.0,
          //   skills: ["E-commerce", "Shopify", "UX/UI"],
          //   image: "https://demo.yo-gigs.com/image/show/4/7/MEDIUM",
          // },]
          // setFreelancers(freelancersFake); // Update Zustand store
        }
      } catch (error) {
        console.error("❌ Error fetching freelancers:", error);
      }
    };

    fetchFreelancers();
  }, [setFreelancers]); // Run once when component mounts

  // Filter freelancers based on search query
  const filteredFreelancers = freelancers.filter((freelancer) =>
    freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    freelancer.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {activeCategory === "freelancers" && <FreelancerGrid freelancers={filteredFreelancers} />}
        
      </main>
      <Footer />
    </div>
  );
}
