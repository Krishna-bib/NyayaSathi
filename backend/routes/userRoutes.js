import express from "express";
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers
} from "../controllers/userController.js";

const router = express.Router();

// Create new user
router.post("/", createUser);

// Get all users (admin)
router.get("/", getAllUsers);

// Get user by ID
router.get("/:userId", getUserById);

// Update user
router.put("/:userId", updateUser);

// Delete user
router.delete("/:userId", deleteUser);

export default router;
