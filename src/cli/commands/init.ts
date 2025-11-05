import path from "path";
import chalk from "chalk";
import { Command } from "commander";
import { FileService } from "../../utils/file.js";
import type { TInitCommandOptions } from "../../types.js";
import {
  GetBaseDirectoryName,
  GetConfigFilePath,
  GetSchemaFileName,
  ToRelativePosixPath,
} from "../../utils/utils.js";

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
  console.log(chalk.cyanBright(">_ Initializing env-checkup ...."));

  const inputPath = options.env ?? GetDefaultEnvPath();
  const outputPath = options.output ?? GetDefaultEnvSchemaOutputPath();
  const configFilePath = GetConfigFilePath();

  if (!options.env)
    console.log(chalk.dim(`>_ No --env flag provided. Using default: ${inputPath}`));
  if (!options.output)
    console.log(chalk.dim(`>_ No --output flag provided. Using default: ${outputPath}`));

  const fileService = FileService.getInstance();

  // Create envcheck.config.json
  try {
    if (fileService.exists(configFilePath)) {
      console.log(chalk.dim(">_ Clearing existing config JSON file ..."));
      fileService.deleteFile(configFilePath);
      console.log(chalk.dim(">_ Existing config JSON file deleted!"));
    }

    const config = {
      envPath: ToRelativePosixPath(inputPath),
      outputSchemaPath: ToRelativePosixPath(outputPath),
    };

    fileService.writeJSON(configFilePath, config);
    console.log(chalk.green(`>_ Config JSON file initialized successfully!`));
  } catch (error) {
    console.log(chalk.red(">_ Error creating config JSON file"), error);
  }
}

export function GetDefaultEnvPath(): string {
  const baseDir = GetBaseDirectoryName();
  return path.resolve(baseDir, ".env");
}

export function GetDefaultEnvSchemaOutputPath(): string {
  const baseDir = GetBaseDirectoryName();
  return path.resolve(baseDir, "env.schema.json");
}
