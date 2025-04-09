import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
        
    } catch (error) {
        
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = res.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message:"User credentials are missing",
                success:false
            });
        };

        const user = await User.findOne({email});
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
            }

    } catch (error) {
        
    }
}