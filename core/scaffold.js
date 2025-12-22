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

  // 🔒 EMPTY DIRECTORY CHECK (CRITICAL)
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
    if ((await fs.pathExists(targetDir)) && (await fs.readdir(targetDir)).length) {
      throw new Error(`Target folder already exists: ${projectName}`);
    }
  }

  // ✅ SAFE COPY
  await fs.copy(templateDir, targetDir);

  // Rename package.json only when not using "."
  const pkgPath = path.join(targetDir, "package.json");
  if (!isCurrentDir && (await fs.pathExists(pkgPath))) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }
}
