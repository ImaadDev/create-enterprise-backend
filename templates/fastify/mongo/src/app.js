import Fastify from "fastify";
import { globalErrorHandler } from "./utils/error-handler.js";
import { registerRoutes } from "./routes.js";
import jwtPlugin from "./plugins/jwt.js";
import { env } from "./config/env.js";

export function buildApp() {
  const app = Fastify({ logger: true });

   

  // JWT plugin
  app.register(jwtPlugin, { secret: env.JWT_SECRET });

  // Root
  app.get("/", async () => ({
    status: "ok",
    message: "Fastify API is running"
  }));

  // Health
  app.get("/health", async () => ({
    status: "ok"
  }));

  // Register ALL routes here
  registerRoutes(app);

  // Global error handler (must be last)
app.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    statusCode: 404,
    message: "Route not found",
    path: request.url
  });
});


  return app;
}
