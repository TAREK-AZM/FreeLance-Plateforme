

import { useState } from "react"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { MapPin, Clock, Briefcase, Target, FileText, DollarSign,ArrowLeft, ArrowRight } from "lucide-react"
import cn from "classnames";

const jobs = [
  {
    id: 1,
    category: "Hospital Staff",
    postedDate: "Sep 13, 2024",
    title: "NICU Nurse",
    description:
      "Neonatal Care: Give premature and severely ill neonates admitted to the NICU specialized nursing care, including monitoring, medication administration, and assessments...",
    skills: [
      "Collaborative Teamwork",
      "Documentation",
      "Family Centered Care",
      "Intravenous Therapy",
      "Medication Administration",
      "Neonatal Assessment",
      "Neonatal Resuscitation",
      "Neurodevelopmental Care",
      "Respiratory Care",
      "Temperature Regulation",
    ],
    client: {
      name: "Nicola",
      image: "/placeholder.svg",
      location: "Algeria",
      spent: "119.00",
      jobSuccess: 3,
    },
    details: {
      sendBefore: "Jun 06, 2029",
      jobType: "Task",
      taskType: "Biddable",
      estimatedDate: "Jun 07, 2029 ( 04:00 )",
      proposals: 0,
      budget: "43.00",
    },
  },
  {
    id: 2,
    category: "Hospital Staff",
    postedDate: "Sep 13, 2024",
    title: "WARD Care NURSE",
    description: "Ward Care: Provide comprehensive nursing care to patients in the hospital ward...",
    skills: [
      "Patient Care",
      "Medication Administration",
      "Vital Signs Monitoring",
      "Documentation",
      "Team Collaboration",
    ],
    client: {
      name: "Sarah",
      image: "/placeholder.svg",
      location: "France",
      spent: "95.00",
      jobSuccess: 4,
    },
    details: {
      sendBefore: "Jun 06, 2029",
      jobType: "Task",
      taskType: "Fixed-price",
      estimatedDate: "Jun 08, 2029 ( 04:00 )",
      proposals: 2,
      budget: "35.00",
    },
  },
  {
    id: 3,
    category: "Hospital Staff",
    postedDate: "Sep 13, 2024",
    title: "WARD Care NURSE",
    description: "Ward Care: Provide comprehensive nursing care to patients in the hospital ward...",
    skills: [
      "Patient Care",
      "Medication Administration",
      "Vital Signs Monitoring",
      "Documentation",
      "Team Collaboration",
    ],
    client: {
      name: "Sarah",
      image: "/placeholder.svg",
      location: "France",
      spent: "95.00",
      jobSuccess: 4,
    },
    details: {
      sendBefore: "Jun 06, 2029",
      jobType: "Task",
      taskType: "Fixed-price",
      estimatedDate: "Jun 08, 2029 ( 04:00 )",
      proposals: 2,
      budget: "35.00",
    },
  },
  {
    id: 4,
    category: "Hospital Staff",
    postedDate: "Sep 13, 2024",
    title: "WARD Care NURSE",
    description: "Ward Care: Provide comprehensive nursing care to patients in the hospital ward...",
    skills: [
      "Patient Care",
      "Medication Administration",
      "Vital Signs Monitoring",
      "Documentation",
      "Team Collaboration",
    ],
    client: {
      name: "Sarah",
      image: "/placeholder.svg",
      location: "France",
      spent: "95.00",
      jobSuccess: 4,
    },
    details: {
      sendBefore: "Jun 06, 2029",
      jobType: "Task",
      taskType: "Fixed-price",
      estimatedDate: "Jun 08, 2029 ( 04:00 )",
      proposals: 2,
      budget: "35.00",
    },
  },
  {
    id: 4,
    category: "Hospital Staff",
    postedDate: "Sep 13, 2024",
    title: "WARD Care NURSE",
    description: "Ward Care: Provide comprehensive nursing care to patients in the hospital ward...",
    skills: [
      "Patient Care",
      "Medication Administration",
      "Vital Signs Monitoring",
      "Documentation",
      "Team Collaboration",
    ],
    client: {
      name: "Sarah",
      image: "/placeholder.svg",
      location: "France",
      spent: "95.00",
      jobSuccess: 4,
    },
    details: {
      sendBefore: "Jun 06, 2029",
      jobType: "Task",
      taskType: "Fixed-price",
      estimatedDate: "Jun 08, 2029 ( 04:00 )",
      proposals: 2,
      budget: "35.00",
    },
  },
  {
    id: 5,
    category: "Hospital Staff",
    postedDate: "Sep 13, 2024",
    title: "WARD Care NURSE",
    description: "Ward Care: Provide comprehensive nursing care to patients in the hospital ward...",
    skills: [
      "Patient Care",
      "Medication Administration",
      "Vital Signs Monitoring",
      "Documentation",
      "Team Collaboration",
    ],
    client: {
      name: "Sarah",
      image: "/placeholder.svg",
      location: "France",
      spent: "95.00",
      jobSuccess: 4,
    },
    details: {
      sendBefore: "Jun 06, 2029",
      jobType: "Task",
      taskType: "Fixed-price",
      estimatedDate: "Jun 08, 2029 ( 04:00 )",
      proposals: 2,
      budget: "35.00",
    },
  },
  {
    id: 6,
    category: "Hospital Staff",
    postedDate: "Sep 13, 2024",
    title: "WARD Care NURSE",
    description: "Ward Care: Provide comprehensive nursing care to patients in the hospital ward...",
    skills: [
      "Patient Care",
      "Medication Administration",
      "Vital Signs Monitoring",
      "Documentation",
      "Team Collaboration",
    ],
    client: {
      name: "Sarah",
      image: "/placeholder.svg",
      location: "France",
      spent: "95.00",
      jobSuccess: 4,
    },
    details: {
      sendBefore: "Jun 06, 2029",
      jobType: "Task",
      taskType: "Fixed-price",
      estimatedDate: "Jun 08, 2029 ( 04:00 )",
      proposals: 2,
      budget: "35.00",
    },
  },
  {
    id: 7,
    category: "Hospital Staff",
    postedDate: "Sep 13, 2024",
    title: "WARD Care NURSE",
    description: "Ward Care: Provide comprehensive nursing care to patients in the hospital ward...",
    skills: [
      "Patient Care",
      "Medication Administration",
      "Vital Signs Monitoring",
      "Documentation",
      "Team Collaboration",
    ],
    client: {
      name: "Sarah",
      image: "/placeholder.svg",
      location: "France",
      spent: "95.00",
      jobSuccess: 4,
    },
    details: {
      sendBefore: "Jun 06, 2029",
      jobType: "Task",
      taskType: "Fixed-price",
      estimatedDate: "Jun 08, 2029 ( 04:00 )",
      proposals: 2,
      budget: "35.00",
    },
  },
]

