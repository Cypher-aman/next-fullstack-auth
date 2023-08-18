import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", () => {
      console.log("Error connecting to MongoDB");
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong");
    console.error(error);
  }
};
