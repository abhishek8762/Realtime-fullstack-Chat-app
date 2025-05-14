import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { Server } from "socket.io";
import { handleSocket } from "./lib/socket.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

handleSocket(io); // Socket logic

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(5001, () => console.log("Server running on 5001"));
  })
  .catch(console.error);
