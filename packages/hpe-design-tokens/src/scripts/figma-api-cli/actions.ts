import * as fs from 'fs';

import FigmaApi, { type ApiGetVariableResponse } from '../../figma_api.js';
import { green } from '../../utils.js';
import { resolveFileKeyFromOptions } from './options.js';
import { payloadSummary, validatePostPayload } from './payload.js';
import {
  ask,
  chooseFileKey,
  chooseSourceType,
  confirm,
  type ReadlineInterface,
} from './prompts.js';
import {
  buildVariableRows,
  printCollections,
  printModes,
  printVariables,
} from './output.js';
import type { ActionType, CliOptions, SourceType } from './types.js';

export async function fetchVariablesBySource(
  api: FigmaApi,
  fileKey: string,
  sourceType: SourceType,
) {
  return sourceType === 'local'
    ? api.getLocalVariables(fileKey)
    : api.getPublishedVariables(fileKey);
}

export async function handleReadAction(
  rl: ReadlineInterface,
  api: FigmaApi,
  action: Extract<ActionType, 'collections' | 'modes' | 'variables'>,
) {
  const { fileKey, source } = await chooseFileKey(rl);
  const sourceType = await chooseSourceType(rl);
  const response = await fetchVariablesBySource(api, fileKey, sourceType);
  const collections = Object.values(response.meta.variableCollections);

  console.log(
    `\nUsing file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
  );

  if (action === 'collections') {
    printCollections(collections);
    return;
  }

  if (action === 'modes') {
    printModes(collections);
    return;
  }

  await printVariables(rl, response);
}

export async function handlePostAction(rl: ReadlineInterface, api: FigmaApi) {
  const { fileKey, source } = await chooseFileKey(rl);
  const payloadPath = (await ask(rl, '\nPath to payload JSON file: ')).trim();

  if (!payloadPath) {
    throw new Error('Payload path is required.');
  }

  if (!fs.existsSync(payloadPath)) {
    throw new Error(`Payload file not found: ${payloadPath}`);
  }

  const rawPayload = fs.readFileSync(payloadPath, 'utf8');
  const parsedPayload = JSON.parse(rawPayload) as unknown;

  if (!validatePostPayload(parsedPayload)) {
    throw new Error(
      'Invalid payload shape. variableCollections, variableModes, variables, and variableModeValues must each be an array when provided.',
    );
  }

  const summary = payloadSummary(parsedPayload);

  console.log('\nPayload summary:');
  console.table([summary]);
  console.log(`Target: ${source}`);
  console.log(`File key: ${fileKey}`);

  const shouldContinue = await confirm(
    rl,
    'Type YES to POST variables to Figma: ',
  );

  if (!shouldContinue) {
    console.log('Post canceled.');
    return;
  }

  const response = await api.postVariables(fileKey, parsedPayload);
  const mappings = Object.entries(response.meta.tempIdToRealId || {});

  console.log(green('POST request completed successfully.'));
  console.log(`Mapped temp IDs: ${mappings.length}`);
  if (mappings.length > 0) {
    console.table(
      mappings.slice(0, 25).map(([tempId, realId]) => ({ tempId, realId })),
    );
  }
}

async function executeNonInteractivePost(
  api: FigmaApi,
  fileKey: string,
  source: string,
  options: CliOptions,
) {
  if (!options.payload) {
    throw new Error('The --payload flag is required for --action=post.');
  }
  if (options.confirm !== 'YES') {
    throw new Error(
      'Non-interactive POST requires --confirm=YES to avoid accidental writes.',
    );
  }
  if (!fs.existsSync(options.payload)) {
    throw new Error(`Payload file not found: ${options.payload}`);
  }

  const rawPayload = fs.readFileSync(options.payload, 'utf8');
  const parsedPayload = JSON.parse(rawPayload) as unknown;

  if (!validatePostPayload(parsedPayload)) {
    throw new Error(
      'Invalid payload shape. variableCollections, variableModes, variables, and variableModeValues must each be an array when provided.',
    );
  }

  console.log('Payload summary:');
  console.table([payloadSummary(parsedPayload)]);
  console.log(`Target: ${source}`);
  console.log(`File key: ${fileKey}`);

  const response = await api.postVariables(fileKey, parsedPayload);
  const mappings = Object.entries(response.meta.tempIdToRealId || {});
  console.log(green('POST request completed successfully.'));
  console.log(`Mapped temp IDs: ${mappings.length}`);
  if (mappings.length > 0) {
    console.table(
      mappings.slice(0, 25).map(([tempId, realId]) => ({ tempId, realId })),
    );
  }
}

async function executeNonInteractiveRead(
  api: FigmaApi,
  fileKey: string,
  source: string,
  options: CliOptions,
) {
  const sourceType: SourceType = options.source || 'local';
  const response: ApiGetVariableResponse = await fetchVariablesBySource(
    api,
    fileKey,
    sourceType,
  );
  const collections = Object.values(response.meta.variableCollections);

  console.log(
    `Using file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
  );

  if (options.action === 'collections') {
    printCollections(collections);
    return;
  }

  if (options.action === 'modes') {
    printModes(collections);
    return;
  }

  const rows = buildVariableRows(response, {
    collectionFilter: options.collection,
    modeFilter: options.mode,
    rowLimit: options.maxRows || 100,
  });
  console.table(rows);
  console.log(`Displayed ${rows.length} variable(s).`);
}

export async function executeNonInteractiveAction(
  api: FigmaApi,
  options: CliOptions,
) {
  if (!options.action) {
    return;
  }

  const { fileKey, source } = resolveFileKeyFromOptions(options);

  if (options.action === 'post') {
    await executeNonInteractivePost(api, fileKey, source, options);
    return;
  }

  await executeNonInteractiveRead(api, fileKey, source, options);
}
