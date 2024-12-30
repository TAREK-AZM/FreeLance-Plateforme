import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

function JobBoard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API}/jobPostings`); // Replace with your API URL
                setJobPostings(response.data);
            } catch (err) {
                console.error("Error fetching job postings:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobPostings();
    }, []); // Runs only once after the component mounts

    const filteredJobs = jobPostings.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div>Loading job postings...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <form className="flex gap-2 mb-6">
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-400"
                    />
                    <Search className=" absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-500" />
                </div>

            </form>
            <div className="grid gap-6 md:grid-cols-2">
                {filteredJobs.map(job => (
                    <JobCard key={job.id} {...job} />
                ))}
            </div>
        </div>
    );
}

export default JobBoard;
