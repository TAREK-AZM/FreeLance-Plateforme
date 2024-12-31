import { useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

function Filters({ skills, selectedSkills, onSkillChange }) {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilterVisibility = () => {
        setShowFilters((prev) => !prev);
    };

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                onClick={toggleFilterVisibility}
                className="flex items-center gap-2 text-cyan-900 hover:text-cyan-700 transition-all"
            >
                <Filter className="h-6 w-6" />
                {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>

            {/* Filters Section */}
            {showFilters && (
                <div className="absolute top-full left-0 w-[calc(89vw-2rem)] mt-4 p-4 border border-gray-300 rounded-md bg-gray-50/40 backdrop-blur-md dark:bg-gray-800 z-10">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
                        Filter by Skills
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {skills.map((skill) => (
                            <label key={skill} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={skill}
                                    checked={selectedSkills.includes(skill)}
                                    onChange={(e) => onSkillChange(e.target.value)}
                                    className="form-checkbox h-4 w-4 text-blue-600"
                                />
                                <span className="text-gray-800 dark:text-gray-300">{skill}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Filters;
