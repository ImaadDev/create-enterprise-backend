import mongoose from "mongoose";

export function requireDB(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      statusCode: 503,
      message: "Database not connected. Please configure MongoDB."
    });
  }
  next();
}
