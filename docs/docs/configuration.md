---
id: configuration
title: Configuration
sidebar_position: 4
---

# ⚙️ Configuration

Env Checkup can be customized using a configuration file named **`envcheckup.config.json`**, placed in your project root.  
It allows you to define paths, rules, and preferences for how environment validation should work.

---

## 🧩 Configuration File: `envcheckup.config.json`

Here’s an example configuration file:

```json
{
  "schemaPath": "./.env.schema.json",
  "envDir": "./",
  "strict": true,
  "ignore": ["NODE_ENV", "DEBUG"]
}
````

---

## ⚙️ Options

| Key          | Type     | Default            | Description                                                          |
| ------------ | -------- | ------------------ | -------------------------------------------------------------------- |
| `schemaPath` | string   | `.env.schema.json` | Path to your schema file                                             |
| `envDir`     | string   | `.`                | Directory where `.env` files should be searched                      |
| `strict`     | boolean  | `false`            | When enabled, validation fails if any variable is missing or invalid |
| `ignore`     | string[] | `[]`               | List of environment variables to skip during validation              |

---

## 🧠 Example Setup

**Project structure:**

```
my-app/
 ┣ .env
 ┣ .env.schema.json
 ┣ envcheckup.config.json
 ┣ src/
 ┃ ┗ index.ts
 ┗ package.json
```

**`envcheckup.config.json`:**

```json
{
  "schemaPath": "./.env.schema.json",
  "envDir": "./",
  "strict": true
}
```

When you run:

```bash
npx env-checkup validate
```

Env Checkup will:

1. Load your config from `envcheckup.config.json`
2. Look for `.env` files inside the specified `envDir`
3. Validate them using your `schemaPath`
4. Fail the command if `strict` mode is true and any variable is missing

---

## 🧩 CLI Overrides

All config values can be overridden via CLI flags:

```bash
env-checkup validate --schema ./config/custom.schema.json --dir ./src/envs --strict
```

### Available Flags

| Flag              | Description                               |
| ----------------- | ----------------------------------------- |
| `--schema <path>` | Path to schema file                       |
| `--dir <path>`    | Directory containing `.env` files         |
| `--strict`        | Enable strict mode                        |
| `--ignore <vars>` | Comma-separated list of variables to skip |

---

## 🧾 Example Commands

Validate using default config:

```bash
npx env-checkup validate
```

Validate using a custom schema path:

```bash
npx env-checkup validate --schema ./config/env.schema.json
```

Run in strict mode (fail if any variable is missing):

```bash
npx env-checkup validate --strict
```

Ignore specific variables:

```bash
npx env-checkup validate --ignore NODE_ENV,DEBUG
```

---

## 🧠 Notes

* `envcheckup.config.json` must be in the project root.
* CLI flags always override values in the config file.
* If no config file is found, default settings are used.

---

## 🏁 Summary

| Source      | Example                         | Priority  |
| ----------- | ------------------------------- | --------- |
| Config File | `envcheckup.config.json`        | 🟡 Medium |
| CLI Flag    | `--schema ./custom.schema.json` | 🔴 High   |
| Default     | Built-in defaults               | 🟢 Low    |

---

Your configuration is now ready!
Next: [→ CLI Commands Overview](./Commands/overview.md)

