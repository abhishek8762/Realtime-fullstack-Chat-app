import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { leaderboard, getMessages } from "../controllers/message.controller.js";
// Import the socket instance

const router = express.Router();

router.get("/", protectRoute, getMessages);

router.get("/leaderboard", protectRoute, leaderboard);

export default router;
