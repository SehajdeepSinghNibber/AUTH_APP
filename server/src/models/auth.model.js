
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        Username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        Password: {
            type: String,
            required: true,
            minlength: 6
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        lastLogin:{
            type: Date,
            default: Date.now
        },
        isVerified:{
            type: Boolean,
            default: false  
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
