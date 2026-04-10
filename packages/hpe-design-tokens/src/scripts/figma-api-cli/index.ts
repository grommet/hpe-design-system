import CLI from './figma-api-cli.js';
import { brightRed } from '../../utils.js';

CLI().catch(error => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(brightRed(`Fatal error: ${message}`));
  process.exit(1);
});
