import JobCard  from "./Job-Card"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { id } from "date-fns/locale"

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

export default function FiltterJobsHeader() {
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
          <JobCard key={i} {...job} />
        ))}
      </div>
    </div>
  )
}

