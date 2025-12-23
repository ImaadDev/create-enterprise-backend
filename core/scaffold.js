import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from "url";

function getPackageRoot() {
  const __filename = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(__filename), "..");
}

const DB_MAP = {
  mongo: "mongo",
  supabase: "supabase"
};

export async function generateProject({
  framework,
  database,
  features = [],
  targetDir,
  projectName
}) {
  const root = getPackageRoot();
  const dbFolder = DB_MAP[database];

  if (!dbFolder) {
    throw new Error(`Unsupported database: ${database}`);
  }

  const templateDir = path.join(root, "templates", framework, dbFolder);

  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`Template not found: ${framework}/${dbFolder}`);
  }

  const isCurrentDir = projectName === "." || projectName === "./";

  await fs.ensureDir(targetDir);

  // 🔒 EMPTY DIRECTORY CHECK
  if (isCurrentDir) {
    const entries = await fs.readdir(targetDir);
    const allowed = [".git", ".gitignore", ".DS_Store"];

    const unsafe = entries.filter(e => !allowed.includes(e));
    if (unsafe.length > 0) {
      throw new Error(
        "Current directory is not empty. Please use an empty folder."
      );
    }
  } else {
    if (
      (await fs.pathExists(targetDir)) &&
      (await fs.readdir(targetDir)).length
    ) {
      throw new Error(`Target folder already exists: ${projectName}`);
    }
  }

  /* --------------------------------------------------
     1️⃣ COPY BASE TEMPLATE (THIS WAS MISSING)
  -------------------------------------------------- */
  await fs.copy(templateDir, targetDir, {
  filter: (src) => {
    // ❌ do NOT copy features folder
    if (src.includes(`${path.sep}features`)) return false;
    return true;
  }
});


  /* --------------------------------------------------
     2️⃣ FEATURE OVERLAY (MERGE INTO src/)
  -------------------------------------------------- */
  const srcDir = path.join(targetDir, "src");

  for (const feature of features) {
    const featureDir = path.join(templateDir, "features", feature);

    if (await fs.pathExists(featureDir)) {
      await fs.copy(featureDir, srcDir, { overwrite: true });
    }
  }

  /* --------------------------------------------------
     3️⃣ AUTO-GENERATED FEATURE REGISTRATION
  -------------------------------------------------- */
  const generatedDir = path.join(srcDir, "generated");
  await fs.ensureDir(generatedDir);

  const registerFile = path.join(generatedDir, "register.js");
  await fs.writeFile(registerFile, buildRegisterFile(features), "utf8");

  /* --------------------------------------------------
     4️⃣ RENAME package.json (IF NEEDED)
  -------------------------------------------------- */
  const pkgPath = path.join(targetDir, "package.json");
  if (!isCurrentDir && (await fs.pathExists(pkgPath))) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }
}

/* --------------------------------------------------
   INTERNAL HELPER (DO NOT EXPORT)
-------------------------------------------------- */
function buildRegisterFile(features) {
  let content = `// AUTO-GENERATED - DO NOT EDIT
export async function registerGenerated(app) {
`;

  if (features.includes("auth")) {
    content += `
  const authPlugin = (await import("../plugins/auth.js")).default;
  const authRoutes = (await import("../modules/auth/auth.routes.js")).default;

  await app.register(authPlugin);
  await app.register(authRoutes, { prefix: "/api/auth" });
`;
  }

  if (features.includes("refresh-token")) {
    content += `
  const refreshStore = (await import("../plugins/refresh.store.js")).default;
  const refreshRoutes = (await import("../modules/auth/refresh.routes.js")).default;

  await app.register(refreshStore);
  await app.register(refreshRoutes, { prefix: "/api/auth" });
`;
  }

  content += `
}
`;
  return content;
}

