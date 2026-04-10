import 'dotenv/config';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

import FigmaApi from '../../figma_api.js';
import { brightRed, green } from '../../utils.js';
import {
  executeNonInteractiveAction,
  handlePostAction,
  handleReadAction,
} from './actions.js';
import { validateEnv } from './env.js';
import { parseCliOptions, printHelp } from './options.js';
import { askMenuOption, printMenu } from './prompts.js';

async function main() {
  validateEnv();
  const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN || '');
  const cliOptions = parseCliOptions();

  if (cliOptions.help) {
    printHelp();
    return;
  }

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
      const option = await askMenuOption(rl, 5);

      try {
        if (option === 1) {
          await handleReadAction(rl, api, 'collections');
        } else if (option === 2) {
          await handleReadAction(rl, api, 'modes');
        } else if (option === 3) {
          await handleReadAction(rl, api, 'variables');
        } else if (option === 4) {
          await handlePostAction(rl, api);
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
