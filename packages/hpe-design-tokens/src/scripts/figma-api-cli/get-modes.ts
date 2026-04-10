import FigmaApi from '../../figma_api.js';
import { resolveFileKeyFromOptions } from './options.js';
import { printModes } from './output.js';
import {
  chooseFileKey,
  chooseSourceType,
  type ReadlineInterface,
} from './prompts.js';
import type { CliOptions, SourceType } from './types.js';
import { fetchVariablesBySource } from './fetch.js';

export async function handleGetModes(rl: ReadlineInterface, api: FigmaApi) {
  const { fileKey, source } = await chooseFileKey(rl);
  const sourceType = await chooseSourceType(rl);
  const response = await fetchVariablesBySource(api, fileKey, sourceType);
  const collections = Object.values(response.meta.variableCollections);

  console.log(
    `\nUsing file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
  );
  printModes(collections);
}

export async function executeGetModes(api: FigmaApi, options: CliOptions) {
  const { fileKey, source } = resolveFileKeyFromOptions(options);
  const sourceType: SourceType = options.source || 'local';
  const response = await fetchVariablesBySource(api, fileKey, sourceType);
  const collections = Object.values(response.meta.variableCollections);

  console.log(
    `Using file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
  );
  printModes(collections);
}
