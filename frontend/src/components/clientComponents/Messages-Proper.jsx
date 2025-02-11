
import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Link } from "react-router-dom"
const messages = [
  {
    id: 1,
    sender: "Alice Johnson",
    avatar: "/avatars/alice.jpg",
    preview: "Hi, I have a question about the job posting...",
    time: "2 minutes ago",
  },
  {
    id: 2,
    sender: "Bob Smith",
    avatar: "/avatars/bob.jpg",
    preview: "Thanks for your application. We'd like to schedule...",
    time: "1 hour ago",
  },
  {
    id: 3,
    sender: "Charlie Brown",
    avatar: "/avatars/charlie.jpg",
    preview: "The project is coming along nicely. I've uploaded...",
    time: "3 hours ago",
  },
  {
    id: 4,
    sender: "Charlie Brown",
    avatar: "/avatars/charlie.jpg",
    preview: "The project is coming along nicely. I've uploaded...",
    time: "3 hours ago",
  },
]

export function MessagesPopover() {
  // const [selectedMessage, setSelectedMessage] = useState(null)

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6934] text-xs font-medium text-white">
              {messages.length}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-sm font-semibold">Messages</h4>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
          <ScrollArea className="h-[300px] py-2">
            {messages.map((message) => (

              <Link to={`/client/dashboard/conversations/${message.id}`} key={message.id} className="mb-2 flex items-center gap-2 rounded-md p-2 hover:bg-muted cursor-pointer">
                <div
                  key={message.id}
                  className="mb-2 flex items-center gap-2 rounded-md p-2 hover:bg-muted cursor-pointer"
                  onClick={() => setSelectedMessage(message)}
                >
                  <Avatar>
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <h5 className="text-sm font-medium">{message.sender}</h5>
                    <p className="text-xs text-muted-foreground truncate">{message.preview}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{message.time}</span>
                </div>
              </Link>

            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  )
}

