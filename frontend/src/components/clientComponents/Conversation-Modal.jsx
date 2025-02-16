import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { te } from "date-fns/locale";

const API_BASE_URL = import.meta.env.VITE_API2;

export default function ConversationModal() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [message, setMessage] = useState("");
  const scrollAreaRef = useRef(null);
  const token = localStorage.getItem("token");

  const fetchConversation = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/conversations/one/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversation(response.data);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  useEffect(() => {
    fetchConversation();
    // Poll for new messages every 3 seconds
    const interval = setInterval(fetchConversation, 3000);
    return () => clearInterval(interval);
  }, [conversationId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Optimistically add the message
    const tempMessage = {
      id: Date.now(),
      content: message.trim(),
      senderId: conversation.clientId,
      senderName: conversation.clientName,
      sentAt: new Date().toISOString(),
    };

    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, tempMessage]
    }));
    setMessage("");

    try {
      await axios.post(
        `${API_BASE_URL}/api/conversations/${conversationId}/messages`,
      tempMessage.content,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      // Fetch the latest messages to ensure sync
      fetchConversation();
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the temporary message if sending failed
      setConversation(prev => ({
        ...prev,
        messages: prev.messages.filter(msg => msg.id !== tempMessage.id)
      }));
    }
  };

  if (!conversation) {
    return <div>Loading...</div>;
  }
// Sort messages by sentAt timestamp
const sortedMessages = [...(conversation.messages || [])].sort(
  (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
);
  return (
    <div className="flex border border-2 border-gray-300 rounded-lg flex-col h-screen">
      <div className="flex items-center justify-between p-4 bg-blue-50 shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/client/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src="/placeholder-avatar.jpg" 
              alt={conversation.prestataireName} 
            />
            <AvatarFallback>
              {conversation.prestataireName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">
              {conversation.prestataireName}
            </h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>
      <ScrollArea 
        className="flex-grow p-4 border border-1 border-gray-300 rounded-lg" 
        ref={scrollAreaRef}
      >
        <div className="space-y-4 px-4">
          {sortedMessages?.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${
                msg.senderId === conversation.clientId 
                  ? "justify-end" 
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] ${
                  msg.senderId === conversation.clientId 
                    ? "bg-[#00d67d] text-white" 
                    : "bg-white"
                } rounded-lg p-3 shadow`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(msg.sentAt).toLocaleTimeString()}
                </p>
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
          />
          <Button 
            type="submit" 
            className="bg-[#00d67d] hover:bg-[#0d8d52] text-white"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}