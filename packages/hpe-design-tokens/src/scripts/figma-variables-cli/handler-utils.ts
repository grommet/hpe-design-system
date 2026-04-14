import * as fs from 'fs';

import FigmaApi from '../../figma_api.js';
import { getConfiguredRoleFileSelections } from './env.js';
import { fetchVariablesBySource } from './fetch.js';
import type { CliOptions } from './types.js';
import type { ApiGetVariableResponse } from '../../figma_api.js';
import type { SourceType } from './types.js';

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

export function buildPastedTargets(fileKeys: string[], prefix: string) {
  return fileKeys.map((fileKey, index) => ({
    role: `${prefix}-${index + 1}`,
    fileKey,
    source: `${prefix}:${index + 1}`,
  }));
}

export async function searchAcrossTargets<T>(
  api: FigmaApi,
  targets: SearchTarget[],
  sourceTypes: Array<SourceType>,
  resolveMatch: (params: {
    response: ApiGetVariableResponse;
    target: SearchTarget;
    sourceType: SourceType;
  }) => T | undefined,
) {
  const matches: T[] = [];

  for (const target of targets) {
    for (const sourceType of sourceTypes) {
      try {
        const response = await fetchVariablesBySource(
          api,
          target.fileKey,
          sourceType,
        );
        const match = resolveMatch({ response, target, sourceType });

        if (match !== undefined) {
          matches.push(match);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.log(
          `Skipping ${target.source} (${sourceType}) because the lookup failed: ${message}`,
        );
      }
    }
  }

  return matches;
}
