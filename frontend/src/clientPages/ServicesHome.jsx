
import { useState } from "react";
import Header from "../components/clientComponents/header";
import Hero from "../components/clientComponents/jobs-hero";
import ServicesGrid from "../components/clientComponents/services-grid";
import Footer from "../components/clientComponents/footer";
import { useServiceStore } from "../store/store";

export default function FreelancersHome() {
  const [activeCategory, setActiveCategory] = useState("services"); // Default category
  const [searchQuery, setSearchQuery] = useState("");

  // Zustand data
//   const freelancers = useFreelancerStore((state) => state.freelancers);
//   const jobs = useJobPostStore((state) => state.jobPosts);
  const services = useServiceStore((state) => state.services);

  // Filter results based on search query


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
