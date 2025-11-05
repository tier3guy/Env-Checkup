# 🌱 env-checkup

> A lightweight CLI utility to validate and manage environment variables in Node.js projects — with type safety, schema generation, and helpful error messages.

---

## 📦 Overview

`env-checkup` helps teams enforce consistent and safe environment configuration by:

✅ Generating a schema (`env.schema.json`) from your `.env` file  
✅ Automatically creating a project config (`envcheck.config.json`)  
✅ Validating your `.env` against that schema  
✅ Supporting rich schema options — like `min`, `max`, `regex`, and `enum`  
✅ Providing clear, colorized CLI output  
✅ Preventing runtime issues from missing or invalid env vars  

---

## 🚀 Installation

```bash
# Install globally
npm install -g env-checkup

# or as a dev dependency
npm install -D env-checkup
```

Run using:
```bash
npx env-checkup init
npx env-checkup validate
```

---

## 🧭 CLI Commands

### 🏗️ `init`

```bash
npx env-checkup init
```

**What it does:**
- Reads your `.env` file (or uses a default `.env` in project root)
- Infers types automatically
- Creates:
  - `envcheck.config.json` — stores file paths
  - `env.schema.json` — defines types and validation metadata

**Example Output:**
```
📖 Reading .env file from: ./envs/.env
✅ Config JSON file initialized successfully!
✅ Schema file generated successfully: env.schema.json
```

---

### 🔍 `validate`

```bash
npx env-checkup validate
```

**What it does:**
- Reads file paths from `envcheck.config.json`
- Validates `.env` values against `env.schema.json`
- Prints success, warnings, or errors

✅ **Success Example:**
```
🧩 Loaded 8 environment variables
📘 Schema loaded successfully

✅ All environment variables are valid!
```

❌ **Failure Example:**
```
❌ Validation failed with 3 issue(s):

 • PORT must be ≥ 0
 • DATABASE_URL must be a valid URL
 • NODE_ENV must be one of: development, staging, production
```

---

## 🧩 Generated Files

### 📄 envcheck.config.json

```json
{
  "envPath": ".env",
  "outputSchemaPath": "env.schema.json"
}
```

### 📄 env.schema.json

```json
{
  "DATABASE_URL": {
    "type": "Url",
    "required": true,
    "description": "Database connection string"
  },
  "PORT": {
    "type": "Port",
    "min": 0,
    "max": 65535,
    "required": true
  },
  "DEBUG": {
    "type": "Boolean",
    "required": false
  }
}
```

---

## 🧠 Schema Authoring Reference

Once generated, you can **edit `env.schema.json` manually** to fine-tune validation rules.  
This section documents **every available property** in your schema.

### 🧩 `TEnvSchemaField`

| Property | Type | Description | Example |
|-----------|------|--------------|----------|
| `type` | string | Defines data type (see list below) | `"Boolean"`, `"Number"`, `"Url"`, `"Email"` |
| `description` | string | Optional text explaining the variable | `"Database URL used for connection"` |
| `required` | boolean | Whether the variable must exist | `true` |
| `enum` | string[] \| number[] | Allowed values (for `Enum` type) | `["dev", "staging", "prod"]` |
| `min` | number | Minimum numeric value | `0` |
| `max` | number | Maximum numeric value | `65535` |
| `minLength` | number | Minimum string/array length | `3` |
| `maxLength` | number | Maximum string/array length | `50` |
| `regex` | RegExp | Custom pattern check | `"^[A-Z]{3}-\\d{3}$"` |
| `validate` | Function | Custom validator `(value) => boolean \| string` | `"validate": "(v) => v.startsWith('KEY_')"` |
| `sensitive` | boolean | Hides value in logs | `true` |
| `trim` | boolean | Trims whitespace before validation | `true` |

---

### 📘 Supported Types

| Type | Description | Example |
|------|--------------|----------|
| `String` | Default type for text values | `API_KEY=mykey` |
| `Number` | Integer or decimal number | `TIMEOUT=5000` |
| `Boolean` | `true`, `false`, `1`, `0` | `DEBUG=true` |
| `Url` | Must match valid HTTP/HTTPS format | `DATABASE_URL=https://db.example.com` |
| `Email` | Must match email format | `ADMIN_EMAIL=admin@example.com` |
| `Port` | Integer between `0–65535` | `PORT=8080` |
| `Enum` | One of defined values | `NODE_ENV=production` |
| `Json` | Must be valid JSON | `CONFIG={"mode":"safe"}` |
| `Array` | Comma-separated list | `ALLOWED_ORIGINS=http://a.com,http://b.com` |
| `Date` | ISO-8601 date string | `START_DATE=2025-01-01T00:00:00Z` |
| `Path` | Local or relative path | `LOG_PATH=./logs/app.log` |
| `Custom` | Regex-based custom validation | `CODE=ABC-123` |

---

### 💡 Extended Field Examples

#### 🔢 Numeric Ranges

```json
{
  "PORT": { "type": "Port", "min": 1024, "max": 49151, "required": true }
}
```

#### 🧩 Enum Validation

```json
{
  "NODE_ENV": { "type": "Enum", "enum": ["development", "staging", "production"], "required": true }
}
```

#### 📧 Email & URL Checks

```json
{
  "ADMIN_EMAIL": { "type": "Email", "required": true },
  "APP_URL": { "type": "Url", "required": true }
}
```

#### 🔒 Sensitive Data

```json
{
  "API_KEY": { "type": "String", "required": true, "sensitive": true }
}
```

#### 🧠 Custom Regex Validation

```json
{
  "BUILD_CODE": {
    "type": "Custom",
    "regex": "^[A-Z]{3}-[0-9]{4}$",
    "description": "Build code format: ABC-1234"
  }
}
```

#### 🧰 Complex Validation with Functions (TypeScript schema only)

```ts
{
  APP_ID: {
    type: "Custom",
    validate: (value) => value.startsWith("APP_") || "APP_ID must start with 'APP_'"
  }
}
```

---

## ⚙️ Advanced Configuration

Edit `envcheck.config.json` to customize behavior:

```json
{
  "envPath": ".env",
  "outputSchemaPath": "env.schema.json",
  "strictMode": true,
  "exitOnWarning": false
}
```

| Field | Description |
|--------|--------------|
| `strictMode` | Fails validation if `.env` has variables not in schema |
| `exitOnWarning` | Treats warnings as errors (useful in CI/CD) |

---

## 🧪 Testing

To verify your setup:

```bash
npm run build
npm link
env-checkup init
env-checkup validate
```

Or run tests with Jest:

```bash
npm run test
```

---

## 🧰 Tech Stack

- **Language:** TypeScript (ESM)
- **CLI Framework:** Commander.js
- **Colors:** Chalk v5
- **Testing:** Jest + ts-jest
- **Packaging:** npm

---

## 🧑‍💻 Contributing

1. Fork & clone the repo  
2. Install dependencies  
   ```bash
   npm install
   ```
3. Run tests  
   ```bash
   npm run test
   ```
4. Submit a PR 🚀  

---

## 📜 License

MIT License © 2025 [Avinash Gupta]

---

## 💬 Author

Built with ❤️ by **Avinash Gupta**  
GitHub: [@AvinashGuptaDev](https://github.com/AvinashGuptaDev)  
Twitter: [@theavinashgupta](https://twitter.com/theavinashgupta)

---
