import FigmaApi from '../../figma_api.js';
import { fetchVariablesBySource } from './fetch.js';
import {
  buildPastedTargets,
  getSearchTargetsFromOptions,
  parseFileKeysText,
  searchAcrossTargets,
} from './handler-utils.js';
import { resolveFileKeyFromOptions } from './options.js';
import {
  buildExpandedCollectionJson,
  buildCollectionLocationRow,
  printCollectionById,
  printCollectionLocationResults,
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

async function searchCollectionAcrossTargets(
  api: FigmaApi,
  collectionId: string,
  targets: Array<{ role: string; fileKey: string; source: string }>,
  sourceTypes: Array<SourceType>,
  options?: { debug?: boolean },
) {
  return searchAcrossTargets(
    api,
    targets,
    sourceTypes,
    ({ response, target, sourceType }) => {
      const row = buildCollectionLocationRow(
        response,
        collectionId,
        {
          role: target.role,
          source: target.source,
          sourceType,
        },
        options,
      );

      if (!row) {
        return undefined;
      }

      const collection = Object.values(response.meta.variableCollections).find(
        candidate => candidate.id === row.id,
      );

      if (!collection) {
        return undefined;
      }

      return {
        row,
        collection,
        fileKey: target.fileKey,
        source: target.source,
      };
    },
  );
}

export async function handleGetCollectionById(
  rl: ReadlineInterface,
  api: FigmaApi,
) {
  const collectionId = (await ask(rl, '\nEnter collection id: ')).trim();

  if (!collectionId) {
    throw new Error('A collection id is required.');
  }

  const searchMode = await chooseLookupSearchMode(rl, 'collection');

  if (searchMode === 1) {
    const { fileKey, source } = await chooseFileKey(rl);
    const sourceType = await chooseSourceType(rl);
    const response = await fetchVariablesBySource(api, fileKey, sourceType);
    const collections = Object.values(response.meta.variableCollections);

    console.log(
      `\nUsing file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
    );

    printCollectionById(response, collectionId);
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
    const sourceTypes = await chooseSearchSourceTypes(rl, 'collection');
    const rows = await searchCollectionAcrossTargets(
      api,
      collectionId,
      targets,
      sourceTypes,
      { debug: false },
    );
    printCollectionLocationResults(
      rows.map(match => match.row),
      collectionId,
    );
    return;
  }

  const targets = getSearchTargetsFromOptions({});
  if (targets.length === 0) {
    throw new Error(
      'No configured role file keys found. Set FILE_KEY_PRIMITIVE, FILE_KEY_SEMANTIC, or FILE_KEY_COMPONENT to search across known files.',
    );
  }

  const sourceTypes = await chooseSearchSourceTypes(rl, 'collection');
  const rows = await searchCollectionAcrossTargets(
    api,
    collectionId,
    targets,
    sourceTypes,
    { debug: false },
  );
  printCollectionLocationResults(
    rows.map(match => match.row),
    collectionId,
  );
}

export async function executeGetCollectionById(
  api: FigmaApi,
  options: CliOptions,
) {
  if (!options.collectionId) {
    throw new Error(
      'The --collection-id flag is required for --action=collection-by-id.',
    );
  }

  const collectionId = options.collectionId.trim();

  if (options.fileKey || options.role) {
    const { fileKey, source } = resolveFileKeyFromOptions(options);
    const sourceType: SourceType = options.source || 'local';
    const response = await fetchVariablesBySource(api, fileKey, sourceType);
    const collections = Object.values(response.meta.variableCollections);

    if (options.format === 'json') {
      const row = buildCollectionLocationRow(
        response,
        collectionId,
        {
          role: options.role || '',
          source,
          sourceType,
        },
        { debug: false },
      );
      const collection = row
        ? Object.values(response.meta.variableCollections).find(
            candidate => candidate.id === row.id,
          )
        : undefined;

      console.log(
        JSON.stringify(
          {
            fileKeySource: source,
            fileKey,
            fileUrl: `https://www.figma.com/design/${fileKey}`,
            sourceType,
            collectionsCount: collections.length,
            collectionId,
            found: Boolean(row),
            collection: collection
              ? buildExpandedCollectionJson(collection)
              : null,
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
    printCollectionById(response, collectionId, { debug: options.debug });
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
  const rows = await searchCollectionAcrossTargets(
    api,
    collectionId,
    targets,
    sourceTypes,
    { debug: options.debug },
  );

  if (options.format === 'json') {
    console.log(
      JSON.stringify(
        {
          collectionId,
          sourceTypes,
          targetsCount: targets.length,
          foundCount: rows.length,
          collections: rows.map(match => ({
            role: match.row.role,
            file: match.row.file,
            fileKey: match.fileKey,
            fileUrl: `https://www.figma.com/design/${match.fileKey}`,
            sourceType: match.row.sourceType,
            collection: buildExpandedCollectionJson(match.collection),
          })),
        },
        null,
        2,
      ),
    );
    return;
  }

  printCollectionLocationResults(
    rows.map(match => match.row),
    collectionId,
  );
}
