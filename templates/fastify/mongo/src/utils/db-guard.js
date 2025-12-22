import mongoose from "mongoose";

export function requireDB(req, reply, done) {
  if (mongoose.connection.readyState !== 1) {
    return reply.code(503).send({
      statusCode: 503,
      message: "Database not connected. Please configure MongoDB."
    });
  }
  done();
}
