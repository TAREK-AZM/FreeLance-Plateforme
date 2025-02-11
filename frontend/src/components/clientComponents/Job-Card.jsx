import { Eye, FileText, Clock, DollarSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Link } from "react-router-dom";





export default function JobCard({id, category, title, date, views, price, type, taskType, avatar }) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-sm text-[#12AE65] ">Job category: {category}</span>
              <span className="text-sm text-muted-foreground">| Posted: {date}</span>
            </div>
            <h3 className=" font-semibold">{title}</h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="rounded-md">
              <Eye className="mr-1 h-3 w-3" />
              {views}
            </Badge>
            <Badge variant="secondary" className="rounded-md">
              <Clock className="mr-1 h-3 w-3" />
              {type}
            </Badge>
            <Badge variant="secondary" className="rounded-md">
              <FileText className="mr-1 h-3 w-3" />
              {taskType}
            </Badge>
            <Badge variant="secondary" className="rounded-md">
              <DollarSign className="mr-1 h-3 w-3" />
              {price.toFixed(2)}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatar} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Link to={`/client/jobs/${id}`}>
          <Button variant="ghost" size="icon">
            
            <Eye className="h-4 w-4" />

          </Button>
          </Link>
          
        </div>
      </div>
    </div>
  )
}

