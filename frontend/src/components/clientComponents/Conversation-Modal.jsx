
import { X, ArrowLeft, Home } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useState, useRef, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
const conversationHistory = [
  {
    id: 1,
    sender: "Alice Johnson",
    content:
      "Hi, I have a question about the job posting. Could you provide more details about the required experience?",
    time: "10:30 AM",
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
  {
    id: 10,
    sender: "Alice Johnson",
    content: "I'd be very interested in a technical interview. When would be a good time for you?",
    time: "11:15 AM",
  },
  {
    id: 10,
    sender: "Alice Johnson",
    content: "I'd be very interested in a technical interview. When would be a good time for you?",
    time: "11:15 AM",
  },
  {
    id: 10,
    sender: "Alice Johnson",
    content: "I'd be very interested in a technical interview. When would be a good time for you?",
    time: "11:15 AM",
  },
]

export default function ConversationModal() {
  const path = window.location.pathname; // This will be '/client/freelancers/1'

  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const scrollAreaRef = useRef(null);
  const { conversationId } = useParams(); // Get the conversation ID from the URL

  // Function to fetch conversation messages
  const fetchConversation = async (conversationId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.get(`${BASE_URL}/conversations/${conversationId}`, {
        headers: {
          Authorization: `${token}`, // Attach token for authentication
        },
      });

      if (response.status === 200) {
        console.log("✅ Fetched Conversation:", response.data);
        setConversation(response.data.messages || []); // Update messages
      }
    } catch (error) {
      console.error("❌ Error fetching conversation:", error);
    }
  };

  // Function to send a new message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const response = await axios.post(
        `${BASE_URL}/conversations/${conversationId}/messages`,// url of creating message in conversation
        {
          conversationId: conversationId,
          senderId: user?.id,
          content: message,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("✅ Message Sent:", response.data);
        setConversation((prev) => [...prev, response.data]); // Append new message
        setMessage("");
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  const handleSubmit = (e) => {
    sendMessage(e);
  }

  // Fetch conversation on mount
  useEffect(() => {
    fetchConversation();
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="flex border border-2 border-gray-300 rounded-lg flex-col h-screen   ">
      <div className="flex items-center justify-between p-4 bg-white   shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/client/dashboard">
            <Button variant="ghost" size="icon">
              {!path.startsWith("/client/freelancers/")
                ? <ArrowLeft className="h-4 w-4" />
                : <Link to="/">
                  <Home className="h-4 w-4" />
                </Link>}

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

      </div>
      <ScrollArea className="flex-grow p-4 border border-1 border-gray-300 rounded-lg" ref={scrollAreaRef}>
        <div className="space-y-4 px-4  min-h-screen">
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
      <div className="p-8 bg-white border-t">
        <form onSubmit={handleSubmit} className="flex justify-between items-center gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=""
          />
          <Button type="submit" className="bg-[#00d67d] hover:bg-[#0d8d52] text-white">
            Send
          </Button>
        </form>
      </div>

    </div>
  )
}