export default function JobsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    fixedPrice: false,
    biddable: false,
    privateJobs: false,
  })

  const itemsPerPage = 6;
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const currentJobs = jobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between mb-8">
        <div className="flex flex-wrap gap-4">
          <Select>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hospital">Hospital Staff</SelectItem>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Client Details" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder="Budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">$0 - $50</SelectItem>
              <SelectItem value="medium">$51 - $100</SelectItem>
              <SelectItem value="high">$100+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Switch
              checked={filters.fixedPrice}
              onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, fixedPrice: checked }))}
            />
            <span className="text-sm">Fixed-price</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={filters.biddable}
              onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, biddable: checked }))}
            />
            <span className="text-sm">Biddable</span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={filters.privateJobs}
              onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, privateJobs: checked }))}
            />
            <span className="text-sm">Private jobs</span>
          </div>
        </div>
      </div>

      {/* Jobs Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Found 252 Jobs</h1>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by newest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Sort by newest</SelectItem>
            <SelectItem value="oldest">Sort by oldest</SelectItem>
            <SelectItem value="budget-high">Highest budget</SelectItem>
            <SelectItem value="budget-low">Lowest budget</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        {currentJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg border p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="text-[#12AE65]">{job.category}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-500">Posted: {job.postedDate}</span>
                </div>

                <h2 className="text-xl font-semibold mb-3">{job.title}</h2>
                <p className="text-gray-600 mb-4">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill) => (
                    <span key={skill} className="bg-[#E7F7EF] text-[#12AE65] px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={job.client.image || "/placeholder.svg"}
                        alt={job.client.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{job.client.name}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{job.client.location}</span>
                        <span>•</span>
                        <span>${job.client.spent} Spent</span>
                        <span>•</span>
                        <span>{job.client.jobSuccess} Job success</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-l pl-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Send before</div>
                    <div>{job.details.sendBefore}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Job type</div>
                    <div>{job.details.jobType}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Task type</div>
                    <div>{job.details.taskType}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Estimated date/time</div>
                    <div>{job.details.estimatedDate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Proposals</div>
                    <div>{job.details.proposals}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-500">Budget</div>
                    <div>$ {job.details.budget}</div>
                  </div>
                </div>

                <Button className="w-full rounded-full bg-white border transition  border-[#12AE65] text-[#12AE65] hover:bg-[#12AE65]  hover:text-[#fff]">View details</Button>
              </div>
            </div>
          </div>
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
  )
}

