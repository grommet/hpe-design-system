import FigmaApi from '../../figma_api.js';
import { resolveFileKeyFromOptions } from './options.js';
import { buildCollectionJson, printCollections } from './output.js';
import {
  chooseFileKey,
  chooseSourceType,
  type ReadlineInterface,
} from './prompts.js';
import type { CliOptions, SourceType } from './types.js';
import { fetchVariablesBySource } from './fetch.js';

export async function handleGetCollections(
  rl: ReadlineInterface,
  api: FigmaApi,
) {
  const { fileKey, source } = await chooseFileKey(rl);
  const sourceType = await chooseSourceType(rl);
  const response = await fetchVariablesBySource(api, fileKey, sourceType);
  const collections = Object.values(response.meta.variableCollections);

  console.log(
    `\nUsing file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
  );
  printCollections(collections);
}

export async function executeGetCollections(
  api: FigmaApi,
  options: CliOptions,
) {
  const { fileKey, source } = resolveFileKeyFromOptions(options);
  const sourceType: SourceType = options.source || 'local';
  const response = await fetchVariablesBySource(api, fileKey, sourceType);
  const collections = Object.values(response.meta.variableCollections);

  console.log(
    `Using file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
  );

  if (options.format === 'json') {
    console.log(
      JSON.stringify(
        {
          fileKeySource: source,
          sourceType,
          count: collections.length,
          collections: buildCollectionJson(collections),
        },
        null,
        2,
      ),
    );
    return;
  }

  printCollections(collections);
}
