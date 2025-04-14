import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        // Authentication check
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                message: "Authentication required",
                success: false
            });
        }

        const userId = req.user.id;
        const { id: jobId } = req.params;

        // Validation
        if (!jobId) {
            return res.status(400).json({ 
                message: "Job ID is required",
                success: false
            });
        }

        // Check job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        // Check duplicate application
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false,
            });
        }

        // Create application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            status: "pending"
        });

        // Update job's applications
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Application submitted successfully",
            success: true,
            application: newApplication,
        });

    } catch (error) {
        console.error("Application error:", {
            error: error.message,
            userId: req.user?.id,
            jobId: req.params.id
        });

        return res.status(500).json({ 
            message: "Internal server error", 
            success: false,
            error: process.env.NODE_ENV === "development" ? error.message : null
        });
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                message: "Authentication required",
                success: false
            });
        }

        const applications = await Application.find({ 
            applicant: req.user.id 
        })
        .sort({ createdAt: -1 })
        .populate({
            path: 'job',
            populate: {
                path: 'company',
                select: 'name logo' // Only get necessary fields
            }
        });

        return res.status(200).json({
            message: applications.length ? "Applications found" : "No applications yet",
            success: true,
            applications,
            count: applications.length
        });

    } catch (error) {
        console.error("Get applications error:", error.message);
        return res.status(500).json({ 
            message: "Error fetching applications", 
            success: false 
        });
    }
}

export const getApplicants = async (req, res) => {
    try {
        const { id: jobId } = req.params;

        const job = await Job.findById(jobId)
            .populate({
                path: 'applications',
                populate: [
                    {
                        path: 'applicant',
                        // You can remove 'select' or keep only the necessary fields
                        // select: 'name email profile resume' 
                    },
                    {
                        path: 'job',
                        select: 'title jobType salary positions'
                    }
                ]
            });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Applicants retrieved successfully",
            success: true,
            count: job.applications.length,
            applicants: job.applications
        });

    } catch (error) {
        console.error("Get applicants error:", error.message);
        return res.status(500).json({ 
            message: "Error fetching applicants", 
            success: false 
        });
    }
}



export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id: applicationId } = req.params;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false,
            });
        }

        const validStatuses = ["pending", "reviewed", "rejected", "accepted"];
        if (!validStatuses.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
                success: false,
            });
        }

        // Validate ObjectId
        if (!applicationId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                message: "Invalid application ID",
                success: false,
            });
        }

        const application = await Application.findByIdAndUpdate(
            applicationId,
            { status: status.toLowerCase() },
            { new: true, runValidators: true } // enforce schema validation
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
            application
        });

    } catch (error) {
        console.error("Update status error:", error); // FULL error log
        return res.status(500).json({ 
            message: "Error updating status", 
            success: false,
            error: process.env.NODE_ENV === "development" ? error.message : null
        });
    }
}
