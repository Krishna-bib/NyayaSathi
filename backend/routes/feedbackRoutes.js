import express from "express";
import {
  createFeedback,
  getFeedbackBySession,
  getAllFeedback,
  deleteFeedback
} from "../controllers/feedbackController.js";

const router = express.Router();

// Create feedback
router.post("/", createFeedback);

// Get feedback by session
router.get("/session/:sessionId", getFeedbackBySession);

// Get all feedback (admin)
router.get("/", getAllFeedback);

// Delete feedback
router.delete("/:feedbackId", deleteFeedback);

export default router;
