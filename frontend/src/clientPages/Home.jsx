import Header from '../components/clientComponents/header';
import Hero from '../components/clientComponents/hero';
import JobCategories from '../components/clientComponents/job-categories';
import Features from '../components/clientComponents/features';
import BusinessSection from '../components/clientComponents/business-section';
import Footer from '../components/clientComponents/footer';
import Freelancers from "../components/clientComponents/freelancers"
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Hero />
            <JobCategories />
            <Features />
            <Freelancers />
            <BusinessSection />
          </main>
          <Footer />
        </div>
  );
}