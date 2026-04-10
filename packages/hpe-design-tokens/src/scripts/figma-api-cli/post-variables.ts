import * as fs from 'fs';

import FigmaApi from '../../figma_api.js';
import { green } from '../../utils.js';
import { resolveFileKeyFromOptions } from './options.js';
import { payloadSummary, validatePostPayload } from './payload.js';
import {
  ask,
  chooseFileKey,
  confirm,
  type ReadlineInterface,
} from './prompts.js';
import type { CliOptions } from './types.js';

export async function handlePostVariables(
  rl: ReadlineInterface,
  api: FigmaApi,
) {
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

export async function executePost(api: FigmaApi, options: CliOptions) {
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

  const { fileKey, source } = resolveFileKeyFromOptions(options);
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
