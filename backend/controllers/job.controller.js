import { Job } from "../models/job.model.js";

// info: Create a new job(admin)
export const postJob = async (req, res) => { 
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id; // info: Assumes user ID is available in req.id
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "Job posted successfully.",
            job,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
}

// info: get all jobs(student)
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""; // info: Get keyword from query params
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };
        const jobs = await Job.find(query).populate("company", "name"); // info: Populate the company field with name only
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        });       
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
        
    }
}

// info: Get a specific job by its ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("company", "name"); // info: Populate the company field with name only
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        };
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
        
    }
}

// info: jobs created by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id; // info: Assumes user ID is available in req.id
        const jobs = await Job.find({ created_by: adminId }).populate("company", "name"); // info: Populate the company field with name only

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            });
        };
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
        
    }
}