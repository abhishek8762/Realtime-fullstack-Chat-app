import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { Server } from "socket.io";
import { handleSocket } from "./lib/socket.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const __dirname = path.resolve();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://unity-chat.onrender.com"]
    : ["http://localhost:5173"];

const io = new Server(server, {
  cors: { origin: allowedOrigins, credentials: true },
});

app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);

handleSocket(io); // Socket logic

//deployment

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(console.error);
