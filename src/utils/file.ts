import fs from "fs";
import path from "path";

export class FileService {
  private static instance: FileService;

  private constructor() {}

  // Private Methods
  private ensureDir(filePath: string): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Public Methods
  public exists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  public readFile(filePath: string): string {
    if (!this.exists(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    return fs.readFileSync(filePath, "utf-8");
  }

  public readJSON<T>(filePath: string): T {
    const data = this.readFile(filePath);
    try {
      return JSON.parse(data) as T;
    } catch (err) {
      console.log(err);
      throw new Error(`Invalid JSON in file: ${filePath}`);
    }
  }

  public writeFile(filePath: string, content: string): void {
    this.ensureDir(filePath);
    fs.writeFileSync(filePath, content, "utf-8");
  }

  public writeJSON(filePath: string, data: unknown): void {
    const json = JSON.stringify(data, null, 2);
    this.writeFile(filePath, json);
  }

  public deleteFile(filePath: string): void {
    if (this.exists(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  public listFiles(dirPath: string): string[] {
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Directory not found: ${dirPath}`);
    }
    return fs.readdirSync(dirPath);
  }

  public touch(filePath: string): void {
    this.ensureDir(filePath);
    if (!this.exists(filePath)) {
      fs.writeFileSync(filePath, "", "utf-8");
    }
  }

  public static getInstance(): FileService {
    if (!FileService.instance) {
      FileService.instance = new FileService();
    }
    return FileService.instance;
  }
}
