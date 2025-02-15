import { useState, useEffect } from "react";
import JobCard  from "./Job-Card"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import axios from "axios";
// Sample job data

const BASE_URL = import.meta.env.VITE_API2; // Environment variable for API base URL
export default function FiltterJobsHeader() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([])
  const [activeTab, setActiveTab] = useState("all")


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

const filterJobs = (status) => {
  setActiveTab(status)
  if (status === "all") {
    setFilteredJobs(jobs)
  } else {
    const filtered = jobs.filter((job) => job.status === status)
    setFilteredJobs(filtered)
  }
}

const getJobCount = (status) => {
  if (status === "all") return jobs.length
  return jobs.filter((job) => job.status === status).length
}

  useEffect(() => {
    fetchJobs();
  }, []);



  return (
    <div className="container space-y-6 py-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Manage your Offeres</h1>
        <Tabs value={activeTab} onValueChange={filterJobs} className="w-full">
          <TabsList className="grid w-full auto-cols-fr grid-flow-col">
            <TabsTrigger value="all" className="gap-2">
              All jobs
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {getJobCount("all")}
              </span>
            </TabsTrigger>
            <TabsTrigger value="EN_COURS" className="gap-2">
              In process
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{getJobCount("EN_COURS")}</span>
            </TabsTrigger>
            <TabsTrigger value="COMPLITED" className="gap-2">
              Completed
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{getJobCount("COMPLITED")}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="space-y-4">
        {filteredJobs.map((job, i) => (
          <JobCard key={i} id={job?.id} job={job} />
        ))}
      </div>
    </div>
  )
}

