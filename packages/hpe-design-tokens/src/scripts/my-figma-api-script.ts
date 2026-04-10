import 'dotenv/config';
import * as fs from 'fs';
import { createInterface } from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

import FigmaApi, {
  type ApiGetVariableResponse,
  type ApiPostVariablesPayload,
  type Variable,
  type VariableCollection,
} from '../figma_api.js';
import { brightRed, green } from '../utils.js';

type Role = 'primitive' | 'semantic' | 'component';
type SourceType = 'local' | 'published';

const roleToFileKeyEnv: Record<Role, string> = {
  primitive: 'FILE_KEY_PRIMITIVE',
  semantic: 'FILE_KEY_SEMANTIC',
  component: 'FILE_KEY_COMPONENT',
};

const isPayloadArray = (value: unknown): value is unknown[] =>
  value === undefined || Array.isArray(value);

const payloadSummary = (payload: ApiPostVariablesPayload) => ({
  variableCollections: payload.variableCollections?.length || 0,
  variableModes: payload.variableModes?.length || 0,
  variables: payload.variables?.length || 0,
  variableModeValues: payload.variableModeValues?.length || 0,
});

const previewVariableValue = (value: Variable['valuesByMode'][string]) => {
  if (typeof value === 'object' && value !== null) {
    if ('type' in value && value.type === 'VARIABLE_ALIAS') {
      return `alias:${value.id}`;
    }
    if ('r' in value && 'g' in value && 'b' in value) {
      const alpha = 'a' in value && typeof value.a === 'number' ? value.a : 1;
      return `rgba(${value.r.toFixed(3)}, ${value.g.toFixed(
        3,
      )}, ${value.b.toFixed(3)}, ${alpha.toFixed(3)})`;
    }
  }

  return JSON.stringify(value);
};

const validatePostPayload = (
  payload: unknown,
): payload is ApiPostVariablesPayload => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    isPayloadArray(candidate.variableCollections) &&
    isPayloadArray(candidate.variableModes) &&
    isPayloadArray(candidate.variables) &&
    isPayloadArray(candidate.variableModeValues)
  );
};

async function ask(rl: ReturnType<typeof createInterface>, prompt: string) {
  return rl.question(prompt);
}

async function askMenuOption(
  rl: ReturnType<typeof createInterface>,
  maxOption: number,
) {
  while (true) {
    const answer = (await ask(rl, '\nSelect option: ')).trim();
    const parsed = Number(answer);
    if (Number.isInteger(parsed) && parsed >= 1 && parsed <= maxOption) {
      return parsed;
    }
    console.log(brightRed(`Please enter a number between 1 and ${maxOption}.`));
  }
}

async function chooseSourceType(rl: ReturnType<typeof createInterface>) {
  console.log('\nChoose variable source:');
  console.log('1. local');
  console.log('2. published');

  const choice = await askMenuOption(rl, 2);
  return choice === 1 ? 'local' : 'published';
}

async function chooseFileKey(
  rl: ReturnType<typeof createInterface>,
): Promise<{ fileKey: string; source: string }> {
  console.log('\nChoose target file key source:');
  console.log(
    '1. role env var (FILE_KEY_PRIMITIVE | FILE_KEY_SEMANTIC | FILE_KEY_COMPONENT)',
  );
  console.log('2. raw file key input');

  const choice = await askMenuOption(rl, 2);

  if (choice === 1) {
    console.log('\nSelect role:');
    console.log('1. primitive');
    console.log('2. semantic');
    console.log('3. component');
    const roleChoice = await askMenuOption(rl, 3);
    const role = (['primitive', 'semantic', 'component'][roleChoice - 1] ||
      'primitive') as Role;
    const envVar = roleToFileKeyEnv[role];
    const fileKey = process.env[envVar];

    if (!fileKey) {
      throw new Error(`${envVar} is required to use role-based selection.`);
    }

    return { fileKey, source: `${role} (${envVar})` };
  }

  const rawFileKey = (await ask(rl, '\nEnter raw Figma file key: ')).trim();
  if (!rawFileKey) {
    throw new Error('A file key is required.');
  }

  return { fileKey: rawFileKey, source: 'manual input' };
}

