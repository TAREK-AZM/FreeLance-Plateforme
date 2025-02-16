import { create } from "zustand";
import axios from "axios"

const BASE_URL = import.meta.env.VITE_API2;
export const useConversationStore = create((set) => ({
  conversations: [],
  unreadMessages: 0,

  fetchConversations: async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/conversations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response conversations", response.data)
    set({ conversations: response.data });
    // get just the unread messages of the prestataire
    const authecatedUserId = localStorage.getItem("token");
    set({ unreadMessages: response.data.flatMap(conversation =>
      conversation.messages.filter(message => message.status != "READ" && message.senderId == authecatedUserId)
  ) })

  console.log("conversations", unreadMessages)
  },

  markConversationAsRead: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
      ),
    }));
  },

  markAllConversationsAsRead: () => {
    set((state) => ({
      conversations: state.conversations.map((conv) => ({
        ...conv,
        unreadCount: 0,
      })),
      unreadMessages: 0,
    }));
  },
}));

export default useConversationStore;