import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

// info: Apply for a job
router.route("/apply/:id").get(isAuthenticated, applyJob);

// info: Get all applications for a job
router.route("/get").get(isAuthenticated, getAppliedJobs);

// info: Get all applicants for a job
router.route("/:id/applicats").get(isAuthenticated, getApplicants);

// info: Update application status
router.route("/status/:id/update").post(isAuthenticated, updateStatus)

export default router;