import express from "express";
import {
  createNewChat,
  sendMessage,
  getChatHistory,
  getUserSessions,
  deleteChat,
  exportChatText
} from "../controllers/chatController.js";

const router = express.Router();

// Create new chat session
router.post("/new", createNewChat);

// Send message and get AI response
router.post("/message", sendMessage);

// Get chat history by session ID
router.get("/history/:sessionId", getChatHistory);

// Get all sessions for a user
router.get("/user/:userId", getUserSessions);

// Delete chat session
router.delete("/:sessionId", deleteChat);

// Export chat as text
router.get("/export/:sessionId", exportChatText);

export default router;
