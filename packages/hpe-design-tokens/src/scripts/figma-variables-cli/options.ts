import { roleToFileKeyEnv } from './env.js';
import {
  isActionType,
  isRole,
  isSourceType,
  type CliOptions,
  type FileKeySelection,
} from './types.js';

export function parseCliOptions(argv = process.argv.slice(2)): CliOptions {
  const options: CliOptions = {
    unknownFlags: [],
  };

  argv.forEach(arg => {
    if (arg === '--') {
      return;
    }

    if (arg === '-h') {
      options.help = true;
      return;
    }

    if (!arg.startsWith('--')) {
      return;
    }

    if (arg === '--help') {
      options.help = true;
      return;
    }

    if (arg === '--debug') {
      options.debug = true;
      return;
    }

    if (arg === '--strict-flags') {
      options.strictFlags = true;
      return;
    }

    if (arg === '--non-interactive') {
      options.nonInteractive = true;
      return;
    }

    if (!arg.includes('=')) {
      options.unknownFlags?.push(arg);
      return;
    }

    const [rawKey, ...rest] = arg.slice(2).split('=');
    const key = rawKey.trim();
    const value = rest.join('=').trim();

    if (!value) {
      options.unknownFlags?.push(arg);
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
    } else if (key === 'file-keys') {
      options.fileKeys = value
        .split(',')
        .map(fileKey => fileKey.trim())
        .filter(Boolean);
    } else if (key === 'file-keys-file') {
      options.fileKeysFile = value;
    } else if (key === 'payload') {
      options.payload = value;
    } else if (key === 'collection') {
      options.collection = value;
    } else if (key === 'mode') {
      options.mode = value;
    } else if (key === 'collection-id') {
      options.collectionId = value;
    } else if (key === 'max-rows') {
      const parsed = Number(value);
      if (Number.isFinite(parsed) && parsed > 0) {
        options.maxRows = parsed;
      }
    } else if (key === 'variable-id') {
      options.variableId = value;
    } else if (key === 'confirm') {
      options.confirm = value;
    } else if (key === 'format') {
      if (value === 'table' || value === 'json') {
        options.format = value;
      } else {
        options.unknownFlags?.push(arg);
      }
    } else if (key === 'debug') {
      options.debug = value === 'true' || value === '1' || value === 'yes';
    } else if (key === 'strict-flags') {
      options.strictFlags =
        value === 'true' || value === '1' || value === 'yes';
    } else if (key === 'non-interactive') {
      options.nonInteractive =
        value === 'true' || value === '1' || value === 'yes';
    } else {
      options.unknownFlags?.push(arg);
    }
  });

  if (!options.unknownFlags?.length) {
    delete options.unknownFlags;
  }

  return options;
}

export function printUnknownFlagsWarning(options: CliOptions) {
  if (!options.unknownFlags || options.unknownFlags.length === 0) {
    return;
  }

  const deduped = Array.from(new Set(options.unknownFlags));
  console.warn(
    `Ignoring unknown or malformed flag(s): ${deduped.join(
      ', ',
    )}. Run --help for supported options.`,
  );
}

export function getCliOptionErrors(options: CliOptions) {
  const errors: string[] = [];

  if (
    options.strictFlags &&
    options.unknownFlags &&
    options.unknownFlags.length > 0
  ) {
    const deduped = Array.from(new Set(options.unknownFlags));
    errors.push(
      `Unknown or malformed flag(s): ${deduped.join(
        ', ',
      )}. Remove them or disable --strict-flags.`,
    );
  }

  return errors;
}

export function printHelp() {
  console.log('Figma Variables CLI');
  console.log('Interactive mode:');
  console.log('  pnpm figma-variables-cli');
  console.log('');
  console.log('Non-interactive examples:');
  console.log(
    '  pnpm figma-variables-cli -- --non-interactive --strict-flags --action=collections --source=local --role=primitive',
  );
  console.log(
    '  pnpm figma-variables-cli -- --non-interactive --strict-flags --action=variables --source=published --file-key=<key> --collection=color --mode=light --max-rows=50 --format=json',
  );
  console.log(
    '  pnpm figma-variables-cli -- --non-interactive --strict-flags --action=collection-by-id --source=local --role=semantic --collection-id=<collection-id> --format=json',
  );
  console.log(
    '  pnpm figma-variables-cli -- --non-interactive --strict-flags --action=variable-by-id --source=local --role=semantic --variable-id=<variable-id> --format=json',
  );
  console.log(
    '  pnpm figma-variables-cli -- --non-interactive --strict-flags --action=variable-by-id --variable-id=<variable-id> --format=json',
  );
  console.log(
    '  pnpm figma-variables-cli -- --non-interactive --strict-flags --action=variable-by-id --file-keys=<key1,key2,key3> --variable-id=<variable-id> --format=json',
  );
  console.log(
    '  pnpm figma-variables-cli -- --non-interactive --strict-flags --action=variable-by-id --file-keys-file=./file-keys.txt --variable-id=<variable-id> --format=json',
  );
  console.log(
    '  pnpm figma-variables-cli -- --non-interactive --strict-flags --action=variable-by-id --variable-id=<variable-id> --format=table --debug',
  );
  console.log(
    '  pnpm figma-variables-cli -- --non-interactive --strict-flags --action=post --role=semantic --payload=./payload.json --confirm=YES',
  );
  console.log('');
  console.log('Flags:');
  console.log(
    '  --non-interactive (require explicit --action, no prompt fallback)',
  );
  console.log('  --strict-flags (fail on unknown/malformed flags)');
  console.log(
    '  --action=collections|collection-by-id|modes|variables|variable-by-id|post',
  );
  console.log('  --source=local|published  (read actions only, default local)');
  console.log(
    '  --role=primitive|semantic|component  or --file-key=<figmaFileKey>',
  );
  console.log(
    '  --file-keys=<k1,k2,...> or --file-keys-file=<path> (collection-by-id / variable-by-id multi-file search)',
  );
  console.log(
    '  --collection-id=<id> (collection-by-id action, exact id match)',
  );
  console.log(
    '  --variable-id=<id> (variable-by-id action, accepts VariableID:<id>)',
  );
  console.log(
    '  --collection=<name>  --mode=<name>  --max-rows=<number> (variables)',
  );
  console.log('  --format=table|json (read actions, default table)');
  console.log(
    '  --debug (collection-by-id / variable-by-id lookup diagnostics)',
  );
  console.log('  --payload=<path> --confirm=YES (post)');
  console.log('  --help');
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
