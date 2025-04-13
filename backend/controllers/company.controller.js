import { Company } from "../models/company.model.js";

// Register a new company
export const registerCompany = async (req, res) => {
    try {
        const { companyName, website, description, location } = req.body;

        // Check if any required fields are missing
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        // Add notifications for other required fields if necessary
        if (!website) {
            return res.status(400).json({
                message: "Website is required.",
                success: false
            });
        }

        // Check if the company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company with this name already exists.",
                success: false
            });
        }

        // Create the company document
        company = await Company.create({
            name: companyName,
            website: website,
            description: description || "",  // Default empty string if no description
            location: location || "",  // Default empty string if no location
            userId: req.id
        });

        // Return success response
        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });

    } catch (error) {
        console.error("Error during company registration:", error);  // Log the full error
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};



// Get all companies for the logged-in user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // Assumes user ID is available in req.id
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get a specific company by its ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Update an existing company
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const updateData = {};

        // Dynamically add fields if provided
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;

        // If file upload is involved (for example, using Cloudinary), you can add the file to updateData
        // const file = req.file; // handle file upload here if necessary
        // if (file) updateData.logo = file.path; // example: store uploaded file path

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true } // Returns the updated company
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            company,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
