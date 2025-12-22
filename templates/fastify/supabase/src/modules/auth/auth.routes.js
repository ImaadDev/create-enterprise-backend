import { me } from "./auth.controller.js";
import { requireAuth } from "../../utils/auth-guard.js";

export default async function authRoutes(app) {
  app.get("/me", {
    preHandler: requireAuth,
    handler: me
  });
}
