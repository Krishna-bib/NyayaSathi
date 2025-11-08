import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    ref: "ChatSession"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    maxlength: 1000
  },
  feedbackType: {
    type: String,
    enum: ["helpful", "not-helpful", "inaccurate", "general"],
    default: "general"
  },
  messageId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
