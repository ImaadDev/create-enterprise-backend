import Fastify from "fastify";
import requestContext from "./plugins/request-content.js";
import { registerRoutes } from "./routes.js";
import { globalErrorHandler } from "./utils/error-handler.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(requestContext);

  app.get("/", async () => ({
    status: "ok",
    message: "Fastify Supabase Enterprise API"
  }));

  app.get("/health", async () => ({ status: "ok" }));

  registerRoutes(app);

  app.setErrorHandler(globalErrorHandler);

  return app;
}
