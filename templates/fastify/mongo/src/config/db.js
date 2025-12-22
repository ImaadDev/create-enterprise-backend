import mongoose from "mongoose";

export async function connectDB(uri, logger = console) {
  if (!uri) {
    logger.warn("⚠️  MongoDB disabled (MONGO_URI not set)");
    return;
  }

  try {
    await mongoose.connect(uri);
    logger.info("✅ MongoDB connected");
  } catch (err) {
    logger.error("❌ MongoDB connection failed:", err.message);
    logger.warn("⚠️  Continuing without database");
  }
}
