#!/usr/bin/env node

import { run } from "../core/run.js";

run().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
