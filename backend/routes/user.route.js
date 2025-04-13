import express from "express";
import {
  register,
  login,
  updateProfile,
  logout
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// note: User registration
router.post("/register", register);

// note: User login
router.post("/login", login);

// note: Logout user
router.get("/logout", logout);

// note: Update profile (protected route)
router.post("/profile/update", isAuthenticated, updateProfile);

export default router;
