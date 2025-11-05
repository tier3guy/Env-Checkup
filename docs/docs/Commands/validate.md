---
id: command-validate
title: Validate Command
sidebar_position: 3
---

# 🧩 `env-checkup validate`

The **`validate`** command verifies that all your `.env` files match the definitions in your `.env.schema.json`.  
It ensures that **every required environment variable** exists, has the correct type, and that no unwanted or missing values cause runtime issues.

---

## 🧩 Usage

Run the following command inside your project root:

```bash
npx env-checkup validate
````

---

## 🧠 What It Does

When executed, Env Checkup will:

1. Load your configuration from `envcheckup.config.json` (if available).
2. Discover all `.env` files recursively (e.g., `.env`, `.env.local`, `.env.example`).
3. Load your `.env.schema.json` for expected variables and types.
4. Compare each `.env` file’s values with the schema.
5. Report missing or invalid variables, and success for valid ones.

---

## 💬 Example Output

```bash
$ npx env-checkup validate

🔍 Checking environment files...

✅ PORT = 3000
✅ DATABASE_URL = postgres://localhost:5432/mydb
⚠️ Missing variable: JWT_SECRET
❌ Invalid type: DEBUG (expected boolean, got string)

Summary:
3/5 variables valid
2 issues found
```

---

## 📄 Example `.env` File

```
PORT=3000
DATABASE_URL=postgres://localhost/mydb
DEBUG=true
```

## 📘 Example `.env.schema.json`

```json
{
  "PORT": "number",
  "DATABASE_URL": "string",
  "JWT_SECRET": "string",
  "DEBUG": "boolean"
}
```

Env Checkup compares these and immediately points out any missing or mismatched variables.

---

## ⚙️ Options

| Flag              | Description                                                            | Example                                                  |
| ----------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| `--schema <path>` | Specify a custom schema file path                                      | `env-checkup validate --schema ./config/env.schema.json` |
| `--dir <path>`    | Specify directory to search for `.env` files                           | `env-checkup validate --dir ./envs`                      |
| `--strict`        | Fail the command (non-zero exit) if any variable is missing or invalid | `env-checkup validate --strict`                          |
| `--ignore <vars>` | Comma-separated variables to ignore during validation                  | `env-checkup validate --ignore NODE_ENV,DEBUG`           |
| `--debug`         | Show detailed output (loaded config, found files, and schema path)     | `env-checkup validate --debug`                           |

---

## 🧩 Example Commands

### Validate using the default schema:

```bash
npx env-checkup validate
```

### Validate using a custom schema:

```bash
npx env-checkup validate --schema ./config/env.schema.json
```

### Validate files in a specific directory:

```bash
npx env-checkup validate --dir ./config
```

### Run in strict mode (useful for CI/CD):

```bash
npx env-checkup validate --strict
```

If any issues are found, the process exits with a **non-zero status code**, which is perfect for automated pipelines.

### Ignore specific variables:

```bash
npx env-checkup validate --ignore NODE_ENV,DEBUG
```

---

## 🧠 Example CI/CD Integration

To ensure your environment is valid before deploying, add Env Checkup to your CI pipeline.

**GitHub Actions example:**

```yaml
- name: Validate Environment Variables
  run: npx env-checkup validate --strict
```

If validation fails, the workflow stops immediately — preventing bad configurations from being deployed.

---

## 🧩 Example Project Structure

```
my-app/
 ┣ .env
 ┣ .env.local
 ┣ .env.schema.json
 ┣ envcheckup.config.json
 ┣ package.json
 ┗ src/
   ┗ index.ts
```

---

## 🧾 Example npm Script

You can simplify validation for your team by adding a script to `package.json`:

```json
"scripts": {
  "env:validate": "env-checkup validate --strict"
}
```

Then run:

```bash
npm run env:validate
```

---

## 🧰 Debug Mode

Run in debug mode to inspect configuration and file discovery:

```bash
npx env-checkup validate --debug
```

Output example:

```
Loaded config: envcheckup.config.json
Schema path: ./.env.schema.json
Discovered files: [".env", ".env.local"]
Validating...
✅ PORT = 3000
⚠️ Missing variable: JWT_SECRET
```

---

## 🧩 Summary

| Command                    | Description                           |
| -------------------------- | ------------------------------------- |
| `npx env-checkup validate` | Validate `.env` files using schema    |
| `--schema <path>`          | Use a custom schema path              |
| `--dir <path>`             | Specify directory to search           |
| `--strict`                 | Fail build if any variable is missing |
| `--ignore <vars>`          | Skip validation for listed variables  |
| `--debug`                  | Show detailed validation process      |

---

## 🏁 Recommended Workflow

```bash
# Step 1 — Create schema file
npx env-checkup init

# Step 2 — Validate .env files
npx env-checkup validate

# Step 3 — Enforce strict mode in CI/CD
npx env-checkup validate --strict
```

---

✅ **Pro Tip:**
Always commit `.env.schema.json` and `envcheckup.config.json` to version control — this keeps your environment setup consistent across all team members and deployments.
