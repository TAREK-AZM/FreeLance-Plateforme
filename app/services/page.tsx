"use client";

import { useState } from "react";
import Header from "../../components/header";
import Hero from "../../components/services-hero";
import FreelancerGrid from "../../components/freelancers-grid";
import JobsGrid from "../../components/jobs-grid";
import ServiceGrid from "../../components/ServiceGrid";
import Footer from "../../components/footer";
import { useFreelancerStore, useJobPostStore, useServiceStore } from "../../store/store";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("services"); // Default category
  const [searchQuery, setSearchQuery] = useState("");

  // Zustand data
  const freelancers = useFreelancerStore((state) => state.freelancers);
  const jobs = useJobPostStore((state) => state.jobPosts);
  const services = useServiceStore((state) => state.services);

  // Filter results based on search query
  const filteredFreelancers = freelancers.filter((freelancer) =>
    freelancer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    freelancer.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        {activeCategory === "jobs" && <JobsGrid  />}
        {activeCategory === "services" && <ServiceGrid  />}
      </main>
      <Footer />
    </div>
  );
}
