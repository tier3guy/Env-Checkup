export type TInitCommandOptions = {
  env: string | undefined;
  output: string | undefined;
};

export type TValidateCommandOptions = {
  env: string | undefined;
  schema: string | undefined;
};

export type TEnvConfig = {
  envPath?: string;
  outputSchemaPath?: string;
};

export type TEnvSchemaField = {
  type:
    | "String"
    | "Number"
    | "Boolean"
    | "Url"
    | "Email"
    | "Port"
    | "Enum"
    | "Json"
    | "Path"
    | "Date"
    | "Array"
    | "Custom";
  description?: string;
  required?: boolean;
  enum?: (string | number)[];
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  regex?: RegExp;
  validate?: (value: unknown) => boolean | string;
  sensitive?: boolean;
  trim?: boolean;
};

export type TEnvSchema = {
  [key: string]: TEnvSchemaField;
};
