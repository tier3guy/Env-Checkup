/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from "fs";
import path from "path";
import { RunValidateCommand } from "../../src/cli/commands/validate";

// Mock the FileService for controlled behavior
const baseDir = path.resolve("__tests__/mock-data");

const mockConfigPath = path.join(baseDir, "envcheck.config.json");
const mockEnvPath = path.join(baseDir, ".env");
const mockSchemaPath = path.join(baseDir, "env.schema.json");

function writeJSON(filePath: string, data: any) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function writeFile(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

beforeEach(() => {
  // Reset mock directory before each test
  fs.rmSync(baseDir, { recursive: true, force: true });
});

describe("EnvCheckup Validator - Rigorous Tests", () => {
  test("✅ passes for a valid .env and schema", async () => {
    writeFile(mockEnvPath, "PORT=8080\nDEBUG=true\nDATABASE_URL=https://api.test.com");
    writeJSON(mockSchemaPath, {
      PORT: { type: "Port", min: 0, max: 65535, required: true },
      DEBUG: { type: "Boolean", required: true },
      DATABASE_URL: { type: "Url", required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).resolves.not.toThrow();
  });

  test("❌ fails when required variable missing", async () => {
    writeFile(mockEnvPath, "PORT=8080");
    writeJSON(mockSchemaPath, {
      PORT: { type: "Port", required: true },
      DATABASE_URL: { type: "Url", required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/DATABASE_URL is required but missing/);
  });

  test("❌ fails invalid number type", async () => {
    writeFile(mockEnvPath, "PORT=abc");
    writeJSON(mockSchemaPath, {
      PORT: { type: "Number", min: 1000, max: 9999, required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/PORT must be a number/);
  });

  test("❌ fails if out of range (min/max)", async () => {
    writeFile(mockEnvPath, "PORT=99999");
    writeJSON(mockSchemaPath, {
      PORT: { type: "Port", min: 0, max: 65535, required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/PORT must be ≤ 65535/);
  });

  test("❌ fails invalid URL", async () => {
    writeFile(mockEnvPath, "DATABASE_URL=not_a_url");
    writeJSON(mockSchemaPath, {
      DATABASE_URL: { type: "Url", required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/DATABASE_URL must be a valid URL/);
  });

  test("❌ fails invalid Email", async () => {
    writeFile(mockEnvPath, "EMAIL=user@invalid");
    writeJSON(mockSchemaPath, {
      EMAIL: { type: "Email", required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/EMAIL must be a valid email address/);
  });

  test("❌ fails invalid JSON", async () => {
    writeFile(mockEnvPath, "CONFIG={invalid}");
    writeJSON(mockSchemaPath, {
      CONFIG: { type: "Json", required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/CONFIG must contain valid JSON/);
  });

  test("❌ fails invalid Enum", async () => {
    writeFile(mockEnvPath, "NODE_ENV=testing");
    writeJSON(mockSchemaPath, {
      NODE_ENV: { type: "Enum", enum: ["development", "production"], required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/NODE_ENV must be one of/);
  });

  test("❌ fails invalid Date", async () => {
    writeFile(mockEnvPath, "START_DATE=not_a_date");
    writeJSON(mockSchemaPath, {
      START_DATE: { type: "Date", required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/START_DATE must be a valid ISO date/);
  });

  test("❌ fails invalid Array (too short)", async () => {
    writeFile(mockEnvPath, "ALLOWED_ORIGINS=http://localhost");
    writeJSON(mockSchemaPath, {
      ALLOWED_ORIGINS: { type: "Array", minLength: 2, required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/ALLOWED_ORIGINS must contain at least/);
  });

  test("❌ fails invalid Custom regex", async () => {
    writeFile(mockEnvPath, "CODE=xyz-123");
    writeJSON(mockSchemaPath, {
      CODE: { type: "Custom", regex: "^[A-Z]{3}-[0-9]{4}$", required: true },
    });
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    await expect(RunValidateCommand()).rejects.toThrow(/CODE failed custom regex validation/);
  });

  test("⚠️ warns when extra env key not in schema", async () => {
    writeFile(mockEnvPath, "EXTRA_VAR=true");
    writeJSON(mockSchemaPath, {});
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: mockSchemaPath });

    const result = await RunValidateCommand().catch((err: any) => err.message);
    expect(result).toContain("EXTRA_VAR is not defined");
  });

  test("❌ fails if config file missing", async () => {
    await expect(RunValidateCommand()).rejects.toThrow(
      /Configuration file 'envcheck.config.json' not found/
    );
  });

  test("❌ fails if schema file missing", async () => {
    writeFile(mockEnvPath, "PORT=8080");
    writeJSON(mockConfigPath, { envPath: mockEnvPath, outputSchemaPath: "nonexistent.json" });

    await expect(RunValidateCommand()).rejects.toThrow(/Schema file not found/);
  });
});
