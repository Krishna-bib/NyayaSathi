import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  messages: [messageSchema],
  metadata: {
    userAgent: String,
    ipAddress: String,
    location: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
chatSessionSchema.index({ createdAt: -1 });
chatSessionSchema.index({ userId: 1, createdAt: -1 });

const ChatSession = mongoose.model("ChatSession", chatSessionSchema);

export default ChatSession;
