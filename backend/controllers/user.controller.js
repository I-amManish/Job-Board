import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'



// info: Login
export const register = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, password, role} = req.body;
        if(!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message:"User credentials are missing",
                success:false
            });
        }
            const user = await User.findOne({email});
            if(user){
                return res.status(400).json({
                    message:"User already exists with this email",
                    success: false,
                })
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            await User.create({
                fullName,
                email,
                phoneNumber,
                password: hashedPassword,
                role
            })
        
            return res.status(201).json({
                message:"Account created successfully.",
                success:true
            })
    } catch (error) {
        console.log(error);
    }
}


// info: Login
export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message:"User credentials are missing",
                success:false
            });
        };

        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message:"Incorrect email or password.",
                success: false,
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message:"Incorrect email or password.",
                success: false,
                })
            };
            // info: role is correct or not
            if(role!== user.role) {
                return res.status(400).json({
                    message:"Account doesn't exist with current role.",
                    success:false
                })
            };

            const tokenData = {
                userId: user._id
            }
            const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'});

            user = {
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                phoneNumber:user.phoneNumber,
                role:user.role,
                profile:user.profile
            }

            return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
                message:`Welcome back ${user.fullName}`,
                success:true
            })



    } catch (error) {
        console.log(error)
    }
}



// info: Logout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}



// info: Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        // ✅ At least one field should be present
        if (!fullName && !email && !phoneNumber && !bio && !skills && !file) {
            return res.status(400).json({
                message: "No update data provided",
                success: false
            });
        }

        const userId = req.id; // Auth middleware
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        // ✅ Only update provided fields
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",");

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};
