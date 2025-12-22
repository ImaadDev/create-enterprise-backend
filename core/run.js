import path from "path";
import prompts from "prompts";
import chalk from "chalk";
import { generateProject } from "./scaffold.js";
import { installDeps } from "./install.js";

export async function run() {
  console.log(chalk.cyan.bold("\n🚀 Create Backend (Enterprise Scaffolder)\n"));

  const projectNameArg = process.argv[2];

  const answers = await prompts(
    [
      {
        type: projectNameArg ? null : "text",
        name: "projectName",
        message: "Project name?",
        validate: (v) =>
          v?.trim()?.length ? true : "Project name is required"
      },
      {
        type: "select",
        name: "framework",
        message: "Select framework",
        choices: [
          { title: "Express", value: "express" },
          { title: "Fastify", value: "fastify" }
        ]
      },
      {
        type: "select",
        name: "database",
        message: "Select database",
        choices: [
          { title: "MongoDB", value: "mongo" },
          { title: "Supabase", value: "supabase" }
        ]
      },
      {
        type: "toggle",
        name: "install",
        message: "Install dependencies now?",
        initial: true,
        active: "yes",
        inactive: "no"
      }
    ],
    {
      onCancel: () => {
        console.log(chalk.yellow("\n⛔ Cancelled.\n"));
        process.exit(0);
      }
    }
  );

  const projectName = (projectNameArg || answers.projectName).trim();
  const { framework, database } = answers;

  const targetDir =
    projectName === "." || projectName === "./"
      ? process.cwd()
      : path.join(process.cwd(), projectName);

  console.log(chalk.gray("\n📦 Generating project..."));

  await generateProject({
    framework,
    database,
    targetDir,
    projectName
  });

  if (answers.install) {
    console.log(chalk.gray("\n📥 Installing dependencies..."));
    await installDeps({ targetDir });
  }

  console.log(chalk.green.bold("\n✅ Done!\n"));

  if (projectName !== "." && projectName !== "./") {
    console.log(`Next steps:\n  cd ${projectName}\n  npm run dev\n`);
  } else {
    console.log(`Next steps:\n  npm run dev\n`);
  }
}
