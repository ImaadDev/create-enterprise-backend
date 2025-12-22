import authRoutes from "./modules/auth/auth.routes.js";

export async function registerRoutes(app) {
  app.register(authRoutes, { prefix: "/api/auth" });
}
