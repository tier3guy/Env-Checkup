# 🌱 env-checkup

> A lightweight CLI tool to **generate** and **validate** environment variable schemas for Node.js projects.

---

## ✨ Features

- 🧩 Generate environment schema automatically from `.env` files  
- 🔍 Validate `.env` against your defined schema  
- 🧠 Supports multiple formats — `.js`, `.ts`, `.json`  
- ⚙️ Strict and flexible validation (type, default, URL, port, JSON, etc.)  
- 🧾 Perfect for CI/CD pipelines and production sanity checks  

---

## 🚀 Installation

```bash
npm install -g env-checkup
```

or use directly without installing globally:

```bash
npx env-checkup
```

---

## 🧱 Usage

### 1️⃣ Initialize schema

Automatically generate a schema from your `.env` file:

```bash
npx env-checkup init
```

**Options:**

| Flag | Description | Default |
|------|--------------|----------|
| `--files <paths...>` | Files to analyze | `.env` |
| `--output <path>` | Output path for schema file | `./env.schema.js` |
| `--format <type>` | Output format (`js`, `ts`, or `json`) | `js` |
| `--overwrite` | Overwrite existing schema file | `false` |

Example:

```bash
npx env-checkup init --files .env.local --format ts --output ./schema/env.schema.ts
```

---

### 2️⃣ Validate environment

Validate your `.env` against a schema:

```bash
npx env-checkup validate
```

**Options:**

| Flag | Description | Default |
|------|--------------|----------|
| `--schema <path>` | Path to schema file | `./env.schema.js` |
| `--env <path>` | Path to environment file | `.env` |
| `--strict` | Fail if extra vars not in schema | `false` |
| `--show-passed` | Show variables that passed validation | `false` |
| `--json` | Output result in JSON format | `false` |
| `--warn-only` | Warn instead of failing | `false` |
| `--ignore <keys>` | Comma-separated variables to ignore | `""` |
| `--no-color` | Disable colored output | `false` |

Example:

```bash
npx env-checkup validate --strict --json --ignore DEBUG,LOG_LEVEL
```

---

## 🧩 Example Schema

`env.schema.js` (auto-generated):

```js
module.exports = {
  PORT: { type: "port", required: true },
  DATABASE_URL: { type: "url", required: true },
  DEBUG: { type: "boolean", default: false },
  CONFIG: { type: "json", required: false }
};
```

---

## 🧠 Typical Workflow

```bash
# 1. Generate schema
npx env-checkup init

# 2. Review or edit env.schema.js manually

# 3. Validate environment
npx env-checkup validate
```

---

## 🧰 Integration

### 🔸 GitHub Actions / CI example

```yaml
- name: Validate Environment Variables
  run: npx env-checkup validate --strict --json
```

---

## 🛠️ Roadmap

- [ ] Interactive `init` (choose types manually)
- [ ] Multi-env file support (e.g., `.env.development`, `.env.production`)
- [ ] Remote schema sync / lint integration
- [ ] Optional YAML export

---

## 🤝 Contributing

Contributions, ideas, and PRs are welcome!  
Please open an issue to discuss major changes.

---

## 📜 License

This project is licensed under the **ISC License** — see [LICENSE](./LICENSE) for details.

---

**Made with ❤️ for safer environment setups.**
