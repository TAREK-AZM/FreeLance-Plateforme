import Image from "next/image";
import { Heart } from "lucide-react";

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

interface FreelancerCardProps {
  freelancer: Freelancer;
  isListView?: boolean;
}

export default function FreelancerCard({ freelancer, isListView }: FreelancerCardProps) {
  return (
    <div
      className={`relative rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
        isListView ? "flex items-center gap-6" : "flex flex-col"
      }`}
    >
      {/* Favorite Icon */}
      <button className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-gray-100">
        <Heart className="h-5 w-5 text-gray-400" />
      </button>

      {/* Profile Image */}
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={freelancer.image || "/placeholder.svg"}
          alt={freelancer.name}
          fill
          className="rounded-full object-cover"
        />
      </div>

      {/* Freelancer Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{freelancer.name}</h3>
        <p className="text-sm text-gray-600">{freelancer.role}</p>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium">{freelancer.rating.toFixed(1)}/5</span>
          <span className="text-sm text-gray-500">({freelancer.reviews})</span>
        </div>

        {/* Description (Only in List View) */}
        {isListView && <p className="mt-2 text-sm text-gray-600">{freelancer.description}</p>}

        {/* Skills */}
        <div className="mt-3 flex flex-wrap gap-2">
          {freelancer.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
              {skill}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button className="border rounded-full px-4 py-2 text-green-600 hover:bg-green-100">
            View profile
          </button>
          <button className="bg-green-600 text-white rounded-full px-4 py-2">
            Invite to job
          </button>
        </div>
      </div>
    </div>
  );
}
