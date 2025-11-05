---
id: faq
title: FAQ
sidebar_position: 6
---

# ❓ FAQ

Find quick answers to common questions about **Env Checkup**.

---

### 1️⃣ Where should I place the configuration file?

Place your configuration file at the root of your project and name it **`envcheckup.config.json`**.

Example:
```

my-app/
┣ .env
┣ .env.schema.json
┣ envcheckup.config.json
┗ package.json

````

---

### 2️⃣ What happens if `envcheckup.config.json` is missing?

If no configuration file is found, Env Checkup uses its **default settings**:

```json
{
  "schemaPath": "./.env.schema.json",
  "envDir": "./",
  "strict": false,
  "ignore": []
}
````

You can still pass all options via CLI flags:

```bash
npx env-checkup validate --schema ./.env.schema.json --strict
```

---

### 3️⃣ Can I use Env Checkup without creating a schema?

Yes.
If `.env.schema.json` doesn’t exist, run:

```bash
npx env-checkup init
```

This will guide you interactively to create one.

---

### 4️⃣ Does Env Checkup support multiple `.env` files?

✅ Yes.
Env Checkup automatically discovers common `.env` variants recursively:

```
.env
.env.local
.env.example
.env.development
.env.production
```

It validates each of them against your schema.

---

### 5️⃣ How do I ignore specific variables?

Use the `ignore` array in your config file:

```json
{
  "ignore": ["NODE_ENV", "DEBUG"]
}
```

Or use the CLI flag:

```bash
npx env-checkup validate --ignore NODE_ENV,DEBUG
```

---

### 6️⃣ How do I enable strict mode?

Strict mode ensures that the command **fails** if any variable is missing or invalid.

Enable it in your config:

```json
{
  "strict": true
}
```

Or run:

```bash
npx env-checkup validate --strict
```

---

### 7️⃣ Can I integrate Env Checkup into CI/CD?

Absolutely.
Add it as a step before build or deployment.

**GitHub Actions example:**

```yaml
- name: Validate Environment Variables
  run: npx env-checkup validate --strict
```

If validation fails, the workflow will stop — ensuring safe deployments.

---

### 8️⃣ How do I validate a specific `.env` file?

Use the `--dir` flag to target a specific folder containing the file:

```bash
npx env-checkup validate --dir ./config
```

Env Checkup will automatically pick up `.env`, `.env.local`, etc. from that folder.

---

### 9️⃣ Does Env Checkup support TypeScript projects?

Yes.
Env Checkup works independently of your runtime — it simply reads `.env` files.
It’s compatible with **TypeScript**, **Next.js**, **Express**, and any Node.js project.

---

### 🔟 I’m getting “Cannot find schema file” — what should I do?

Ensure that your `schemaPath` in `envcheckup.config.json` is correct:

```json
{
  "schemaPath": "./.env.schema.json"
}
```

If the file doesn’t exist, create one with:

```bash
npx env-checkup init
```

---

### 11️⃣ How can I see which `.env` files were validated?

Run in debug mode:

```bash
npx env-checkup validate --debug
```

You’ll see logs of discovered `.env` files, schema path, and validation summary.

---

### 12️⃣ Can I run Env Checkup as an npm script?

Yes — that’s the recommended way for teams.

In your `package.json`:

```json
"scripts": {
  "env:init": "env-checkup init",
  "env:validate": "env-checkup validate --strict"
}
```

Then run:

```bash
npm run env:validate
```

---

### 13️⃣ What files should I commit to Git?

✅ Commit:

```
.env.schema.json
envcheckup.config.json
```

🚫 Do **not** commit:

```
.env
.env.local
.env.production
```

---

### 14️⃣ How can I update Env Checkup?

Update to the latest version:

```bash
npm update env-checkup
```

Check your version:

```bash
npx env-checkup --version
```

---

### 15️⃣ How do I uninstall Env Checkup?

If installed locally:

```bash
npm uninstall env-checkup
```

If installed globally:

```bash
npm uninstall -g env-checkup
```

---

## 🧩 Need more help?

If your issue isn’t listed here:

* Check the [GitHub Issues](https://github.com/your-username/env-checkup/issues)
* Open a new issue describing your problem
* Include your `.envcheckup.config.json` and CLI command for context

---

Env Checkup is built to make your `.env` management simple, reliable, and team-friendly.


