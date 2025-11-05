---
id: upcomings
title: Upcoming Features
sidebar_position: 7
---

# 🚀 Upcoming Features

Env Checkup is constantly evolving to make environment management even more reliable and developer-friendly.  
Here’s a preview of what’s coming next 👇

---

## 🧩 1️⃣ Multi-Schema Support

Allow projects to define multiple schema files for different environments:

```bash
.env.schema.development.json
.env.schema.production.json
.env.schema.test.json
```

You’ll be able to validate each environment explicitly:

```bash
npx env-checkup validate --schema ./.env.schema.production.json
```

---

## ⚙️ 2️⃣ TypeScript Type Generation

Automatically generate TypeScript definitions from `.env.schema.json`, enabling type-safe environment access in your codebase.

```bash
npx env-checkup generate-types
```

This will produce:

```ts
// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}
```

---

## 🧠 3️⃣ IDE Plugin Integration

A VS Code extension to:
- Auto-highlight invalid or missing environment variables
- Show inline hints for variable types
- Offer quick fixes (add to `.env.schema.json`)

Example:
```
⚠️ JWT_SECRET missing in .env
💡 Quick Fix → Add to schema
```

---

## 🧪 4️⃣ Auto Schema Sync

Env Checkup will automatically detect new variables in `.env` files and suggest schema updates interactively.

```bash
npx env-checkup sync
```

Example output:
```
New variable detected: REDIS_URL
Would you like to add it to the schema? (y/n)
```

---

## 🧾 5️⃣ JSON Report Output

Export validation results to a structured JSON report for CI/CD pipelines.

```bash
npx env-checkup validate --report ./logs/env-report.json
```

Example report:
```json
{
  "missing": ["JWT_SECRET"],
  "invalidTypes": ["DEBUG_MODE"],
  "validated": ["PORT", "DATABASE_URL"]
}
```

---

## 🔍 6️⃣ Variable Type Inference

When running `init`, Env Checkup will automatically detect variable types from values in existing `.env` files.

Example:
```
PORT=4000      → number
DEBUG=true     → boolean
API_URL=https  → string
```

No more manual input needed during schema generation.

---

## 🧩 7️⃣ Web Dashboard (Experimental)

A minimal web interface to:
- View all environment variables visually  
- Track validation results across multiple projects  
- Export or sync schemas from a central UI  

You’ll be able to run:

```bash
npx env-checkup dashboard
```

Then open in your browser:
```
http://localhost:5050
```

---

## 🧰 8️⃣ Custom Validators

Define your own variable rules via config:

```json
{
  "customValidators": {
    "EMAIL": "must contain '@'",
    "PORT": "must be > 0"
  }
}
```

Example usage:
```
⚠️ EMAIL does not contain '@'
❌ PORT must be greater than 0
```

---

## 🧭 9️⃣ Better CI/CD Integration

- GitLab and Jenkins support  
- Built-in summary output for CI logs  
- Exit code mapping for easy pipeline control

```bash
npx env-checkup validate --strict --ci
```

Example CI summary:
```
Env Checkup Summary:
✅ 5 valid
⚠️ 1 missing
❌ 1 invalid
Exit Code: 1
```

---

## 🧱 10️⃣ Monorepo Support

Allow validating multiple packages in a monorepo with independent `.env` and schema files:

```
packages/
 ┣ api/
 ┃ ┣ .env
 ┃ ┗ .env.schema.json
 ┣ web/
 ┃ ┣ .env
 ┃ ┗ .env.schema.json
```

Validate them all at once:

```bash
npx env-checkup validate --all
```

---

## 🧾 Future Commands (Under Research)

| Command | Description |
|----------|-------------|
| `env-checkup sync` | Sync missing variables from `.env` to schema |
| `env-checkup report` | Generate a detailed validation report in JSON or HTML |
| `env-checkup generate-types` | Create TypeScript definitions for environment variables |
| `env-checkup dashboard` | Open local dashboard for env management |

---

## 🧩 Community Suggestions

We’re open to contributions and ideas!  
If you have a feature request, open an issue on GitHub:

```bash
https://github.com/your-username/env-checkup/issues
```

Or contribute directly via pull request 🚀

---

## 🏁 Summary

| Category | Features |
|-----------|-----------|
| Validation Enhancements | Multi-schema, Auto Sync, Custom Validators |
| Developer Experience | IDE Plugin, TypeScript Types |
| CI/CD & Reporting | JSON Reports, Exit Codes, Pipeline Integration |
| Advanced Features | Dashboard, Monorepo Support |

---

Env Checkup’s mission is simple —  
**to make managing `.env` files effortless, transparent, and reliable for every developer and team.**
