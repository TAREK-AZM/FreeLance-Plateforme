import Header from "./components/header"
import Hero from "./components/hero"
import JobCategories from "./components/job-categories"
import Features from "./components/features"
import BusinessSection from "./components/business-section"
import Footer from "./components/footer"
import Freelancers from "./components/freelancers"

function App() {
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
  )
}

export default App

