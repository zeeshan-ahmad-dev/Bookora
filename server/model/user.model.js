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
    }
}, {timestamps: true});

export default mongoose.model("user", userSchema);