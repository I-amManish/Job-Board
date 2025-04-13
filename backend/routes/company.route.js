import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCompanyById,
  registerCompany,
  updateCompany,
  getCompany
} from "../controllers/company.controller.js";

const router = express.Router();

// note: Register a new company (POST)
router.post("/register", isAuthenticated, registerCompany);

// note: Get all companies for the logged-in user (GET)
router.get("/get", isAuthenticated, getCompany);

// note: Get a specific company by ID (GET)
router.get("/get/:id", isAuthenticated, getCompanyById);

// note: Update company information (PATCH)
router.patch("/update/:id", isAuthenticated, updateCompany);

export default router;
