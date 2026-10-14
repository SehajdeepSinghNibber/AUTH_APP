import User from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../utils/generateVerificationCode.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup= async(req,res)=>{
    
    const { Username, Password, email } = req.body;

    try {
        if( !Username || !Password || !email ){
            throw new Error("All fields are required")
        }

        if (Password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });
        }

        const existingUser = await User.findOne({
            $or: [{Username},{email}]
        })

        if(existingUser){
            return res.status(400).json({
                success: false,
                message:"Username or email already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const verificationToken = generateVerificationToken();

        const newUser = await User.create({
            Username,
            Password: hashedPassword,
            email,
            verificationToken,
            verificationTokenExpiresAt: Date.now()+24*60*60*1000 // 24 hours
        })

        // jwt

        generateTokenAndSetCookie(res,newUser._id);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                ...newUser._doc,
                Password:undefined,
            }
        });


    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const login= async(req,res)=>{
    
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
