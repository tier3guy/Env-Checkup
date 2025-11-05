import path from "path";
import chalk from "chalk";
import dotenv from "dotenv";
import { Command } from "commander";
import { FileService } from "../../utils/file.js";
import { ValidateEnv } from "../../core/validator.js";
import { GetSchemaFileName } from "../../utils/utils.js";

export function ValidateCommand(): Command {
  const command = new Command("validate");

  command
    .description("Validate your .env file against the generated " + GetSchemaFileName())
    // .option("-e, --env <path>", "Path to .env file", ".env")
    // .option("-s, --schema <path>", "Path to schema JSON file", GetSchemaFileName())
    .action(async () => {
      await RunValidateCommand();
    });

  return command;
}

export async function RunValidateCommand() {
  try {
    const fileService = FileService.getInstance();

    const configPath = path.resolve("envcheck.config.json");

    if (!fileService.exists(configPath)) {
      console.error(
        chalk.red(
          "❌ Configuration file 'envcheck.config.json' not found. Run 'env-checkup init' first."
        )
      );
      process.exit(1);
    }

    const config = JSON.parse(fileService.readFile(configPath));
    const envPath = path.resolve(config.envPath);
    const schemaPath = path.resolve(config.outputSchemaPath);

    console.log(chalk.dim(`⚙️  Using config from: ${configPath}`));
    console.log(chalk.dim(`📄 Env file: ${envPath}`));
    console.log(chalk.dim(`📘 Schema file: ${schemaPath}`));

    if (!fileService.exists(envPath)) {
      console.error(chalk.red(`❌ .env file not found at: ${envPath}`));
      process.exit(1);
    }

    if (!fileService.exists(schemaPath)) {
      console.error(chalk.red(`❌ Schema file not found at: ${schemaPath}`));
      process.exit(1);
    }

    const envContent = dotenv.parse(fileService.readFile(envPath));
    const schema = JSON.parse(fileService.readFile(schemaPath));

    console.log(chalk.cyan(`🧩 Loaded ${Object.keys(envContent).length} environment variables`));
    console.log(chalk.cyan(`📘 Loaded schema with ${Object.keys(schema).length - 3} definitions`));

    const results = ValidateEnv(envContent, schema);

    if (results.errors.length > 0) {
      console.log(
        chalk.redBright(`\n❌ Validation failed with ${results.errors.length} issue(s):\n`)
      );
      results.errors.forEach((err) => console.log("   " + chalk.red("• " + err)));
      process.exit(1);
    } else {
      console.log(chalk.greenBright("\n✅ All environment variables are valid!"));
    }

    if (results.warnings.length > 0) {
      console.log();
      console.log(chalk.yellow(`⚠️ ${results.warnings.length} warning(s):`));
      results.warnings.forEach((w) => console.log("   " + chalk.yellow("• " + w)));
    }
  } catch (error) {
    console.log(chalk.red(`❌ Error occured while validating env: `), error);
    process.exit(1);
  }
}
