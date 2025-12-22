import { buildApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const app = buildApp();

await connectDB(env.MONGO_URI, app.log);

app.listen({ port: env.PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`🚀 Server running at ${address}`);
});
