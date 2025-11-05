import os from "os";
import path from "path";

export function GetBaseDirectoryName(): string {
  return process.cwd();
}

export function GetConfigFilePath(): string {
  const configFilePath = path.resolve(GetBaseDirectoryName(), "envcheck.config.json");
  return configFilePath;
}

export function GetSchemaFileName(): string {
  return "envcheckup.schema.ts";
}

export function ToRelativePosixPath(targetPath: string): string {
  if (!targetPath) return "";

  const cwd = process.cwd();
  let relative = path.relative(cwd, targetPath);

  // If the file is on a different drive (Windows case),
  // path.relative() returns the absolute path — handle that:
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
    relative = targetPath;
  }

  // Normalize all backslashes to forward slashes
  let normalized = relative.replace(/\\/g, "/");

  // Remove potential leading "./"
  if (normalized.startsWith("./")) {
    normalized = normalized.slice(2);
  }

  // On Windows, ensure drive letters are lowercase for consistency (C: -> c:)
  if (os.platform() === "win32" && /^[A-Z]:/.test(normalized)) {
    normalized = normalized.charAt(0).toLowerCase() + normalized.slice(1);
  }

  return "./" + normalized;
}
