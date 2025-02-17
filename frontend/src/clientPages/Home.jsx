import { useState, useEffect } from "react";
import Header from '../components/clientComponents/header';
import Hero from '../components/clientComponents/hero';
import JobCategories from '../components/clientComponents/job-categories';
import Features from '../components/clientComponents/features';
import BusinessSection from '../components/clientComponents/business-section';
import Footer from '../components/clientComponents/footer';
import Freelancers from "../components/clientComponents/freelancers-section"
import { useSearchStore } from "../store/store";
import axios from "axios";



export default function Home() {
  // 1. Destructure the query and setQuery from the store
  const { query, setQuery } = useSearchStore();

  // 2. Debug: see the current query from the store
  console.log("The current query in the store is: ", query);

  // 3. Pass it down to Hero as props
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero
          // Pass the store’s query value
          searchQuery={query}
          // Pass the store’s setter
          setSearchQuery={setQuery}
        />
        <JobCategories />
        <Features />
        <Freelancers />
        <BusinessSection />
      </main>
      <Footer />
    </div>
  );
}