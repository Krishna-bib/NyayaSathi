import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    unique: true,
    sparse: true
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  chatHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatSession"
  }],
  preferences: {
    language: {
      type: String,
      default: "en"
    },
    notifications: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
