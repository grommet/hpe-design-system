import FigmaApi from '../../figma_api.js';
import { resolveFileKeyFromOptions } from './options.js';
import { printVariableById } from './output.js';
import {
  ask,
  chooseFileKey,
  chooseSourceType,
  type ReadlineInterface,
} from './prompts.js';
import type { CliOptions, SourceType } from './types.js';
import { fetchVariablesBySource } from './fetch.js';

export async function handleGetVariableById(
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

  const variableId = (await ask(rl, '\nEnter variable id: ')).trim();
  if (!variableId) {
    throw new Error('A variable id is required.');
  }
  printVariableById(response, variableId);
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

  const { fileKey, source } = resolveFileKeyFromOptions(options);
  const sourceType: SourceType = options.source || 'local';
  const response = await fetchVariablesBySource(api, fileKey, sourceType);
  const collections = Object.values(response.meta.variableCollections);

  console.log(
    `Using file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
  );
  printVariableById(response, options.variableId);
}
