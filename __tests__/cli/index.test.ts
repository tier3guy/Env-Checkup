import fs from "fs";
import path from "path";
import { execa } from "execa";

const CLI_PATH = path.resolve("./dist/cli/index.js");

describe("🧩 env-checkup CLI", () => {
  beforeAll(() => {
    if (!fs.existsSync(CLI_PATH)) {
      throw new Error(
        `CLI build file not found at ${CLI_PATH}. Run "npm run build" before running CLI tests.`
      );
    }
  });

  test("should show version with --version", async () => {
    const { stdout, exitCode } = await execa("node", [CLI_PATH, "--version"]);
    expect(exitCode).toBe(0);
    expect(stdout).toMatch(/^0\.1\.0/);
  });

  test("should show help with --help", async () => {
    const { stdout, exitCode } = await execa("node", [CLI_PATH, "--help"]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("A lightweight utility to validate and manage environment variables");
    expect(stdout).toContain("init");
    expect(stdout).toContain("validate");
  });

  test("should show help for init command", async () => {
    const { stdout, exitCode } = await execa("node", [CLI_PATH, "init", "--help"]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Generate environment schema and configuration file");
    expect(stdout).toContain("--env");
    expect(stdout).toContain("--output");
  });

  test("should show help for validate command", async () => {
    const { stdout, exitCode } = await execa("node", [CLI_PATH, "validate", "--help"]);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Validate your .env file");
  });

  test("should gracefully fail on unknown command", async () => {
    const { stderr, exitCode } = await execa("node", [CLI_PATH, "unknown"], { reject: false });
    expect(exitCode).not.toBe(0);
    expect(stderr).toContain("error: unknown command");
  });

  test("should run init command without errors (dry run)", async () => {
    // We only care that it doesn’t crash — not its full logic here
    const { stdout, exitCode } = await execa("node", [CLI_PATH, "init"], {
      reject: false,
    });
    expect([0, 1]).toContain(exitCode); // may fail gracefully if missing .env
    expect(stdout).toMatch(/Initializing|Using default/i);
  });

  test("should run validate command gracefully when no config", async () => {
    const { stderr, exitCode } = await execa("node", [CLI_PATH, "validate"], {
      reject: false,
    });
    expect(exitCode).toBe(1); // Should fail due to missing config
    expect(stderr).toMatch(/Configuration file 'envcheck.config.json' not found/);
  });
});
