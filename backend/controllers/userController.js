import User from "../models/User.js";
import ChatSession from "../models/ChatSession.js";

// Create new user
export const createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check if user already exists
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "User with this email already exists"
        });
      }
    }

    const newUser = new User({
      name,
      email,
      phone,
      isAnonymous: !email && !phone
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create user",
      message: error.message
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .select("-__v")
      .populate("chatHistory", "sessionId createdAt");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user",
      message: error.message
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone, preferences } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (preferences) updateData.preferences = preferences;
    updateData.lastActive = new Date();

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update user",
      message: error.message
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    // Optionally delete associated chat sessions
    await ChatSession.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete user",
      message: error.message
    });
  }
};

// Get all users (admin function)
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      users
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch users",
      message: error.message
    });
  }
};
