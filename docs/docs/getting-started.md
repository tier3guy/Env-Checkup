---
id: getting-started
title: Getting Started
sidebar_position: 2
---

# 🚀 Getting Started

Welcome to **Env Checkup** — a simple and powerful CLI tool to **generate**, **validate**, and **enforce consistency** in your `.env` files.

This guide will help you install, configure, and run your first validation in under 2 minutes.

---

## 🧩 Prerequisites

Before getting started, make sure you have:

- **Node.js ≥ 18**
- **npm** or **yarn** installed
- A project containing one or more `.env` files

Example project structure:

```

my-app/
┣ .env
┣ .env.example
┣ src/
┃ ┗ index.ts
┗ package.json

````

---

## ⚙️ Installation

You can install Env Checkup **globally** (to use the CLI anywhere) or **locally** (per project).

### 🪴 Global Installation
```bash
npm install -g env-checkup
````

Once installed, you can run it directly:

```bash
env-checkup --help
```

---

### 🌱 Local Installation (Recommended)

```bash
npm install env-checkup --save-dev
```

Then add it to your `package.json` scripts:

```json
"scripts": {
  "env:init": "env-checkup init",
  "env:validate": "env-checkup validate"
}
```

Now you can run:

```bash
npm run env:init
npm run env:validate
```

---

## 🏗️ Step 1 — Initialize Your Schema

Run the `init` command to create a schema file interactively.

```bash
npx env-checkup init
```

You’ll be prompted for each environment variable and its type:

```bash
? Enter variable name: DATABASE_URL
? Type of value (string/number/boolean): string
? Enter variable name: PORT
? Type of value: number
? Add another variable? (y/n): n
```

Env Checkup will generate a `.env.schema.json` file in your project root.

Example:

```json
{
  "DATABASE_URL": "string",
  "PORT": "number",
  "JWT_SECRET": "string"
}
```

---

## 🔍 Step 2 — Validate Your `.env` Files

Run the `validate` command to check your `.env` files against the schema.

```bash
npx env-checkup validate
```

Example output:

```
✅ Valid variable: PORT = 3000
⚠️ Missing variable: JWT_SECRET
❌ Invalid type: TIMEOUT (expected number, got string)
```

---

## ⚙️ Step 3 — Add to CI/CD

Integrate Env Checkup into your CI pipeline to ensure every deployment has valid environment variables.

**Example: GitHub Actions**

```yaml
- name: Validate Environment
  run: npx env-checkup validate --strict
```

If validation fails, the build will stop — preventing incomplete deployments.

---

## 🧩 Step 4 — Custom Configuration (Optional)

You can configure Env Checkup globally via `.envcheckuprc.json` in your project root.

Example configuration:

```json
{
  "schemaPath": "./.env.schema.json",
  "envDir": "./",
  "strict": true,
  "ignore": ["NODE_ENV"]
}
```

Alternatively, pass options through CLI flags:

```bash
env-checkup validate --schema ./.env.schema.json --strict
```

---

## 🧠 Example Workflow

A complete example from start to finish:

```bash
# Step 1 — Create schema
npx env-checkup init

# Step 2 — Validate .env files
npx env-checkup validate

# Step 3 — Enforce in CI/CD
npx env-checkup validate --strict
```

Result:

```
✅ All environment variables validated successfully!
```

---

## 🧰 Example npm Scripts

Add reusable scripts for your team:

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

## 🧩 Step 5 — Supported `.env` Files

Env Checkup automatically detects and validates the following:

```
.env
.env.local
.env.example
.env.development
.env.production
.env.test
.env.bat
```

You don’t need to configure this — it just works out of the box.

---

## 🧾 Example Project Validation Output

Here’s what a real project validation looks like:

```bash
$ npx env-checkup validate

Checking .env and .env.local...

✅ PORT = 3000
✅ DATABASE_URL = postgresql://localhost/db
⚠️ Missing variable: JWT_SECRET
❌ Invalid type: DEBUG_MODE (expected boolean, got string)

Summary:
3/5 variables valid
2 issues detected
```

---

## 💡 Tips

* Always include your `.env.schema.json` in version control
* Add `.env` to `.gitignore`
* Run validation before deploying your app
* Share the schema file with your teammates

---

## 🧭 Next Steps

* Learn more about [Configuration](./configuration.md)
* Explore available [CLI Commands](/docs/Commands/commands-overview)
* Check out [FAQ](./faq.md) for common troubleshooting

---

## 🧑‍💻 Example for Next.js Users

If you’re using Next.js, you can validate environment variables before starting your dev server:

```bash
"scripts": {
  "dev": "env-checkup validate --strict && next dev"
}
```

This ensures the app only runs if `.env` is valid.

---

## 🧩 Summary

| Step | Command                    | Description                         |
| ---- | -------------------------- | ----------------------------------- |
| 1️⃣  | `npx env-checkup init`     | Generate schema interactively       |
| 2️⃣  | `npx env-checkup validate` | Validate `.env` files               |
| 3️⃣  | `--strict`                 | Fail build if variables are missing |
| 4️⃣  | `--schema`                 | Custom schema file path             |
| 5️⃣  | `--dir`                    | Validate from specific directory    |

---

## 🏁 Conclusion

🎉 You’ve successfully set up **Env Checkup**!
You can now ensure every developer and every environment stays consistent — no more “missing `.env` variable” surprises.

Next: [Configuration →](./configuration.md)

