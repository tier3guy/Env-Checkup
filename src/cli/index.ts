#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import { InitCommand } from "./commands/init.js";
// import { ValidateCommand } from "./commands/validate.js";

const program = new Command();

program
  .name("env-checkup")
  .description(
    chalk.cyan(
      "A lightweight utility to validate and manage environment variables in Node.js projects with type safety and helpful error messages."
    )
  )
  .version("0.1.0");

// Commands
program.addCommand(InitCommand());
// program.addCommand(ValidateCommand());

program.parse(process.argv);
