---
id: installation
title: Installation
sidebar_position: 3
---

# ⚙️ Installation

Installing **Env Checkup** is simple and flexible — you can set it up globally for system-wide use or locally per project.  

Choose the installation method that best fits your workflow 👇

---

## 🧩 Prerequisites

Before installing, make sure your system meets these requirements:

```

Node.js: ≥ 18.0.0
npm: ≥ 8.0.0 (or Yarn ≥ 1.22.0)
Operating System: macOS, Linux, or Windows

````

You can verify your versions with:

```bash
node -v
npm -v
````

---

## 🌍 Global Installation

If you want to use **Env Checkup** from anywhere in your terminal, install it globally:

```bash
npm install -g env-checkup
```

Now, you can run commands directly:

```bash
env-checkup --help
```

Example output:

```
Usage: env-checkup [command] [options]

Commands:
  init       Initialize a new schema file
  validate   Validate environment variables against schema

Options:
  -h, --help  Show help
  -v, --version  Show version number
```

---

## 🏗️ Local Installation (Recommended)

For most projects, a **local installation** is recommended.
This ensures your project uses a consistent Env Checkup version across all environments.

Install it as a dev dependency:

```bash
npm install env-checkup --save-dev
```

Or, using Yarn:

```bash
yarn add env-checkup --dev
```

---

### Run Using npx

You can invoke Env Checkup without a global install using **npx**:

```bash
npx env-checkup init
```

or validate your `.env` files:

```bash
npx env-checkup validate
```

---

## 📦 Adding npm Scripts

To make running Env Checkup easier, add custom scripts to your `package.json`:

```json
"scripts": {
  "env:init": "env-checkup init",
  "env:validate": "env-checkup validate --strict"
}
```

Now, you can run:

```bash
npm run env:init
npm run env:validate
```

---

## 🧠 Example Setup

Here’s what your project might look like after installation:

```
my-project/
 ┣ .env
 ┣ .env.example
 ┣ .env.schema.json
 ┣ package.json
 ┗ src/
   ┗ index.ts
```

After initializing:

```bash
npx env-checkup init
```

And validating:

```bash
npx env-checkup validate
```

You’ll see output like:

```
✅ PORT = 3000
⚠️ Missing variable: DATABASE_URL
❌ Invalid type: DEBUG_MODE (expected boolean, got string)
```

---

## 🧰 Updating Env Checkup

To update to the latest version globally:

```bash
npm update -g env-checkup
```

Or locally (inside your project):

```bash
npm update env-checkup
```

To check the installed version:

```bash
env-checkup --version
```

---

## 🔧 Uninstalling

If you ever need to remove Env Checkup:

### Global uninstall

```bash
npm uninstall -g env-checkup
```

### Local uninstall

```bash
npm uninstall env-checkup
```

---

## 🧭 Troubleshooting

### 🧱 Error: “env-checkup: command not found”

If you see this error after global installation, your global npm bin folder might not be in your PATH.

Fix it with:

```bash
npm config get prefix
```

Then add this path’s `/bin` folder to your system PATH.

---

### 🧱 Error: “Cannot find module 'commander' or its type declarations”

If you’re developing Env Checkup locally and see this error:

```bash
npm install commander
npm install @types/commander --save-dev
```

---

### 🧱 Error: “Cannot implicitly apply the ‘latest’ tag”

This happens when trying to publish a lower version than one already on npm.

Use:

```bash
npm version patch
npm publish
```

---

## 🧪 Verify Installation

Run this command to confirm Env Checkup is working:

```bash
env-checkup --version
```

You should see output like:

```
Env Checkup v1.0.1
```

---

## 🧩 Summary

| Method                  | Command                              | Description                         |
| ----------------------- | ------------------------------------ | ----------------------------------- |
| **Global**              | `npm install -g env-checkup`         | Use anywhere from your terminal     |
| **Local (recommended)** | `npm install env-checkup --save-dev` | Keep version consistent per project |
| **npx**                 | `npx env-checkup validate`           | Run without installation            |
| **Update**              | `npm update env-checkup`             | Get the latest version              |
| **Uninstall**           | `npm uninstall env-checkup`          | Remove Env Checkup                  |

---

## 🏁 Next Steps

* [→ Getting Started](./getting-started.md)
* [→ Configuration Options](./configuration.md)
* [→ CLI Commands Overview](./commands/overview.md)

Now that you’ve installed Env Checkup, let’s start validating your environment files 🎯


