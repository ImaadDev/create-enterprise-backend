import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";
import { globalErrorHandler } from "./utils/error-handler.js";

export function buildApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Root
  app.get("/", (req, res) => {
    res.json({
      status: "ok",
      message: "Express API is running"
    });
  });

  // Health
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Register ALL routes
  registerRoutes(app);

  // ❌ 404 Not Found Handler (Express way)
  app.use((req, res, next) => {
    res.status(404).json({
      statusCode: 404,
      message: "Route not found",
      path: req.originalUrl
    });
  });

  // ✅ Global Error Handler (MUST be last)
  app.use(globalErrorHandler);

  return app;
}
