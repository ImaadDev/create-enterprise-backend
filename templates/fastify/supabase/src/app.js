import Fastify from "fastify";
import requestContext from "./plugins/request-content.js";
import { registerRoutes } from "./routes.js";
import { globalErrorHandler } from "./utils/error-handler.js";
import { registerGenerated } from "./generated/register.js";


export async function buildApp() {
  const app = Fastify({ logger: true });

  // after creating app
await registerGenerated(app);

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
