
import { Search } from "lucide-react";


export default function Hero({ activeCategory, setActiveCategory, searchQuery, setSearchQuery }) {
  return (
    <div className="px-12 py:10 lg:py-24 md:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl font-bold text-[#12AE65] md:ml-12 mb-2">Find professional talents</h1>
      <p className="text-xl text-gray-900 md:ml-12 mb-8">We have 150+ Professional talents from all over the world</p>

      {/* Search Bar */}
      <div className="relative flex items-center w-full max-w-6xl mx-auto rounded-[12px] lg:rounded-full border border-gray-900 lg:border-gray-300 overflow-hidden">
        <div className="flex-shrink-0 pl-5">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow py-4 px-4 focus:outline-none rounded-l-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* removed for now to navigate inside each page from other page */}
        {/* <div className="hidden lg:inline-flex flex items-center gap-4 px-4">
          <button
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeCategory === "jobs"
                ? "bg-[#12AE65] text-white font-bold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory("jobs")}
          >
            Jobs
          </button>
          <button
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeCategory === "freelancers"
                ? "bg-[#12AE65] text-white font-bold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory("freelancers")}
          >
            Freelancers
          </button>
          <button
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeCategory === "service-packages"
                ? "bg-[#12AE65] text-white font-bold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveCategory("service-packages")}
          >
            Service Packages
          </button>
        </div> */}
      </div>

      {/* Filters Section */}
      <div className="mt-8 lg:ml-12 flex flex-wrap gap-4">
        {["Categories", "Talent Details", "Hourly Rate", "Position", "Highest Education"].map((filter) => (
          <button
            key={filter}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            {filter}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
 