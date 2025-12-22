import { register, login, me } from "./auth.controller.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { requireDB } from "../../utils/db-guard.js";
import { requireAuth } from "../../utils/jwt-guard.js";

export default async function authRoutes(app) {
  app.post("/register", {
    preHandler: requireDB,
    schema: registerSchema,
    handler: register
  });

  app.post("/login", {
    preHandler: requireDB,
    schema: loginSchema,
    handler: login
  });

  // 🔐 JWT protected route
  app.get("/me", {
    preHandler: [requireDB, requireAuth],
    handler: me
  });
}
