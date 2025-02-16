import { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import Filters from "../components/Filters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function JobBoard() {
    const [searchTerm, setSearchTerm] = useState("");
    const [jobPostings, setJobPostings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [skills, setSkills] = useState([]);
    // const [selectedSkills, setSelectedSkills] = useState([]);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API2}/api/prestataire/Alloffres`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setJobPostings(response.data);

                // Extract unique skills from job postings
                // const uniqueSkills = [
                //     ...new Set(response.data.flatMap((job) => job.skills)),
                // ];
                // setSkills(uniqueSkills);
            } catch (err) {
                console.error("Error fetching job postings:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobPostings();
    }, []);

    // const handleSkillChange = (skill) => {
    //     setSelectedSkills((prev) =>
    //         prev.includes(skill)
    //             ? prev.filter((s) => s !== skill)
    //             : [...prev, skill]
    //     );
    // };

    const filteredJobs = jobPostings.filter((job) => {
        const matchesSearchTerm =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        // const matchesSkills =
        //     selectedSkills.length === 0 ||
        //     selectedSkills.every((skill) =>
        //         job.skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
        //     );

        // return matchesSearchTerm && matchesSkills;
        return matchesSearchTerm ;
    });

    if (loading) return <div>Loading job postings...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center gap-4">
                {/*<Filters*/}
                {/*    skills={skills}*/}
                {/*    selectedSkills={selectedSkills}*/}
                {/*    onSkillChange={handleSkillChange}*/}
                {/*/>*/}
                {/* Search Input */}
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-3 w-full text-lg border border-gray-400 rounded-md"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>

                {/* Filter Button */}

            </div>

            {/* Job Listings */}
            <div className="grid gap-6 mt-6 md:grid-cols-2">
                {filteredJobs.map((job) => (
                    <JobCard key={job.id} {...job} />
                ))}
            </div>
        </div>
    );
}

export default JobBoard;
