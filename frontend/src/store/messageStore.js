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
    if (!socket.connected) return;

    socket.emit("join", userId);

    socket.off("newMessage"); // socket.off("newMessage") removes existing listeners so socket.on("newMessage", ...) is only attached once.
    // This is important to prevent multiple listeners from being attached every time the component mounts.
    // This can lead to performance issues and unexpected behavior.
    // By removing the existing listener before adding a new one, we ensure that only one listener is active at a time.
    // This is a common pattern in socket programming to avoid memory leaks and ensure that the event handler is always up to date.
    // This is especially important in React, where components can mount and unmount frequently.
    // If we don't remove the existing listener, every time the component mounts, a new listener would be added,
    // leading to multiple listeners being active at the same time.
    // This can cause the event handler to be called multiple times for a single event,
    // which can lead to performance issues and unexpected behavior.
  },
}));
