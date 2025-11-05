import path from "path";
import chalk from "chalk";
import {
  GetConfigFilePath,
  GetSchemaFileName,
  ToRelativePosixPath,
  GetBaseDirectoryName,
} from "../../utils/utils.js";
import { Command } from "commander";
import { FileService } from "../../utils/file.js";
import type { TInitCommandOptions } from "../../types.js";
import { GenerateSchemaFile } from "../../core/schema-generator.js";

export function InitCommand(): Command {
  const command = new Command();

  command
    .name("init")
    .description("Generate environment schema and configuration file")
    .option("-e, --env <path>", "Relative path to .env file from root directory", undefined)
    .option("-o, --output <path>", "Relative output path from root directory for schema", undefined)
    .action(async (options: TInitCommandOptions) => {
      try {
        await RunInitCommand({
          env: options.env ? path.resolve(GetBaseDirectoryName(), options.env) : undefined,
          output: options.output
            ? path.resolve(GetBaseDirectoryName(), options.output, GetSchemaFileName())
            : undefined,
        });
      } catch (error) {
        console.log(chalk.red(">_ Error occured while executing init command: "), error);
        process.exit(1);
      }
    });

  return command;
}

export async function RunInitCommand(options: TInitCommandOptions): Promise<void> {
  console.log();
  console.log(chalk.cyanBright("🚀 Initializing env-checkup ...."));

  const inputPath = options.env ?? GetDefaultEnvPath();
  const outputPath = options.output ?? GetDefaultEnvSchemaOutputPath();
  const configFilePath = GetConfigFilePath();

  if (!options.env)
    console.log(chalk.dim(`🧩 No --env flag provided. Using default: ${inputPath}`));
  if (!options.output)
    console.log(chalk.dim(`🧩 No --output flag provided. Using default: ${outputPath}`));

  const fileService = FileService.getInstance();

  // Create envcheck.config.json
  try {
    if (fileService.exists(configFilePath)) {
      console.log();
      console.log(chalk.dim("🧹 Clearing existing config JSON file ..."));
      fileService.deleteFile(configFilePath);
      console.log(chalk.dim("🗑️  Existing config JSON file deleted!"));
      console.log();
    }

    const config = {
      envPath: ToRelativePosixPath(inputPath),
      outputSchemaPath: ToRelativePosixPath(outputPath),
    };

    fileService.writeJSON(configFilePath, config);
    console.log(chalk.green(`✅ Config JSON file initialized successfully!`));
    console.log(chalk.cyan(`📄 Created at: ${chalk.underline(configFilePath)}\n`));
  } catch (error) {
    console.log(chalk.red("❌ Error creating config JSON file"), error);
  }

  // Generate Schema File
  await GenerateSchemaFile(inputPath, outputPath);
}

export function GetDefaultEnvPath(): string {
  const baseDir = GetBaseDirectoryName();
  return path.resolve(baseDir, ".env");
}

export function GetDefaultEnvSchemaOutputPath(): string {
  const baseDir = GetBaseDirectoryName();
  return path.resolve(baseDir, GetSchemaFileName());
}
