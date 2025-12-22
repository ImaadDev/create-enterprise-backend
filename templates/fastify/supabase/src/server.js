import { buildApp } from "./app.js";
import { env } from "./config/env.js";

const app = buildApp();

const MAX_PORT_TRIES = 20;

async function listenSilently(startPort) {
  let port = startPort;

  for (let i = 0; i < MAX_PORT_TRIES; i++) {
    try {
      await app.listen({ port });
      app.log.info(`🚀 Server running at http://localhost:${port}`);
      return;
    } catch (err) {
      if (err.code !== "EADDRINUSE") {
        throw err;
      }
      port++;
    }
  }

  throw new Error("No available ports found");
}

listenSilently(env.PORT);
