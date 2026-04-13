import 'dotenv/config';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

import FigmaApi from '../../figma_api.js';
import { brightRed, green } from '../../utils.js';
import { validateEnv } from './env.js';
import {
  executeGetCollections,
  handleGetCollections,
} from './get-collections.js';
import {
  executeGetCollectionById,
  handleGetCollectionById,
} from './get-collection-by-id.js';
import { executeGetModes, handleGetModes } from './get-modes.js';
import {
  executeGetVariableById,
  handleGetVariableById,
} from './get-variable-by-id.js';
import { executeGetVariables, handleGetVariables } from './get-variables.js';
import {
  parseCliOptions,
  printHelp,
  printUnknownFlagsWarning,
} from './options.js';
import { executePost, handlePostVariables } from './post-variables.js';
import { askMenuOption, printMenu } from './prompts.js';
import type { CliOptions } from './types.js';

async function executeNonInteractiveAction(api: FigmaApi, options: CliOptions) {
  switch (options.action) {
    case 'collections':
      return executeGetCollections(api, options);
    case 'collection-by-id':
      return executeGetCollectionById(api, options);
    case 'modes':
      return executeGetModes(api, options);
    case 'variables':
      return executeGetVariables(api, options);
    case 'variable-by-id':
      return executeGetVariableById(api, options);
    case 'post':
      return executePost(api, options);
  }
}

async function main() {
  const cliOptions = parseCliOptions();
  printUnknownFlagsWarning(cliOptions);

  if (cliOptions.help) {
    printHelp();
    return;
  }

  const token = validateEnv();
  const api = new FigmaApi(token);

  if (cliOptions.action) {
    try {
      await executeNonInteractiveAction(api, cliOptions);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(brightRed(`Action failed: ${message}`));
      process.exit(1);
    }
  }

  const rl = createInterface({ input, output });

  process.on('SIGINT', () => {
    rl.close();
    console.log('\nExiting.');
    process.exit(0);
  });

  console.log('Inspect and modify Figma variables with interactive prompts.');

  try {
    while (true) {
      printMenu();
      const option = await askMenuOption(rl, 7);

      try {
        if (option === 1) {
          await handleGetCollections(rl, api);
        } else if (option === 2) {
          await handleGetModes(rl, api);
        } else if (option === 3) {
          await handleGetVariables(rl, api);
        } else if (option === 4) {
          await handleGetVariableById(rl, api);
        } else if (option === 5) {
          await handlePostVariables(rl, api);
        } else if (option === 6) {
          await handleGetCollectionById(rl, api);
        } else {
          console.log(green('Done.'));
          break;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(brightRed(`Action failed: ${message}`));
      }
    }
  } finally {
    rl.close();
  }
}

export default main;
