import { useState } from "react";
import JobCard from "../components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { jobPostings } from "../data.json";

function JobBoard() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredJobs = jobPostings.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <form className="flex gap-2 mb-6">
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-500" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Search
                </Button>
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
