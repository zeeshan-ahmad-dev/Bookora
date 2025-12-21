import mongoose from "mongoose";
import Book from "../model/book.model.js";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamp: true });

export default mongoose.model("Cart", cartSchema);