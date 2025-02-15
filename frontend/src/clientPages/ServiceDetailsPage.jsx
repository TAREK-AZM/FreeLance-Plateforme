
import { useState } from "react";
import Header from "../components/clientComponents/header";
import Footer from "../components/clientComponents/footer";
import ServiceDetails from "../components/clientComponents/service-details";
import { useFreelancerStore } from "../store/store";

export default function ServiceDetailsPage() {
  

  return (
    <div className="min-h-screen bg-white">
    <Header />
    <main>
      <ServiceDetails />
    </main>
    <Footer />
  </div>
  );
}
