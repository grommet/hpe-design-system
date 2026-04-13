import cli from './figma-variables-cli.js';
import { brightRed } from '../../utils.js';

cli().catch(error => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(brightRed(`Fatal error: ${message}`));
  process.exit(1);
});
