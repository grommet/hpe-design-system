import { readFileSync } from 'fs';

export function stripJsonComments(jsonText: string): string {
  return jsonText.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

export function parseJsonc<T>(jsonText: string): T {
  return JSON.parse(stripJsonComments(jsonText)) as T;
}

export function readJsoncFile<T>(filePath: string): T {
  const fileContents = readFileSync(filePath, 'utf8');
  return parseJsonc<T>(fileContents);
}