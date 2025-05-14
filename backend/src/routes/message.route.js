import express from "express";
import Message from "../models/message.model.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { handleSocket } from "../lib/socket.js"; // Import the socket instance

const router = express.Router();

router.get("/", protectRoute, async (req, res) => {
  const messages = await Message.find()
    .populate("senderId", "username")
    .sort({ createdAt: 1 });
  res.json(messages);
});

router.post("/", protectRoute, async (req, res) => {
  const { text, emoji } = req.body;
  const { userId } = req.user;

  const message = new Message({
    senderId: userId,
    text,
    emoji,
  });

  await message.save();
  const fullMessage = await message.populate("senderId", "username");

  // Emit the message to all connected clients
  handleSocket.emit("newMessage", fullMessage); // Emit the message to all connected clients using the socket instance

  res.status(201).json(fullMessage);
});

export default router;
