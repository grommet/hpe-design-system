import { roleToFileKeyEnv } from './env.js';
import {
  isActionType,
  isRole,
  isSourceType,
  type CliOptions,
  type FileKeySelection,
} from './types.js';

export function parseCliOptions(argv = process.argv.slice(2)): CliOptions {
  const options: CliOptions = {};

  argv.forEach(arg => {
    if (!arg.startsWith('--')) {
      return;
    }

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      return;
    }

    const [rawKey, ...rest] = arg.slice(2).split('=');
    const key = rawKey.trim();
    const value = rest.join('=').trim();

    if (!value) {
      return;
    }

    if (key === 'action' && isActionType(value)) {
      options.action = value;
    } else if (key === 'source' && isSourceType(value)) {
      options.source = value;
    } else if (key === 'role' && isRole(value)) {
      options.role = value;
    } else if (key === 'file-key') {
      options.fileKey = value;
    } else if (key === 'payload') {
      options.payload = value;
    } else if (key === 'collection') {
      options.collection = value;
    } else if (key === 'mode') {
      options.mode = value;
    } else if (key === 'max-rows') {
      const parsed = Number(value);
      if (Number.isFinite(parsed) && parsed > 0) {
        options.maxRows = parsed;
      }
    } else if (key === 'confirm') {
      options.confirm = value;
    }
  });

  return options;
}

export function printHelp() {
  console.log('Figma Variables CLI');
  console.log('Interactive mode:');
  console.log('  pnpm figma-api-cli');
  console.log('');
  console.log('Non-interactive examples:');
  console.log(
    '  pnpm figma-api-cli -- --action=collections --source=local --role=primitive',
  );
  console.log(
    '  pnpm figma-api-cli -- --action=variables --source=published --file-key=<key> --collection=color --mode=light --max-rows=50',
  );
  console.log(
    '  pnpm figma-api-cli -- --action=post --role=semantic --payload=./payload.json --confirm=YES',
  );
  console.log('');
  console.log('Flags:');
  console.log('  --action=collections|modes|variables|post');
  console.log('  --source=local|published  (read actions only, default local)');
  console.log(
    '  --role=primitive|semantic|component  or --file-key=<figmaFileKey>',
  );
  console.log(
    '  --collection=<name>  --mode=<name>  --max-rows=<number> (variables)',
  );
  console.log('  --payload=<path> --confirm=YES (post)');
}

export function resolveFileKeyFromOptions(
  options: CliOptions,
): FileKeySelection {
  if (options.fileKey) {
    return { fileKey: options.fileKey, source: 'manual input' };
  }

  if (options.role) {
    const envVar = roleToFileKeyEnv[options.role];
    const fileKey = process.env[envVar];
    if (!fileKey) {
      throw new Error(
        `${envVar} is required when using --role=${options.role}.`,
      );
    }

    return { fileKey, source: `${options.role} (${envVar})` };
  }

  throw new Error(
    'Provide either --file-key=<key> or --role=primitive|semantic|component.',
  );
}
