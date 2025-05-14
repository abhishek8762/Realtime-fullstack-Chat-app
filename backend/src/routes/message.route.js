import express from "express";
import Message from "../models/message.model.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, async (req, res) => {
  const messages = await Message.find()
    .populate("senderId", "username")
    .sort({ createdAt: 1 });
  res.json(messages);
});

export default router;
