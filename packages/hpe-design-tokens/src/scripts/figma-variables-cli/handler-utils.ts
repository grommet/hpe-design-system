import * as fs from 'fs';

import { getConfiguredRoleFileSelections } from './env.js';
import type { CliOptions } from './types.js';

export type SearchTarget = {
  role: string;
  fileKey: string;
  source: string;
};

export function parseFileKeysText(raw: string) {
  return raw
    .split(/[\n,]/)
    .map(fileKey => fileKey.trim())
    .filter(Boolean);
}

export function getSearchTargetsFromOptions(
  options: CliOptions,
): SearchTarget[] {
  if (options.fileKeys && options.fileKeys.length > 0) {
    return options.fileKeys.map((fileKey, index) => ({
      role: `list-${index + 1}`,
      fileKey,
      source: `list:${index + 1}`,
    }));
  }

  if (options.fileKeysFile) {
    if (!fs.existsSync(options.fileKeysFile)) {
      throw new Error(`File keys file not found: ${options.fileKeysFile}`);
    }

    const raw = fs.readFileSync(options.fileKeysFile, 'utf8');
    const fileKeys = parseFileKeysText(raw);

    if (fileKeys.length === 0) {
      throw new Error(
        `No file keys found in file: ${options.fileKeysFile}. Provide comma-separated or newline-separated keys.`,
      );
    }

    return fileKeys.map((fileKey, index) => ({
      role: `file-${index + 1}`,
      fileKey,
      source: `file:${options.fileKeysFile}#${index + 1}`,
    }));
  }

  return getConfiguredRoleFileSelections();
}
