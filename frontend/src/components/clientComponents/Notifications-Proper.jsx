import { Bell } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router-dom"
const notifications = [
  {
    id: 1,
    title: "New job application",
    description: "John Doe applied for Front-end Developer position",
    time: "2 minutes ago",
  },
  {
    id: 2,
    title: "Message from client",
    description: "You have a new message from Sarah regarding the project",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Payment received",
    description: "You received a payment of $500 for your recent job",
    time: "3 hours ago",
  },
  {
    id: 4,
    title: "New job posted",
    description: "A new job matching your skills has been posted",
    time: "1 day ago",
  },
]

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6934] text-xs font-medium text-white">
            {notifications.length}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center justify-between border-b pb-2">
          <h4 className="text-sm font-semibold">Notifications</h4>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-[300px] py-2">
          {notifications.map((notification) => (
            <Link to={`/client/dashboard/notifications/${notification.id}`} key={notification.id} className="mb-2 rounded-md p-2 hover:bg-muted">
              <div key={notification.id} className="mb-2 rounded-md p-2 hover:bg-muted">
                <h5 className="text-sm font-medium">{notification.title}</h5>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>

            </Link>

          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

