import { useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useConversationStore } from "../../store/StoreConversation";
import axios from "axios";

export function MessagesPopover() {
  const { conversations, fetchConversations, unreadMessages, markConversationAsRead, markAllConversationsAsRead } = useConversationStore();
  const API_URL = `${import.meta.env.VITE_API2}`;

  // Fetch conversations on component mount
  useEffect(() => {
    fetchConversations().catch((error) => {
      console.error("Failed to fetch conversations:", error);
    });
  }, [fetchConversations]);

  // Mark a conversation as read
  const handleConversationClick = async (conversationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/conversations/${conversationId}/mark-read`,
        {}, // Empty body since it's a PUT request with no data payload
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        }
      );

      // Update the conversation's read status in the store
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
        {}, // Empty body since it's a PUT request with no data payload
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        }
      );

      // Update all conversations' read status in the store
      markAllConversationsAsRead();
    } catch (error) {
      console.error("Error marking all conversations as read:", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative inline-block">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Conversations</span>
          {unreadMessages.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6934] text-xs font-medium text-white">
              {unreadMessages.length}
              {unreadMessages}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center justify-between border-b pb-2">
          <h4 className="text-sm font-semibold">Messages</h4>
          {unreadMessages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
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
                <AvatarImage src={conversation.prestataireName[0]} />
                <AvatarFallback>{conversation.prestataireName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <h5 className="text-sm font-medium">{conversation.prestataireName}</h5>
                <p className="text-xs text-muted-foreground truncate">
                  {conversation.messages.length > 0
                    ? conversation.messages[conversation.messages.length - 1].content
                    : "No messages yet"}
                </p>
              </div>
              {conversation.unreadCount > 0 && (
                <Badge className="ml-auto" variant="secondary">
                  {conversation.unreadMessages}
                </Badge>
              )}
            </Link>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}