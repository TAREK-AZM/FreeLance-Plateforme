
import { useState } from "react";
import Header from "../components/clientComponents/header";
import Hero from "../components/clientComponents/freelancers-hero";
import FreelancerGrid from "../components/clientComponents/freelancers-grid";
import Footer from "../components/clientComponents/footer";
import { useFreelancerStore } from "../store/store";

export default function FreelancersHome() {
  const [activeCategory, setActiveCategory] = useState("freelancers"); // Default category
  const [searchQuery, setSearchQuery] = useState("");

  // Zustand data
  const freelancers = useFreelancerStore((state) => state.freelancers);
  // const jobs = useJobPostStore((state) => state.jobPosts);
  // const services = useServiceStore((state) => state.services);

  // Filter results based on search query
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
        {/* {activeCategory === "jobs" && <JobsGrid  />}
        {activeCategory === "services" && <ServiceGrid  />} */}
      </main>
      <Footer />
    </div>
  );
}
