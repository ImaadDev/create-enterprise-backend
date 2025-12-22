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

  const isCurrentDir =
    projectName === "." || projectName === "./";

  if (!isCurrentDir && (await fs.pathExists(targetDir))) {
    throw new Error(`Target folder already exists: ${projectName}`);
  }

  await fs.ensureDir(targetDir);

  await fs.copy(templateDir, targetDir, {
    overwrite: false,
    errorOnExist: true
  });

  // Rename package.json only when not using "."
  const pkgPath = path.join(targetDir, "package.json");
  if (!isCurrentDir && (await fs.pathExists(pkgPath))) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }
}
