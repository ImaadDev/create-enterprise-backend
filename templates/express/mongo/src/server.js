import { buildApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const app = buildApp();

await connectDB(env.MONGO_URI);

app.listen(env.PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${env.PORT}`);
});
