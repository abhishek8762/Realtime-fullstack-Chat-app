import { io } from "socket.io-client";

const change =
  import.meta.NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:5001";

export const socket = io(change, {
  withCredentials: true,
  autoConnect: true,
});
