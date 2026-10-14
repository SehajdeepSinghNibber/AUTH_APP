import mongoose from "mongoose";
import config from "../config/config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);

        console.log("DB is Connected!!");
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        console.log(`Database: ${mongoose.connection.name}`);
    } catch (err) {
        console.error("DB not connected:", err);
        process.exit(1);
    }
};

export default connectDB;