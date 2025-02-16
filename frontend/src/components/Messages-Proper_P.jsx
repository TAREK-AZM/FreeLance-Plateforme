import { useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import { useConversationStore } from "../store/StoreConversation";

export function MessagesPopover() {
  const { conversations, fetchConversations } = useConversationStore();

  useEffect(() => {
    fetchConversations().catch((error) => {
      console.error("Failed to fetch conversations:", error);
    });
  }, [fetchConversations]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="relative inline-block">
          <Button
              variant="outline"
              size="icon"
              className="relative bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-800"
          >
          <MessageSquare className="h-5 w-5 bg-white rounded" />
          <span className="sr-only">Conversations</span>
            </Button>
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6934] text-xs font-medium text-white">
            {conversations.length}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center justify-between border-b pb-2">
          <h4 className="text-sm font-semibold">Messages</h4>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-[300px] py-2">
          {conversations.map((conversation) => (
            <Link
              to={`/conversations/${conversation.id}`}
              key={conversation.id}
              className="mb-2 flex items-center gap-2 rounded-md p-2 hover:bg-muted cursor-pointer"
            >
              <Avatar>
                <AvatarImage src={conversation.prestataireName[0]} />
                <AvatarFallback>{conversation.prestataireName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <h5 className="text-sm font-medium">{conversation.clientName}</h5>
                <p className="text-xs text-muted-foreground truncate">
                  {conversation.messages.length > 0
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