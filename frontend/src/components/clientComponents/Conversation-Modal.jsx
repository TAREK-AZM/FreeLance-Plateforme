
import { X,ArrowLeft } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useState, useRef, useEffect } from "react"
import {Link} from "react-router-dom"

const conversationHistory = [
  {
    id: 1,
    sender: "Alice Johnson",
    content:
      "Hi, I have a question about the job posting. Could you provide more details about the required experience?",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "You",
    content:
      "Of course! We're looking for candidates with at least 3 years of experience in web development, particularly with React and Node.js. Is there anything specific you'd like to know?",
    time: "10:35 AM",
  },
  {
    id: 3,
    sender: "Alice Johnson",
    content:
      "That's helpful, thank you. I have about 2 years of experience with React, but I've been working on personal projects with Node.js for longer. Would that be sufficient?",
    time: "10:40 AM",
  },
  {
    id: 4,
    sender: "Alice Johnson",
    content:
      "That sounds promising! We value personal projects and initiative. Could you tell me more about your Node.js projects?",
    time: "10:45 AM",
  },
  {
    id: 5,
    sender: "You",
    content:
      "That sounds great! Personal projects demonstrate initiative and passion. Could you share some details about your Node.js projects? What kind of applications have you built?",
    time: "10:50 AM",
  },
  {
    id: 6,
    sender: "Alice Johnson",
    content:
      "I've built a real-time chat application using Node.js and Socket.io, and a RESTful API for a task management system using Express and MongoDB. I've also experimented with GraphQL for a personal blog project.",
    time: "10:55 AM",
  },
  {
    id: 7,
    sender: "You",
    content:
      "That's impressive! Your experience with real-time applications and different API architectures is valuable. How comfortable are you with database design and optimization?",
    time: "11:00 AM",
  },
  {
    id: 8,
    sender: "Alice Johnson",
    content:
      "Thank you! I'm quite comfortable with database design, particularly with MongoDB. I've worked on optimizing queries and indexing for better performance. I also have some experience with SQL databases like PostgreSQL.",
    time: "11:05 AM",
  },
  {
    id: 9,
    sender: "You",
    content:
      "Excellent! Your skills and experience sound like a great fit for our team. Would you be interested in scheduling a technical interview to discuss your experience further?",
    time: "11:10 AM",
  },
  {
    id: 10,
    sender: "Alice Johnson",
    content: "I'd be very interested in a technical interview. When would be a good time for you?",
    time: "11:15 AM",
  },
]

export default function ConversationModal() {
  const [message, setMessage] = useState("")
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add logic here to send the message
    setMessage("")
  }

  return (
    <div className="flex flex-col h-screen  overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-white   shadow-sm">
        <div className="flex items-center gap-3">
        <Link to="/client/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" alt={conversationHistory[0].sender} />
            <AvatarFallback>{conversationHistory[0].sender[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{conversationHistory[0].sender}</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-grow p-4 " ref={scrollAreaRef}>
        <div className="space-y-4 px-4 border border-2 border-gray-300 rounded-lg">
          {conversationHistory.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[70%] ${msg.sender === "You" ? "bg-[#00d67d] text-white" : "bg-white"} rounded-lg p-3 shadow`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className="bg-[#00d67d] hover:bg-[#0d8d52] text-white">
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

