import authRoutes from "./modules/auth/auth.routes.js";
// later you can add more:
// import userRoutes from "./modules/users/user.routes.js";

export async function registerRoutes(app) {
  // Auth routes
  app.register(authRoutes, { prefix: "/api/auth" });

  // Future modules
  // app.register(userRoutes, { prefix: "/api/users" });
}
