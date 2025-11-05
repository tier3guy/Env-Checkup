import path from "path";
import chalk from "chalk";
import dotenv from "dotenv";
import { FileService } from "../utils/file.js";
import { ToRelativePosixPath } from "../utils/utils.js";
import { addSchemaDocumentation, inferEnvSchema } from "../utils/schema-generator.js";

export async function GenerateSchemaFile(envPath: string, outputPath: string): Promise<void> {
  const fileService = FileService.getInstance();

  console.log(chalk.cyan(`📖 Reading .env file from: ${chalk.yellow(envPath)}`));

  if (!fileService.exists(envPath)) {
    console.error(chalk.red(`❌ .env file not found at path: ${envPath}`));
    process.exit(1);
  }

  const envContent = fileService.readFile(envPath);
  const parsed = dotenv.parse(envContent);

  console.log(chalk.cyan(`🔍 Parsed ${Object.keys(parsed).length} environment variables`));

  // Step 1 — Infer variable types intelligently
  const inferredSchema = inferEnvSchema(parsed);

  // Step 2 — Add schema documentation header
  const documentedSchema = addSchemaDocumentation(inferredSchema);

  // Step 3 — Write JSON file
  const absoluteOutput = path.resolve(outputPath);
  fileService.writeFile(absoluteOutput, JSON.stringify(documentedSchema, null, 2));

  const relativeOutput = ToRelativePosixPath(absoluteOutput);
  console.log(
    chalk.green(`✅ Schema JSON file generated successfully: ${chalk.bold(relativeOutput)}\n`)
  );
}
