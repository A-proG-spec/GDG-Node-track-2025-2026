import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
