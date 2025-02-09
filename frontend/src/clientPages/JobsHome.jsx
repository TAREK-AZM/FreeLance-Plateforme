
import { useState } from "react";
import Header from "../components/clientComponents/header";
import Hero from "../components/clientComponents/jobs-hero";
import JobsGrid from "../components/clientComponents/jobs-grid";
import Footer from "../components/clientComponents/footer";
// import { useFreelancerStore } from "../store/store";

export default function FreelancersHome() {
  const [activeCategory, setActiveCategory] = useState("jobs"); // Default category
  const [searchQuery, setSearchQuery] = useState("");

  // Zustand data
//   const freelancers = useFreelancerStore((state) => state.freelancers);
//   const jobs = useJobPostStore((state) => state.jobPosts);
  // const services = useServiceStore((state) => state.services);

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

        {/* Dynamic Section Rendering */}
        {activeCategory === "jobs" && <JobsGrid  />}
        {/* {activeCategory === "jobs" && <JobsGrid  />}
        {activeCategory === "services" && <ServiceGrid  />} */}
      </main>
      <Footer />
    </div>
  );
}
