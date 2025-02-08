"use client";

import { useState } from "react";
import { Grid, List, ArrowLeft, ArrowRight, ArrowUpDown } from "lucide-react";
import cn from "classnames";
import FreelancerCard from "./FreelancerCard";

// Define the Freelancer Type
interface Freelancer {
  name: string;
  location: string;
  role: string;
  rating: number;
  reviews: number;
  projects: number;
  rate: number;
  skills: string[];
  image: string;
  description: string;
}

// Props for FreelancerGrid
interface FreelancerGridProps {
  freelancers: Freelancer[];
}

export default function FreelancerGrid({ freelancers }: FreelancerGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true); // Default: Grid View
  const itemsPerPage = 6;
  const totalPages = Math.ceil(freelancers.length / itemsPerPage);

  const currentFreelancers = freelancers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-4 lg:px-24 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">
            Found {freelancers.length} Professional talents
          </h2>

          {/* Sort & View Toggle Buttons */}
          <div className="flex items-center gap-4">
            {/* Sort Button */}
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg bg-gray-100">
              <ArrowUpDown className="h-5 w-5" />
              <span>Sort by newest</span>
            </button>

            {/* Grid/List View Toggle */}
            <div className="flex items-center gap-2 border-l pl-4">
              <button
                onClick={() => setIsGridView(false)}
                className={cn(
                  "p-1.5 rounded hidden lg:block",
                  !isGridView ? "bg-green-100" : "hover:bg-gray-100"
                )}
              >
                <List className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsGridView(true)}
                className={cn(
                  "p-1.5 rounded",
                  isGridView ? "bg-green-100" : "hover:bg-gray-100"
                )}
              >
                <Grid className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* FREELANCER GRID / LIST VIEW */}
        <div
          className={cn(
            "grid gap-6",
            isGridView ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}
        >
          {currentFreelancers.map((freelancer, index) => (
            <FreelancerCard key={index} freelancer={freelancer} isListView={!isGridView} />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "px-4 py-2 rounded-lg",
                currentPage === page
                  ? "bg-[#12AE65] text-white"
                  : "border hover:bg-gray-50"
              )}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 flex items-center"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
