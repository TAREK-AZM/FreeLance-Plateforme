
import { useState } from "react";
import Header from "../components/clientComponents/header";
import Footer from "../components/clientComponents/footer";
import FreelancerDetails from "../components/clientComponents/Freelancer-Details";
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
      <FreelancerDetails />
    </main>
    <Footer />
  </div>
  );
}
