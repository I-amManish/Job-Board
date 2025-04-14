import { Application } from "../models/application.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.user.id; // note: Assuming you have user ID in req.user;
        const {id:jobId} = req.params; // note: Assuming job ID is passed in the URL params

        if(!jobId){
            return res.status(400).json({ 
                message: "Job ID is required",
                success: false
            });
        };

        // info: check if the user has already applied for the job
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "You have already applied for this job", 
            success: false,
        });
    }
}