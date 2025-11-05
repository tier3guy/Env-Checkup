---
id: intro
title: Introduction
sidebar_position: 1
---

# 🌿 Env Checkup

**Env Checkup** is a developer-friendly CLI tool that helps you **validate**, **audit**, and **generate schemas** for your environment configuration files (`.env`, `.env.local`, `.env.example`, etc.).  
It ensures your team never misses critical environment variables again — in development, staging, or production.

---

## 💡 Why Env Checkup?

Environment variables are essential, but they can easily become messy:
- Missing `.env` keys cause runtime errors  
- Outdated `.env.example` files confuse new developers  
- Typos lead to unpredictable bugs  

Env Checkup solves all of this by enforcing consistency and validation.

✅ **Detects** all `.env` files recursively  
✅ **Validates** keys against a schema  
✅ **Generates** schema automatically via CLI prompts  
✅ **Supports** CI/CD integration  
✅ **Works** with any JavaScript or TypeScript project  

---

## 🚀 What It Does

Env Checkup provides two main commands:

### 1️⃣ `env-checkup init`

Creates an environment schema interactively:

```bash
npx env-checkup init
````

You’ll be prompted to define your environment variables and their expected types:

```bash
? Enter variable name: DATABASE_URL
? Type of value (string/number/boolean): string
? Enter variable name: PORT
? Type of value: number
? Add another variable? (y/n): n
```

The tool then creates a `.env.schema.json` file like this:

```json
{
  "DATABASE_URL": "string",
  "PORT": "number"
}
```

---

### 2️⃣ `env-checkup validate`

Validates your environment variables against the generated schema.

```bash
npx env-checkup validate
```

Example output:

```
✅ Valid variable: PORT = 3000
⚠️ Missing variable: JWT_SECRET
❌ Invalid type: DEBUG_MODE (expected boolean, got string)
```

---

## ⚙️ Supported File Types

Env Checkup automatically detects and validates all standard `.env` formats:

```
.env
.env.local
.env.example
.env.development
.env.production
.env.test
.env.bat
```

You can even specify custom file patterns using CLI flags or config.

---

## 🧠 Example Project Structure

Here’s how a typical project looks with Env Checkup:

```
my-app/
 ┣ .env
 ┣ .env.example
 ┣ .env.schema.json
 ┣ package.json
 ┣ src/
 ┃ ┗ index.ts
```

---

## 🧩 Configuration Options

You can customize Env Checkup via a `.envcheckuprc.json` file in your root directory.

Example configuration:

```json
{
  "schemaPath": "./.env.schema.json",
  "envDir": "./",
  "strict": true,
  "ignore": ["NODE_ENV"]
}
```

### CLI Flags

You can also override these settings directly:

```bash
env-checkup validate --schema ./.env.schema.json --strict
```

---

## 🔄 Integration with CI/CD

Add Env Checkup to your CI pipeline to catch missing environment variables before deployment:

```bash
# GitHub Actions example
- name: Validate environment
  run: npx env-checkup validate --strict
```

If any variables are missing or invalid, the build will fail with a clear error message.

---

## 🧰 Example npm Scripts

To make validation easy for your team, add scripts to `package.json`:

```json
"scripts": {
  "env:init": "env-checkup init",
  "env:validate": "env-checkup validate"
}
```

Now developers can run:

```bash
npm run env:init
npm run env:validate
```

---

## 🛠️ Installation

You can install **Env Checkup** globally or locally.

### Global

```bash
npm install -g env-checkup
```

### Local (recommended)

```bash
npm install env-checkup --save-dev
```

Run it using `npx`:

```bash
npx env-checkup validate
```

---

## 🧭 When to Use Env Checkup

Use Env Checkup whenever:

* You have multiple `.env` files
* You onboard new developers frequently
* You deploy across multiple environments
* You want to catch missing configuration early

It’s especially useful for:

* **Next.js / Node.js / Express** projects
* **Monorepos** with shared environment variables
* **CI/CD validation** before production builds

---

## 🧾 Example Validation Error Output

```bash
$ npx env-checkup validate

⚠️ Missing variables:
  - DATABASE_URL
  - JWT_SECRET

❌ Invalid types:
  - PORT (expected number, got string)

✅ 3/5 variables valid
```

This makes it easy to identify and fix environment configuration issues immediately.

---

## 🧩 Summary

| Feature    | Description                                     |
| ---------- | ----------------------------------------------- |
| `init`     | Creates `.env.schema.json` interactively        |
| `validate` | Checks `.env` files against schema              |
| `--strict` | Exits with error if validation fails            |
| `--schema` | Use a custom schema path                        |
| `--dir`    | Validate `.env` files from a specific directory |

---

## 💬 Support & Contributing

We welcome contributions!
If you find a bug or want to add a feature:

```bash
git clone https://github.com/tier3guy/Env-Checkup.git
cd Env-Checkup
npm install
npm run dev
```

Then open a pull request 🚀

---

## ❤️ Credits

Built with 💚 by [tier3guy](https://tier3guy.com) who was tired of losing hours to broken `.env` files.

---

## 🔗 Links

* [GitHub Repository](https://github.com/tier3guy/Env-Checkup)
* [NPM Package](https://www.npmjs.com/package/env-checkup)
* [Documentation Home](./intro.md)


