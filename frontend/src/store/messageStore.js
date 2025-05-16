import { create } from "zustand";
import { socket } from "../lib/socket";
import { axiosInstance } from "../lib/axios";

export const useMessageStore = create((set) => ({
  messages: [],
  replyingTo: null,
  leaderboard: [],
  isMessagesLoading: true,

  setReplyingTo: (message) => set({ replyingTo: message }),
  clearReplyingTo: () => set({ replyingTo: null }),

  fetchMessages: async () => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get("/messages");
      set({ messages: res.data });
    } catch (err) {
      console.error("Failed to load messages", err);
      set({ messages: [] });
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: (messageData) => {
    const replyingTo = useMessageStore.getState().replyingTo;
    const payload = {
      ...messageData,
      replyTo: replyingTo ? replyingTo._id : null,
    };
    socket.emit("sendMessage", payload);
    useMessageStore.getState().setReplyingTo(null); // Clear replyingTo after sending the message
  },

  fetchLeaderboard: async () => {
    try {
      const res = await axiosInstance.get("/messages/leaderboard");
      set({ leaderboard: res.data });
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
    }
  },

  connectSocket: (userId) => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", userId);

    socket.off("newMessage"); // Remove previous listener to avoid duplicates

    socket.on("newMessage", (newMsg) => {
      set((state) => ({
        messages: [...state.messages, newMsg],
      }));
    });
  },
}));
