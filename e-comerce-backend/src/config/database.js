import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const connectionString =
      "mongodb+srv://root:337739aa@cluster0.zwlm9jh.mongodb.net/e-comerce?retryWrites=true&w=majority";
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
