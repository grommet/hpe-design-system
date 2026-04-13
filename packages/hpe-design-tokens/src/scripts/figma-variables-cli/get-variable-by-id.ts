import * as fs from 'fs';

import FigmaApi from '../../figma_api.js';
import { getConfiguredRoleFileSelections } from './env.js';
import { resolveFileKeyFromOptions } from './options.js';
import {
  buildVariableLocationRow,
  printVariableById,
  printVariableLocationResults,
} from './output.js';
import {
  ask,
  askMenuOption,
  chooseFileKey,
  chooseSourceType,
  type ReadlineInterface,
} from './prompts.js';
import type { CliOptions, SourceType } from './types.js';
import { fetchVariablesBySource } from './fetch.js';
import { normalizeVariableId } from './types.js';

async function chooseVariableSearchMode(rl: ReadlineInterface) {
  console.log('\nChoose variable lookup scope:');
  console.log('1. Search a specific file');
  console.log('2. Search all configured role files');
  console.log('3. Search using pasted file keys');

  return askMenuOption(rl, 3);
}

async function chooseVariableSearchSources(
  rl: ReadlineInterface,
): Promise<Array<SourceType>> {
  console.log('\nChoose variable source scope:');
  console.log('1. local');
  console.log('2. published');
  console.log('3. both local and published');

  const choice = await askMenuOption(rl, 3);

  if (choice === 1) {
    return ['local'];
  }

  if (choice === 2) {
    return ['published'];
  }

  return ['local', 'published'];
}

async function searchVariableAcrossTargets(
  api: FigmaApi,
  variableId: string,
  targets: Array<{ role: string; fileKey: string; source: string }>,
  sourceTypes: Array<SourceType>,
  options?: { debug?: boolean },
) {
  const rows = [];

  for (const target of targets) {
    for (const sourceType of sourceTypes) {
      try {
        const response = await fetchVariablesBySource(
          api,
          target.fileKey,
          sourceType,
        );
        const row = buildVariableLocationRow(
          response,
          variableId,
          {
            role: target.role,
            source: target.source,
            sourceType,
          },
          options,
        );

        if (row) {
          rows.push(row);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.log(
          `Skipping ${target.source} (${sourceType}) because the lookup failed: ${message}`,
        );
      }
    }
  }

  return rows;
}

function parseFileKeysText(raw: string) {
  return raw
    .split(/[\n,]/)
    .map(fileKey => fileKey.trim())
    .filter(Boolean);
}

function getTargetsFromOptions(options: CliOptions) {
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

export async function handleGetVariableById(
  rl: ReadlineInterface,
  api: FigmaApi,
) {
  const variableId = normalizeVariableId(
    await ask(rl, '\nEnter variable id (plain id or VariableID:<id>): '),
  );

  if (!variableId) {
    throw new Error('A variable id is required.');
  }

  const searchMode = await chooseVariableSearchMode(rl);

  if (searchMode === 1) {
    const { fileKey, source } = await chooseFileKey(rl);
    const sourceType = await chooseSourceType(rl);
    const response = await fetchVariablesBySource(api, fileKey, sourceType);
    const collections = Object.values(response.meta.variableCollections);

    console.log(
      `\nUsing file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
    );

    printVariableById(response, variableId);
    return;
  }

  if (searchMode === 3) {
    const pastedKeys = await ask(
      rl,
      '\nPaste comma-separated or newline-separated file keys: ',
    );
    const fileKeys = parseFileKeysText(pastedKeys);

    if (fileKeys.length === 0) {
      throw new Error('At least one file key is required.');
    }

    const targets = fileKeys.map((fileKey, index) => ({
      role: `pasted-${index + 1}`,
      fileKey,
      source: `pasted:${index + 1}`,
    }));
    const sourceTypes = await chooseVariableSearchSources(rl);
    const rows = await searchVariableAcrossTargets(
      api,
      variableId,
      targets,
      sourceTypes,
      { debug: false },
    );
    printVariableLocationResults(rows, variableId);
    return;
  }

  const targets = getConfiguredRoleFileSelections();
  if (targets.length === 0) {
    throw new Error(
      'No configured role file keys found. Set FILE_KEY_PRIMITIVE, FILE_KEY_SEMANTIC, or FILE_KEY_COMPONENT to search across known files.',
    );
  }

  const sourceTypes = await chooseVariableSearchSources(rl);
  const rows = await searchVariableAcrossTargets(
    api,
    variableId,
    targets,
    sourceTypes,
    { debug: false },
  );
  printVariableLocationResults(rows, variableId);
}

export async function executeGetVariableById(
  api: FigmaApi,
  options: CliOptions,
) {
  if (!options.variableId) {
    throw new Error(
      'The --variable-id flag is required for --action=variable-by-id.',
    );
  }

  const variableId = normalizeVariableId(options.variableId);

  if (options.fileKey || options.role) {
    const { fileKey, source } = resolveFileKeyFromOptions(options);
    const sourceType: SourceType = options.source || 'local';
    const response = await fetchVariablesBySource(api, fileKey, sourceType);
    const collections = Object.values(response.meta.variableCollections);

    if (options.format === 'json') {
      const row = buildVariableLocationRow(
        response,
        variableId,
        {
          role: options.role || '',
          source,
          sourceType,
        },
        { debug: false },
      );

      console.log(
        JSON.stringify(
          {
            fileKeySource: source,
            sourceType,
            collectionsCount: collections.length,
            variableId,
            found: Boolean(row),
            row: row || null,
          },
          null,
          2,
        ),
      );
      return;
    }

    console.log(
      `Using file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
    );
    printVariableById(response, variableId, { debug: options.debug });
    return;
  }

  const targets = getTargetsFromOptions(options);
  if (targets.length === 0) {
    throw new Error(
      'Provide --role/--file-key, --file-keys, --file-keys-file, or set FILE_KEY_PRIMITIVE/FILE_KEY_SEMANTIC/FILE_KEY_COMPONENT.',
    );
  }

  const sourceTypes: Array<SourceType> = options.source
    ? [options.source]
    : ['local', 'published'];
  const rows = await searchVariableAcrossTargets(
    api,
    variableId,
    targets,
    sourceTypes,
    { debug: options.debug },
  );

  if (options.format === 'json') {
    console.log(
      JSON.stringify(
        {
          variableId,
          sourceTypes,
          targetsCount: targets.length,
          foundCount: rows.length,
          rows,
        },
        null,
        2,
      ),
    );
    return;
  }

  printVariableLocationResults(rows, variableId);
}
