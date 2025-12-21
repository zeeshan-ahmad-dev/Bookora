import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String,
    },
    authType: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationOtp: Number,
    verificationOtpExpiry: {
        type: Date,
        default: null
    },
    resetPasswordOtp: Number,
    resetPasswordOtpExpiry: {
        type: Date,
        default: null
    },
}, {timestamps: true});

export default mongoose.model("User", userSchema);