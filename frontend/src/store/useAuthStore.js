import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { socket } from "../lib/socket";
import { useMessageStore } from "./messageStore";

//handling global state, which can be used by calling for eg calling useAuthStore and then destructuring state from it
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
      useMessageStore.getState().connectSocket(res.data._id);
    } catch (error) {
      console.log("Error in checkAuth state", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      // with help of get, we can call functions in different function which zustand allows us
      get().connectSocket();
      console.log("Login response", res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  connectSocket: () => {
    const { authUser } = get();

    if (!authUser?._id) return;

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join", authUser._id); //ALWAYS emit join regardless of connection status when auth user is present

    socket.off("onlineUsers");
    socket.on("onlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
      console.log("Online users updated", userIds);
    });
  },

  disconnectSocket: () => {
    if (socket.connected) {
      socket.disconnect();
      console.log("Disconnected");
    }
  },
}));
