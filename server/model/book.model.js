import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
            stars: {type: Number, min: 0, max: 5}
        }
    ],
    sales: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    categories: {
        type: [String]
    }
}, {timestamps: true});

bookSchema.index({ title: 1, author: 1 }, { unique: true })

export default mongoose.model("Book", bookSchema);