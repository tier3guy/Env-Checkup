/* eslint-disable @typescript-eslint/no-explicit-any */

export function ValidateEnv(env: Record<string, string>, schema: Record<string, any>) {
  const errors: string[] = [];
  const warnings: string[] = [];

  delete schema.$typeDocs;
  delete schema.$comment;
  delete schema.$examples;
  delete schema.$description;

  for (const [key, definition] of Object.entries(schema)) {
    const value = env[key];

    // Missing required variable
    if (definition.required && (value === undefined || value === "")) {
      errors.push(`${key} is required but missing.`);
      continue;
    }

    // Skip undefined optional variables
    if (value === undefined) continue;

    // Type validation
    switch (definition.type) {
      case "Boolean":
        if (!["true", "false", "1", "0"].includes(value.toLowerCase()))
          errors.push(`${key} must be a boolean (true/false).`);
        break;

      case "Number":
      case "Port":
        if (isNaN(Number(value))) errors.push(`${key} must be a number.`);
        else if (definition.min !== undefined && Number(value) < definition.min)
          errors.push(`${key} must be ≥ ${definition.min}.`);
        else if (definition.max !== undefined && Number(value) > definition.max)
          errors.push(`${key} must be ≤ ${definition.max}.`);
        break;

      case "Url":
        if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value))
          errors.push(`${key} must be a valid URL.`);
        break;

      case "Email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errors.push(`${key} must be a valid email address.`);
        break;

      case "Enum":
        if (!definition.enum?.includes(value))
          errors.push(`${key} must be one of: ${definition.enum?.join(", ")}.`);
        break;

      case "Json":
        try {
          JSON.parse(value);
        } catch {
          errors.push(`${key} must contain valid JSON.`);
        }
        break;

      case "Date":
        if (isNaN(Date.parse(value))) errors.push(`${key} must be a valid ISO date string.`);
        break;

      case "Array": {
        const arr = value.split(",").map((v) => v.trim());
        if (definition.minLength && arr.length < definition.minLength)
          errors.push(`${key} must contain at least ${definition.minLength} items.`);
        if (definition.maxLength && arr.length > definition.maxLength)
          errors.push(`${key} must not exceed ${definition.maxLength} items.`);
        break;
      }

      case "Path":
        if (!/^[./a-zA-Z0-9_-]+$/.test(value))
          warnings.push(`${key} might not be a safe path string.`);
        break;

      case "Custom":
        if (definition.regex && !new RegExp(definition.regex).test(value))
          errors.push(`${key} failed custom regex validation.`);
        break;
    }
  }

  // Extra variables not in schema
  for (const key of Object.keys(env)) {
    if (!schema[key]) warnings.push(`${key} is not defined in env.schema.json.`);
  }

  return { errors, warnings };
}
