import mongoose from "mongoose";

export async function connectDB(uri) {
  if (!uri) {
    console.warn("⚠️ MongoDB disabled (MONGO_URI not set)");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    console.warn("⚠️ App running without database");
  }
}
