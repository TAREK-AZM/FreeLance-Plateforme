import { useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useConversationStore } from "../../store/StoreConversation";
import axios from "axios";

export function MessagesPopover() {
  const API_URL = import.meta.env.VITE_API2;
  const {
    conversations,
    fetchConversations,
    unreadMessages,
    markConversationAsRead,
    markAllConversationsAsRead,
  } = useConversationStore();

  // Mark a single conversation as read
  const handleConversationClick = async (conversationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
          `${API_URL}/api/conversations/${conversationId}/mark-read`,
          {}, // Empty body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      // Update the UI
      markConversationAsRead(conversationId);
    } catch (error) {
      console.error("Error marking conversation as read:", error);
    }
  };

  // Mark all conversations as read
  const handleMarkAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
          `${API_URL}/api/conversations/mark-all-read`,
          {}, // Empty body
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      // Update UI
      markAllConversationsAsRead();
    } catch (error) {
      console.error("Error marking all conversations as read:", error);
    }
  };

  useEffect(() => {
    fetchConversations().catch((error) => {
      console.error("Failed to fetch conversations:", error);
    });
  }, [fetchConversations]);

  return (
      <Popover>
        <PopoverTrigger>
          <div className="relative inline-block">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Conversations</span>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6934] text-xs font-medium text-white">
            {conversations?.length || 0}
          </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-sm font-semibold">Messages</h4>
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          </div>
          <ScrollArea className="h-[300px] py-2">
            {conversations.map((conversation) => (
                <Link
                    to={`/client/dashboard/conversations/${conversation.id}`}
                    key={conversation.id}
                    className="mb-2 flex items-center gap-2 rounded-md p-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleConversationClick(conversation.id)}
                >
                  <Avatar>
                    <AvatarImage src={conversation.prestataireAvatar || ""} alt="User" />
                    <AvatarFallback>
                      {conversation.prestataireName?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <h5 className="text-sm font-medium">{conversation.prestataireName || "Unknown"}</h5>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.messages?.length > 0
                          ? conversation.messages[conversation.messages.length - 1].content
                          : "No messages yet"}
                    </p>
                  </div>
                </Link>
            ))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
  );
}
