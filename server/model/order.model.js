import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    products: [
        {
            _id: {type: String, required: true},
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            cover: { type: String },
        }
    ],
    amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        enum: ["paid", "pending", "failed"]
    },
    stripe_session_id: {
        type: String,
    }
}, {timestamps: true});

export default mongoose.model("Order", orderSchema);