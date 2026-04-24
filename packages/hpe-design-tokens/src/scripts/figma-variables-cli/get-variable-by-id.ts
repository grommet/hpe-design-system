import FigmaApi from '../../figma_api.js';
import { resolveFileKeyFromOptions } from './options.js';
import {
  buildPastedTargets,
  getSearchTargetsFromOptions,
  parseFileKeysText,
  searchAcrossTargets,
} from './handler-utils.js';
import {
  buildVariableLocationRow,
  printVariableById,
  printVariableLocationResults,
} from './output.js';
import {
  ask,
  chooseFileKey,
  chooseLookupSearchMode,
  chooseSearchSourceTypes,
  chooseSourceType,
  type ReadlineInterface,
} from './prompts.js';
import type { CliOptions, SourceType } from './types.js';
import { fetchVariablesBySource } from './fetch.js';
import { normalizeVariableId } from './types.js';

async function searchVariableAcrossTargets(
  api: FigmaApi,
  variableId: string,
  targets: Array<{ role: string; fileKey: string; source: string }>,
  sourceTypes: Array<SourceType>,
  options?: { debug?: boolean },
) {
  return searchAcrossTargets(
    api,
    targets,
    sourceTypes,
    ({ response, target, sourceType }) =>
      buildVariableLocationRow(
        response,
        variableId,
        {
          role: target.role,
          source: target.source,
          fileKey: target.fileKey,
          sourceType,
        },
        options,
      ),
  );
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

  const searchMode = await chooseLookupSearchMode(rl, 'variable');

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

    const targets = buildPastedTargets(fileKeys, 'pasted');
    const sourceTypes = await chooseSearchSourceTypes(rl, 'variable');
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

  const targets = getSearchTargetsFromOptions({});
  if (targets.length === 0) {
    throw new Error(
      'No configured role file keys found. Set FILE_KEY_PRIMITIVE, FILE_KEY_SEMANTIC, or FILE_KEY_COMPONENT to search across known files.',
    );
  }

  const sourceTypes = await chooseSearchSourceTypes(rl, 'variable');
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
          fileKey,
          sourceType,
        },
        { debug: false },
      );

      console.log(
        JSON.stringify(
          {
            fileKeySource: source,
            fileKey,
            fileUrl: `https://www.figma.com/design/${fileKey}`,
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

  const targets = getSearchTargetsFromOptions(options);
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
