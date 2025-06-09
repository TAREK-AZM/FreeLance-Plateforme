
import { useState, useEffect } from "react";
import { Grid, List, ArrowLeft, ArrowRight, ArrowUpDown } from "lucide-react";
import cn from "classnames";
import ServiceCard from "./ServiceCard";
import { useServiceStore ,useSearchStore} from "../../store/store";
import axios from "axios";



export default function ServiceGrid() {

  const {services, setServices} = useServiceStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridView, setIsGridView] = useState(true);
  const itemsPerPage = 50;
  const totalPages = Math.ceil(services.length / itemsPerPage);


/// Ai will overides the existing data
// Define the Service Type
const { query } = useSearchStore(); // <-- get the global search query


// useEffect(() => {
// if(query.length > 0){
//   const fetchAndFilter = async () => {

//     try {
//       const token = localStorage.getItem("token"); // Get the token
//       console.log("🔑🔑🔑🔑 Using Token:🔑🔑", token);

//       const response1 = await axios.post(`${import.meta.env.VITE_API2}/api/ai/search`,
//         {
//           "prompt": query,
//         }
//         , {
//         headers: {
//           Authorization: `Bearer ${token}`, // Attach token in Authorization header
//         },
//       });

//       if (response1.status === 200) {
//         console.log("✅✅✅ services fetched By the AI ✅✅✅:", response1.data);
//         setServices(response1.data); // Store services in Zustand
//       }
      
//     }catch (error) {
//       console.error(error);
//       }
//   };
// }
//   fetchAndFilter();
// }, [query,setServices]);

useEffect(() => {
  // Only run AI search when query is not empty
  if (query) {
    const fetchAndFilter = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token
        console.log("🔑🔑🔑🔑 Using Token:🔑🔑", token);

        // AI search
        const response1 = await axios.post(
          `${import.meta.env.VITE_API2}/api/ai/search`,
          { "prompt": query },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response1.status === 200) {
          console.log("✅✅✅ services fetched by AI ✅✅✅:", response1.data);
          
          // Replace existing services with the AI results
          setServices(response1.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndFilter();
  }
}, [query, setServices]); // Depend on query to trigger AI search

  const currentServices = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );



  return (
    <div className="px-4 lg:px-24 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">Found {services.length} Services</h2>

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

        {/* SERVICE GRID / LIST VIEW */}
        <div
          className={cn(
            "grid gap-6",
            isGridView ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}
        >
          {currentServices.map((service, index) => (
            <ServiceCard key={index} service={service} />
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
