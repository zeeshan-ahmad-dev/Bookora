import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
    author: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model("book", bookSchema);