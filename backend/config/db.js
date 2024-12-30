import mongoose from "mongoose"

try {
    await mongoose.connect(
        process.env.MONGO_URL
    );
    console.log("Database connected.");
} catch (error) {
    console.log("Error connecting database...");
    console.log(error);
}