import authRoutes from "./modules/auth/auth.routes.js";

export function registerRoutes(app) {
  app.use("/api/auth", authRoutes);
}
