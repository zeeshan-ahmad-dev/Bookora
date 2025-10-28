import mongoose from 'mongoose';

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting database: ", error);
    }
}

export default connectDB;