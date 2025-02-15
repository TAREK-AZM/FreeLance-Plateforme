import { useState, useEffect } from "react";
import JobCard  from "./Job-Card"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import axios from "axios";
// Sample job data
const jobs = [
  {
    id: 1,
    category: "Development & IT Services",
    title: "I need a 2D Dress-Up Game Created for web browser with an Custom theme.",
    date: "Jun 04, 2024",
    views: 2,
    price: 43.0,
    type: "Fixed-price" ,
    taskType: "Task" ,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    category: "Development & IT Services",
    title: "I need a 2D Dress-Up Game Created for web browser with an Custom theme.",
    date: "Jun 04, 2024",
    views: 2,
    price: 43.0,
    type: "Fixed-price" ,
    taskType: "Task" ,
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: 3,
    category: "Development & IT Services",
    title: "I need a 2D Dress-Up Game Created for web browser with an Custom theme.",
    date: "Jun 04, 2024",
    views: 2,
    price: 43.0,
    type: "Fixed-price" ,
    taskType: "Task" ,
    avatar: "https://github.com/shadcn.png",
  },
]
const BASE_URL = import.meta.env.VITE_API2; // Environment variable for API base URL
export default function FiltterJobsHeader() {
  const [jobs, setJobs] = useState([]);

const fetchJobs = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve token
    const response = await axios.get(`${BASE_URL}/api/client/offres`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token for authentication
      },
    });

    if (response.status === 200) {
      console.log("✅ Fetched Jobs:", response.data);
      setJobs(response.data); // Update state with real API data
    } else {
      console.warn("⚠️ API returned unexpected response:", response);
    }
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
  }
};


  useEffect(() => {
    fetchJobs();
  }, []);



  return (
    <div className="container space-y-6 py-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Manage your jobs</h1>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full auto-cols-fr grid-flow-col">
            <TabsTrigger value="all" className="gap-2">
              All jobs
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">10</span>
            </TabsTrigger>
            <TabsTrigger value="assigned" className="gap-2">
              Assigned
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">1</span>
            </TabsTrigger>
            <TabsTrigger value="in-process" className="gap-2">
              In process
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">2</span>
            </TabsTrigger>
            <TabsTrigger value="canceled" className="gap-2">
              Canceled
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">0</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              Completed
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">0</span>
            </TabsTrigger>
            <TabsTrigger value="closed" className="gap-2">
              Closed
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">5</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="space-y-4">
        {jobs.map((job, i) => (
          <JobCard key={i} id={job?.id} job={job} />
        ))}
      </div>
    </div>
  )
}

