---
id: command-init
title: Init Command
sidebar_position: 2
---

# 🏗️ `env-checkup init`

The **`init`** command helps you quickly **generate a schema file** that defines all the environment variables required in your project.  
This schema file is later used by the `validate` command to ensure consistency and correctness in your `.env` files.

---

## 🧩 Usage

Run the following command in your project root:

```bash
npx env-checkup init
````

---

## 🪄 What It Does

1. Scans your existing `.env` files (if any).
2. Prompts you to add environment variables interactively.
3. Asks for the **expected data type** of each variable (`string`, `number`, or `boolean`).
4. Generates a new `.env.schema.json` file (or updates an existing one).

---

## 💬 Example Interactive Session

```bash
$ npx env-checkup init

? Enter variable name: DATABASE_URL
? Type of value (string/number/boolean): string
? Enter variable name: PORT
? Type of value: number
? Enter variable name: JWT_SECRET
? Type of value: string
? Add another variable? (y/n): n
✔ Schema file generated successfully at ./.env.schema.json
```

---

## 📄 Output File

Once complete, Env Checkup creates a file named `.env.schema.json` in your project root.

Example:

```json
{
  "DATABASE_URL": "string",
  "PORT": "number",
  "JWT_SECRET": "string"
}
```

This schema acts as the **source of truth** for what variables are expected in your `.env` files.

---

## ⚙️ Options

| Flag              | Description                                                               | Example                                              |
| ----------------- | ------------------------------------------------------------------------- | ---------------------------------------------------- |
| `--output <path>` | Specify a custom location for the generated schema file                   | `env-checkup init --output ./config/env.schema.json` |
| `--overwrite`     | Force overwrite if `.env.schema.json` already exists                      | `env-checkup init --overwrite`                       |
| `--yes`           | Skip prompts and generate schema automatically from existing `.env` files | `env-checkup init --yes`                             |

---

## 🧠 Example with Options

### Generate schema to a custom directory:

```bash
npx env-checkup init --output ./config/env.schema.json
```

### Overwrite existing schema file:

```bash
npx env-checkup init --overwrite
```

### Automatically detect variables (non-interactive mode):

```bash
npx env-checkup init --yes
```

Env Checkup will look for `.env` files, read all key names, and infer types automatically where possible.

---

## 🧾 Example Project Structure

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

## 🧩 Example `.env` File

```
PORT=4000
DATABASE_URL=postgres://localhost:5432/mydb
JWT_SECRET=supersecretkey
DEBUG=true
```

After running `env-checkup init`, you get:

```json
{
  "PORT": "number",
  "DATABASE_URL": "string",
  "JWT_SECRET": "string",
  "DEBUG": "boolean"
}
```

---

## 🧭 Tips

✅ Always commit `.env.schema.json` to version control
🚫 Never commit `.env` or `.env.local` files
🧪 Re-run `env-checkup init` whenever new environment variables are introduced
🔁 Use `--overwrite` when regenerating schema intentionally

---

## 🧰 Example npm Script

To make schema generation easier for your team, add this script to your `package.json`:

```json
"scripts": {
  "env:init": "env-checkup init"
}
```

Then run:

```bash
npm run env:init
```

---

## 🧾 Summary

| Command                | Description                            |
| ---------------------- | -------------------------------------- |
| `npx env-checkup init` | Start interactive schema creation      |
| `--output <path>`      | Save schema to a custom path           |
| `--overwrite`          | Replace existing schema file           |
| `--yes`                | Generate automatically without prompts |

---

Next: [→ validate Command](./validate.md)