async function fetchVariablesBySource(
  api: FigmaApi,
  fileKey: string,
  sourceType: SourceType,
) {
  return sourceType === 'local'
    ? api.getLocalVariables(fileKey)
    : api.getPublishedVariables(fileKey);
}

function printCollections(collections: VariableCollection[]) {
  const rows = collections.map(collection => ({
    name: collection.name,
    key: collection.key || '',
    id: collection.id,
    remote: collection.remote,
    variableCount: collection.variableIds?.length || 0,
    modes: collection.modes.map(mode => mode.name).join('|'),
  }));

  console.table(rows);
}

function printModes(collections: VariableCollection[]) {
  const rows = collections.flatMap(collection =>
    collection.modes.map(mode => ({
      collectionName: collection.name,
      collectionId: collection.id,
      modeName: mode.name,
      modeId: mode.modeId,
    })),
  );

  console.table(rows);
}

async function printVariables(
  rl: ReturnType<typeof createInterface>,
  response: ApiGetVariableResponse,
) {
  const collectionFilter = (
    await ask(rl, '\nOptional collection name filter (press enter to skip): ')
  ).trim();
  const modeFilter = (
    await ask(rl, 'Optional mode name filter (press enter to skip): ')
  ).trim();
  const maxRowsInput = (
    await ask(rl, 'Max rows to print (default 100): ')
  ).trim();

  const maxRows = Number(maxRowsInput);
  const rowLimit = Number.isFinite(maxRows) && maxRows > 0 ? maxRows : 100;

  const collectionsById = response.meta.variableCollections;
  const rows = Object.values(response.meta.variables)
    .filter(variable => {
      const collection = collectionsById[variable.variableCollectionId];
      if (!collection) {
        return false;
      }

      const collectionMatches =
        !collectionFilter || collection.name === collectionFilter;
      if (!collectionMatches) {
        return false;
      }

      if (!modeFilter) {
        return true;
      }

      const matchingModeIds = collection.modes
        .filter(mode => mode.name === modeFilter)
        .map(mode => mode.modeId);

      return matchingModeIds.some(
        modeId => variable.valuesByMode[modeId] !== undefined,
      );
    })
    .slice(0, rowLimit)
    .map(variable => {
      const collection = collectionsById[variable.variableCollectionId];
      const firstModeId = Object.keys(variable.valuesByMode)[0];
      const firstModeName =
        collection?.modes.find(mode => mode.modeId === firstModeId)?.name ||
        firstModeId ||
        '';

      return {
        name: variable.name,
        id: variable.id,
        collection: collection?.name || variable.variableCollectionId,
        resolvedType: variable.resolvedType,
        remote: variable.remote,
        previewMode: firstModeName,
        previewValue:
          firstModeId !== undefined
            ? previewVariableValue(variable.valuesByMode[firstModeId])
            : '',
      };
    });

  console.table(rows);
  console.log(`Displayed ${rows.length} variable(s).`);
}

async function confirm(
  rl: ReturnType<typeof createInterface>,
  prompt = 'Type YES to continue: ',
) {
  const answer = (await ask(rl, prompt)).trim();
  return answer === 'YES';
}

async function handleReadAction(
  rl: ReturnType<typeof createInterface>,
  api: FigmaApi,
  action: 'collections' | 'modes' | 'variables',
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

async function handlePostAction(
  rl: ReturnType<typeof createInterface>,
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

function printMenu() {
  console.log('\nFigma Variables CLI');
  console.log('1. Get variable collections');
  console.log('2. Get variable modes');
  console.log('3. Get variables');
  console.log('4. Post variables');
  console.log('5. None (exit)');
}

function validateEnv() {
  if (!process.env.PERSONAL_ACCESS_TOKEN) {
    throw new Error('PERSONAL_ACCESS_TOKEN environment variable is required.');
  }

  const missingRoleEnvVars = Object.values(roleToFileKeyEnv).filter(
    envVar => !process.env[envVar],
  );

  if (missingRoleEnvVars.length > 0) {
    console.log(
      brightRed(
        `Role-based file key selection will be unavailable until these are set: ${missingRoleEnvVars.join(
          ', ',
        )}`,
      ),
    );
  }
}

async function main() {
  validateEnv();
  const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN || '');
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

main().catch(error => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(brightRed(`Fatal error: ${message}`));
  process.exit(1);
});
