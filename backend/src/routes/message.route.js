import express from "express";
import Message from "../models/message.model.js";
import { protectRoute } from "../middleware/auth.middleware.js";
// Import the socket instance

const router = express.Router();

router.get("/", protectRoute, async (req, res) => {
  const messages = await Message.find()
    .populate("senderId", "fullName profilePic")
    .populate({
      path: "replyTo",
      populate: { path: "senderId", select: "fullName" },
    }) // nested populate inside of replyTo resides refrence senderId, and for senderId its direct reference to fullName
    .sort({ createdAt: 1 });
  res.json(messages);
});

export default router;
