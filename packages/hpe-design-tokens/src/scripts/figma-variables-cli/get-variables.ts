import FigmaApi from '../../figma_api.js';
import { resolveFileKeyFromOptions } from './options.js';
import { buildVariableRows, printVariables } from './output.js';
import {
  chooseFileKey,
  chooseSourceType,
  type ReadlineInterface,
} from './prompts.js';
import type { CliOptions, SourceType } from './types.js';
import { fetchVariablesBySource } from './fetch.js';

export async function handleGetVariables(rl: ReadlineInterface, api: FigmaApi) {
  const { fileKey, source } = await chooseFileKey(rl);
  const sourceType = await chooseSourceType(rl);
  const response = await fetchVariablesBySource(api, fileKey, sourceType);
  const collections = Object.values(response.meta.variableCollections);

  console.log(
    `\nUsing file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
  );
  await printVariables(rl, response);
}

export async function executeGetVariables(api: FigmaApi, options: CliOptions) {
  const { fileKey, source } = resolveFileKeyFromOptions(options);
  const sourceType: SourceType = options.source || 'local';
  const response = await fetchVariablesBySource(api, fileKey, sourceType);
  const collections = Object.values(response.meta.variableCollections);

  console.log(
    `Using file key (${source}) in ${sourceType} scope. Collections: ${collections.length}`,
  );

  const rows = buildVariableRows(response, {
    collectionFilter: options.collection,
    modeFilter: options.mode,
    rowLimit: options.maxRows || 100,
  });

  if (options.format === 'json') {
    console.log(
      JSON.stringify(
        {
          fileKeySource: source,
          sourceType,
          filters: {
            collection: options.collection || null,
            mode: options.mode || null,
            maxRows: options.maxRows || 100,
          },
          count: rows.length,
          rows,
        },
        null,
        2,
      ),
    );
    return;
  }

  console.table(rows);
  console.log(`Displayed ${rows.length} variable(s).`);
}
