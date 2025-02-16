import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API2;

export const useConversationStore = create((set, get) => ({
  conversations: [],
  currentConversation: null,
  isLoading: false,
  error: null,

  fetchConversations: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/conversations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("conversations :",response.data);
        set({ conversations: response.data, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  fetchConversation: async (conversationId) => {
    set({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/conversations/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        set({ currentConversation: response.data, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
      set({ error: error.message, isLoading: false });
    }
  },

  // Updated sendMessage with optimistic updates
  sendMessage: async (conversationId, senderId, content) => {
    // Create temporary message for optimistic update
    const tempMessage = {
      id: Date.now(), // Temporary ID
      content: content,
      senderId: senderId,
      senderName: get().currentConversation?.clientName,
      sentAt: new Date().toISOString(),
      status: "SENDING"
    };

    // Optimistically update the UI
    const currentConversation = get().currentConversation;
    if (currentConversation) {
      set({
        currentConversation: {
          ...currentConversation,
          messages: [...currentConversation.messages, tempMessage]
        }
      });
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/api/conversations/${conversationId}/messages`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Update with the real message from the server
        const realMessage = response.data;
        const updatedMessages = get().currentConversation.messages.map(msg => 
          msg.id === tempMessage.id ? realMessage : msg
        );

        // Update both currentConversation and conversations
        set(state => ({
          currentConversation: {
            ...state.currentConversation,
            messages: updatedMessages
          },
          conversations: state.conversations.map(conv => 
            conv.id === Number(conversationId) 
              ? { ...conv, messages: updatedMessages }
              : conv
          )
        }));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the temporary message if the send failed
      const updatedMessages = get().currentConversation.messages.filter(
        msg => msg.id !== tempMessage.id
      );
      set(state => ({
        currentConversation: {
          ...state.currentConversation,
          messages: updatedMessages
        }
      }));
      throw error;
    }
  },
}));