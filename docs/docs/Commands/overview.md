---
id: commands-overview
title: Overview
sidebar_position: 1
---

# 💻 CLI Commands Overview

Env Checkup provides a simple and intuitive **command-line interface (CLI)** to help you manage and validate your environment files efficiently.

There are **two primary commands**:
- `init` — Create or update your environment schema interactively  
- `validate` — Validate `.env` files against the defined schema  

---

## 🧩 Command List

| Command | Description |
|----------|-------------|
| [`init`](./init.md) | Interactively generate a `.env.schema.json` file |
| [`validate`](./validate.md) | Validate `.env` files using the defined schema |

---

## 🏗️ 1️⃣ `env-checkup init`

Use this command to generate a schema file based on your environment variables.

```bash
npx env-checkup init
````

### Example

```
? Enter variable name: DATABASE_URL
? Type of value (string/number/boolean): string
? Enter variable name: PORT
? Type of value: number
? Add another variable? (y/n): n
```

After completion, you’ll have a `.env.schema.json` file like:

```json
{
  "DATABASE_URL": "string",
  "PORT": "number",
  "JWT_SECRET": "string"
}
```

### Options

| Flag              | Description                    |
| ----------------- | ------------------------------ |
| `--output <path>` | Custom path for schema file    |
| `--overwrite`     | Overwrite existing schema file |

Learn more → [init command](./init.md)

---

## 🧩 2️⃣ `env-checkup validate`

Use this command to check whether your `.env` files match the schema.

```bash
npx env-checkup validate
```

### Example Output

```
✅ Valid variable: PORT = 3000
⚠️ Missing variable: JWT_SECRET
❌ Invalid type: DEBUG_MODE (expected boolean, got string)
```

### Options

| Flag              | Description                                 |
| ----------------- | ------------------------------------------- |
| `--schema <path>` | Path to schema file                         |
| `--dir <path>`    | Directory containing `.env` files           |
| `--strict`        | Enable strict mode (fails build if invalid) |
| `--ignore <vars>` | Comma-separated variables to skip           |

Learn more → [validate command](./validate.md)

---

## 🧠 Example Workflow

Here’s a typical workflow using both commands:

```bash
# Step 1 — Initialize schema
npx env-checkup init

# Step 2 — Validate .env files
npx env-checkup validate

# Step 3 — Enable strict validation in CI/CD
npx env-checkup validate --strict
```

---

## 🧰 npm Script Integration

Add the commands to your `package.json` for easy reuse:

```json
"scripts": {
  "env:init": "env-checkup init",
  "env:check": "env-checkup validate --strict"
}
```

Then run:

```bash
npm run env:init
npm run env:check
```

---

## 🧩 Supported Environments

Env Checkup works on:

* macOS
* Linux
* Windows (PowerShell and CMD)

And supports all standard `.env` variants automatically:

```
.env
.env.local
.env.example
.env.development
.env.production
```

---

## 🧭 Summary

| Command    | Purpose                                   | Typical Usage                       |
| ---------- | ----------------------------------------- | ----------------------------------- |
| `init`     | Generate environment schema interactively | `npx env-checkup init`              |
| `validate` | Validate `.env` files against schema      | `npx env-checkup validate`          |
| `--strict` | Enforce full validation                   | `npx env-checkup validate --strict` |

---

Next:

* [→ init Command](./init.md)
* [→ validate Command](./validate.md)
