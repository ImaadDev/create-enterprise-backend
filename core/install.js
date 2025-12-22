import { execSync } from "child_process";

export async function installDeps({ targetDir }) {
  execSync("npm install", {
    cwd: targetDir,
    stdio: "inherit"
  });
}
