import Feedback from "../models/Feedback.js";
import ChatSession from "../models/ChatSession.js";

// Create feedback
export const createFeedback = async (req, res) => {
  try {
    const { sessionId, rating, comment, feedbackType, messageId } = req.body;

    if (!sessionId || !rating) {
      return res.status(400).json({
        success: false,
        error: "Session ID and rating are required"
      });
    }

    // Verify session exists
    const session = await ChatSession.findOne({ sessionId });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: "Chat session not found"
      });
    }

    const feedback = new Feedback({
      sessionId,
      rating,
      comment,
      feedbackType,
      messageId
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({
      success: false,
      error: "Failed to submit feedback",
      message: error.message
    });
  }
};

// Get feedback by session
export const getFeedbackBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const feedback = await Feedback.find({ sessionId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch feedback",
      message: error.message
    });
  }
};

// Get all feedback (admin)
export const getAllFeedback = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const feedback = await Feedback.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Feedback.countDocuments();

    // Calculate average rating
    const avgRatingResult = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);
    const avgRating = avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : 0;

    res.status(200).json({
      success: true,
      count: feedback.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      avgRating: avgRating.toFixed(2),
      feedback
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch feedback",
      message: error.message
    });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    const feedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: "Feedback not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete feedback",
      message: error.message
    });
  }
};
