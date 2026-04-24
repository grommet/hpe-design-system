import 'dotenv/config';
import * as fs from 'fs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import FigmaApi, {
  ApiGetLocalVariablesResponse,
  ApiPostVariablesPayload,
} from '../figma_api.js';
import {
  generatePostVariablesPayload,
  readJsonFiles,
} from '../token_import.js';
import { green, verifyReferences } from '../utils.js';

type Role = 'primitive' | 'semantic' | 'component';

type SyncOptions = {
  apply: boolean;
  nonInteractive: boolean;
  roleFilter?: Role;
  // When set, all collections from every role are pushed into one Figma file.
  // Cross-collection aliases resolve via temp IDs within the single payload,
  // making it ideal for fresh disposable test environments that don't yet have
  // library subscriptions set up between files.
  singleFileKey?: string;
  // When set, use name-based aliases instead of real variable IDs for cross-file
  // references. This allows syncing to fresh multi-file setups without library
  // subscriptions. After initial apply, set up subscriptions in Figma then re-run
  // without this flag so subsequent syncs use real IDs.
  freshFiles?: boolean;
  // Validate VariableID alias keys against expected upstream published libraries.
  checkAliasSources?: boolean;
  // Same as checkAliasSources, but fail the role when drift is detected.
  strictAliasSources?: boolean;
  // Print full per-mode alias chain traces for drifted entries.
  traceAliasChains?: boolean;
};

type AliasDriftEntry = {
  aliasId: string;
  aliasKey: string;
  aliasCanonicalName?: string;
  count: number;
  consumers: string[];
  modes: string[];
  modeTraces: string[];
};

const TOKENS_DIR = 'tokens';

const roleToEnv: Record<Role, string> = {
  primitive: 'FILE_KEY_PRIMITIVE',
  semantic: 'FILE_KEY_SEMANTIC',
  component: 'FILE_KEY_COMPONENT',
};

function parseCliOptions(argv = process.argv.slice(2)): SyncOptions {
  let apply = false;
  let nonInteractive = false;
  let roleFilter: Role | undefined;
  let singleFileKey: string | undefined;
  let freshFiles = false;
  let checkAliasSources = false;
  let strictAliasSources = false;
  let traceAliasChains = false;

  argv.forEach(arg => {
    if (arg === '--apply') {
      apply = true;
      return;
    }

    if (arg === '--non-interactive') {
      nonInteractive = true;
      return;
    }

    if (arg.startsWith('--role=')) {
      const value = arg.split('=')[1] as Role;
      if (
        value === 'primitive' ||
        value === 'semantic' ||
        value === 'component'
      ) {
        roleFilter = value;
      }
      return;
    }

    if (arg.startsWith('--single-file=')) {
      singleFileKey = arg.split('=').slice(1).join('=').trim();
      return;
    }

    if (arg === '--fresh-files') {
      freshFiles = true;
      return;
    }

    if (arg === '--check-alias-sources') {
      checkAliasSources = true;
      return;
    }

    if (arg === '--strict-alias-sources') {
      strictAliasSources = true;
      checkAliasSources = true;
      return;
    }

    if (arg === '--trace-alias-chains') {
      traceAliasChains = true;
    }
  });

  if (singleFileKey && freshFiles) {
    throw new Error(
      '--single-file and --fresh-files are mutually exclusive. Choose one:\n' +
        '  --single-file=<key>  Merge all roles into one file (simpler for disposable test envs)\n' +
        '  --fresh-files        Multi-file sync using name-based aliases (no subscriptions needed)',
    );
  }

  return {
    apply,
    nonInteractive,
    roleFilter,
    singleFileKey,
    freshFiles,
    checkAliasSources,
    strictAliasSources,
    traceAliasChains,
  };
}

function parseFileKeyInput(rawValue: string) {
  const value = rawValue.trim();

  if (!value) {
    return '';
  }

  const designUrlMatch = value.match(/\/design\/([a-zA-Z0-9]+)\/?/);
  if (designUrlMatch?.[1]) {
    return designUrlMatch[1];
  }

  const fileUrlMatch = value.match(/\/file\/([a-zA-Z0-9]+)\/?/);
  if (fileUrlMatch?.[1]) {
    return fileUrlMatch[1];
  }

  return value;
}

async function validateFileKey(api: FigmaApi, fileKey: string) {
  await api.getLocalVariables(fileKey);
}

async function resolveRoleFileKey(
  role: Role,
  api: FigmaApi,
  rl: readline.Interface | null,
  nonInteractive: boolean,
) {
  const envVar = roleToEnv[role];
  const existing = process.env[envVar]?.trim();

  if (existing) {
    try {
      await validateFileKey(api, existing);
      console.log(green(`✅ Using ${envVar} for ${role}`));
      return { fileKey: existing, fromPrompt: false };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`⚠️  ${envVar} is set but invalid for ${role}: ${message}`);
    }
  }

  if (nonInteractive || !rl) {
    console.log(
      `Skipping ${role}. ${envVar} is missing or invalid and interactive mode is disabled.`,
    );
    return null;
  }

  while (true) {
    const answer = await rl.question(
      `Enter Figma file key or URL for ${role} (leave empty to skip): `,
    );
    const parsed = parseFileKeyInput(answer);

    if (!parsed) {
      console.log(`Skipping ${role}.`);
      return null;
    }

    try {
      await validateFileKey(api, parsed);
      console.log(green(`✅ Resolved ${role} file key: ${parsed}`));
      return { fileKey: parsed, fromPrompt: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`Unable to read local variables for ${role} key: ${message}`);
      console.log('Try another file key or paste a full Figma URL.');
    }
  }
}

function getTokenFilesForRole(role: Role) {
  const dir = `${TOKENS_DIR}/${role}`;
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.json'))
    .map(entry => `${dir}/${entry.name}`);
}

function payloadCounts(
  payload: ReturnType<typeof generatePostVariablesPayload>,
) {
  return {
    variableCollections: payload.variableCollections?.length || 0,
    variableModes: payload.variableModes?.length || 0,
    variables: payload.variables?.length || 0,
    variableModeValues: payload.variableModeValues?.length || 0,
  };
}

function isPayloadEmpty(
  payload: ReturnType<typeof generatePostVariablesPayload>,
) {
  return Object.values(payload).every(
    value => !value || (Array.isArray(value) && value.length === 0),
  );
}

function reportUnresolvedAliases(
  payload: ReturnType<typeof generatePostVariablesPayload>,
  label: string,
) {
  // An alias value whose id is a plain string (not a VariableID:... real ID
  // and not a temp id in the same payload) will be rejected by Figma.  We
  // surface these before POSTing so the user can act on them instead of
  // receiving a cryptic 400.
  const tempVariableIds = new Set(
    (payload.variables || [])
      .filter(v => v.id && !v.id.startsWith('VariableID:'))
      .map(v => v.id as string),
  );

  const unresolved: string[] = [];
  (payload.variableModeValues || []).forEach(mv => {
    const val = mv.value;
    if (
      typeof val === 'object' &&
      val !== null &&
      'type' in val &&
      val.type === 'VARIABLE_ALIAS' &&
      typeof val.id === 'string' &&
      !val.id.startsWith('VariableID:') &&
      !tempVariableIds.has(val.id)
    ) {
      unresolved.push(
        `  alias "${val.id}" used by variableId "${mv.variableId}" (mode "${mv.modeId}") was not found locally or in cross-file context`,
      );
    }
    if (
      typeof mv.variableId === 'string' &&
      !mv.variableId.startsWith('VariableID:') &&
      !tempVariableIds.has(mv.variableId)
    ) {
      // unusual – variable itself is unresolved
    }
  });

  if (unresolved.length > 0) {
    console.log(
      `\n⚠️  ${label}: ${unresolved.length} unresolved alias(es) – these will cause a Figma 400 on apply:`,
    );
    unresolved.slice(0, 20).forEach(msg => console.log(msg));
    if (unresolved.length > 20) {
      console.log(`  … and ${unresolved.length - 20} more`);
    }
  } else {
    console.log(`  aliases: all resolved ✅`);
  }

  return unresolved.length;
}

function extractInvalidAliasFromMessage(message: string) {
  const match = message.match(/Invalid alias:\s(.+?)\sdoes not exist/i);
  return match?.[1]?.trim() || null;
}

function extractAliasKey(aliasId: string) {
  const match = aliasId.match(/^VariableID:([^/]+)\//);
  return match?.[1] || null;
}

function resolveAliasChainForMode(
  initialAliasId: string,
  modeId: string,
  variableById: Record<
    string,
    {
      variableCollectionId: string;
      valuesByMode: Record<string, unknown>;
    }
  >,
  collectionDefaultModeById: Record<string, string>,
  plannedValueByVarMode: Record<string, unknown>,
) {
  let aliasId = initialAliasId;
  let currentModeId = modeId;
  const visited = new Set<string>();
  const chain: string[] = [initialAliasId];
  let cycleDetected = false;

  // Hard-stop depth to avoid pathological cycles in malformed data.
  for (let i = 0; i < 25; i += 1) {
    const nodeKey = `${aliasId}::${currentModeId}`;
    if (visited.has(nodeKey)) {
      cycleDetected = true;
      break;
    }
    visited.add(nodeKey);

    const variable = variableById[aliasId];
    if (!variable) {
      break;
    }

    const planned = plannedValueByVarMode[nodeKey];
    const direct = variable.valuesByMode[currentModeId];
    const defaultModeId =
      collectionDefaultModeById[variable.variableCollectionId] || '';
    const fallbackDefault = defaultModeId
      ? variable.valuesByMode[defaultModeId]
      : undefined;
    const fallbackAny = Object.values(variable.valuesByMode)[0];

    const resolvedValue = planned || direct || fallbackDefault || fallbackAny;
    if (
      !resolvedValue ||
      typeof resolvedValue !== 'object' ||
      !('type' in resolvedValue) ||
      resolvedValue.type !== 'VARIABLE_ALIAS' ||
      typeof resolvedValue.id !== 'string'
    ) {
      break;
    }

    aliasId = resolvedValue.id;
    chain.push(aliasId);

    // If we jumped into another variable collection, follow that collection's
    // default mode on next hop unless the same mode id still exists there.
    const nextVariable = variableById[aliasId];
    if (nextVariable) {
      if (!nextVariable.valuesByMode[currentModeId]) {
        const nextDefault =
          collectionDefaultModeById[nextVariable.variableCollectionId];
        if (nextDefault) {
          currentModeId = nextDefault;
        }
      }
    }
  }

  return {
    terminalAliasId: aliasId,
    chain,
    cycleDetected,
  };
}

function collectAliasSourceDrift(
  localVariables: ApiGetLocalVariablesResponse,
  allowedAliasKeys: Set<string>,
  aliasNameByKey: Record<string, string>,
) {
  const consumerNameById: Record<string, string> = {};
  Object.values(localVariables.meta.variables).forEach(variable => {
    consumerNameById[variable.id] = variable.name;
  });

  const modeNameById: Record<string, string> = {};
  const collectionDefaultModeById: Record<string, string> = {};
  Object.values(localVariables.meta.variableCollections).forEach(collection => {
    collectionDefaultModeById[collection.id] = collection.defaultModeId;
    collection.modes.forEach(mode => {
      modeNameById[mode.modeId] = `${collection.name}/${mode.name}`;
    });
  });

  const variableById: Record<
    string,
    {
      variableCollectionId: string;
      valuesByMode: Record<string, unknown>;
    }
  > = {};
  Object.values(localVariables.meta.variables).forEach(variable => {
    variableById[variable.id] = {
      variableCollectionId: variable.variableCollectionId,
      valuesByMode: variable.valuesByMode || {},
    };
  });

  // Build the full current mode-value set from the live Figma state so drift
  // detection is not sensitive to which values happen to be in the diff payload.
  const currentModeValues: Array<{
    variableId: string;
    modeId: string;
    value: unknown;
  }> = [];
  Object.values(localVariables.meta.variables).forEach(variable => {
    // Only check local (non-remote) variables — remote ones are upstream sources.
    if (variable.remote) {
      return;
    }
    Object.entries(variable.valuesByMode || {}).forEach(([modeId, value]) => {
      currentModeValues.push({ variableId: variable.id, modeId, value });
    });
  });

  const plannedValueByVarMode: Record<string, unknown> = {};

  const driftByAlias = new Map<
    string,
    {
      aliasKey: string;
      aliasCanonicalNames: Set<string>;
      count: number;
      consumers: Set<string>;
      modes: Set<string>;
      modeTraceByMode: Map<string, string>;
    }
  >();

  currentModeValues.forEach(mv => {
    const value = mv.value;
    if (
      typeof value !== 'object' ||
      value === null ||
      !('type' in value) ||
      (value as Record<string, unknown>).type !== 'VARIABLE_ALIAS' ||
      typeof (value as Record<string, unknown>).id !== 'string'
    ) {
      return;
    }

    const { terminalAliasId, chain, cycleDetected } = resolveAliasChainForMode(
      (value as { id: string }).id,
      mv.modeId,
      variableById,
      collectionDefaultModeById,
      plannedValueByVarMode,
    );

    const aliasKey = extractAliasKey(terminalAliasId);
    if (!aliasKey || allowedAliasKeys.has(aliasKey)) {
      return;
    }

    const existing = driftByAlias.get(terminalAliasId) || {
      aliasKey,
      aliasCanonicalNames: new Set<string>(),
      count: 0,
      consumers: new Set<string>(),
      modes: new Set<string>(),
      modeTraceByMode: new Map<string, string>(),
    };
    const terminalAliasName =
      consumerNameById[terminalAliasId] || aliasNameByKey[aliasKey];
    if (terminalAliasName) {
      existing.aliasCanonicalNames.add(terminalAliasName);
    }
    existing.count += 1;
    existing.consumers.add(consumerNameById[mv.variableId] || mv.variableId);
    const modeLabel = modeNameById[mv.modeId] || mv.modeId;
    existing.modes.add(modeLabel);
    if (!existing.modeTraceByMode.has(modeLabel)) {
      const chainText = chain.join(' -> ');
      existing.modeTraceByMode.set(
        modeLabel,
        cycleDetected ? `${chainText} (cycle)` : chainText,
      );
    }
    driftByAlias.set(terminalAliasId, existing);
  });

  const drift = [...driftByAlias.entries()]
    .map(([aliasId, meta]) => ({
      aliasId,
      aliasKey: meta.aliasKey,
      aliasCanonicalName: [...meta.aliasCanonicalNames][0],
      count: meta.count,
      consumers: [...meta.consumers],
      modes: [...meta.modes],
      modeTraces: [...meta.modeTraceByMode.entries()].map(
        ([mode, trace]) => `${mode}: ${trace}`,
      ),
    }))
    .sort((a, b) => b.count - a.count);

  return drift;
}

function printAliasDriftReport(
  role: Role,
  drift: AliasDriftEntry[],
  expectedSourceLabels: string,
  traceAliasChains: boolean,
) {
  if (drift.length === 0) {
    console.log(`  alias source check: no drift ✅`);
    return;
  }

  console.log(
    `\n⚠️  Alias source drift for ${role}: ${drift.length} alias(es)`,
  );
  console.log(`  Expected source libraries: ${expectedSourceLabels}`);
  drift.slice(0, 15).forEach((entry, index) => {
    const consumers = entry.consumers.slice(0, 4).join(', ');
    const modes = entry.modes.slice(0, 3).join(', ');
    const canonicalLabel = entry.aliasCanonicalName || 'unknown';
    console.log(
      `  ${index + 1}. ${entry.aliasId} (key: ${entry.aliasKey}, used ${
        entry.count
      }x)\n` +
        `     canonical: ${canonicalLabel}\n` +
        `     consumers: ${consumers}${
          entry.consumers.length > 4 ? ', …' : ''
        }\n` +
        `     modes: ${modes}${entry.modes.length > 3 ? ', …' : ''}`,
    );
    if (traceAliasChains && entry.modeTraces.length > 0) {
      entry.modeTraces.slice(0, 5).forEach(trace => {
        console.log(`     trace: ${trace}`);
      });
      if (entry.modeTraces.length > 5) {
        console.log(`     … plus ${entry.modeTraces.length - 5} more traces.`);
      }
    }
  });
  if (drift.length > 15) {
    console.log(`  … plus ${drift.length - 15} more.`);
  }
}

function printRebindPunchlist(
  payload: ApiPostVariablesPayload,
  localVariables: ApiGetLocalVariablesResponse,
  label: string,
  failedAlias: string | null,
) {
  const tempVariableIds = new Set(
    (payload.variables || [])
      .filter(v => v.id && !v.id.startsWith('VariableID:'))
      .map(v => v.id as string),
  );

  const consumerNameById: Record<string, string> = {};
  Object.values(localVariables.meta.variables).forEach(variable => {
    consumerNameById[variable.id] = variable.name;
  });
  (payload.variables || []).forEach(variable => {
    if (variable.id && variable.name) {
      consumerNameById[variable.id] = variable.name;
    }
  });

  const modeNameById: Record<string, string> = {};
  Object.values(localVariables.meta.variableCollections).forEach(collection => {
    collection.modes.forEach(mode => {
      modeNameById[mode.modeId] = `${collection.name}/${mode.name}`;
    });
  });

  const byAlias = new Map<
    string,
    { count: number; consumers: Set<string>; modes: Set<string> }
  >();

  (payload.variableModeValues || []).forEach(mv => {
    const value = mv.value;
    if (
      typeof value !== 'object' ||
      value === null ||
      !('type' in value) ||
      value.type !== 'VARIABLE_ALIAS' ||
      typeof value.id !== 'string'
    ) {
      return;
    }

    const aliasId = value.id;
    if (tempVariableIds.has(aliasId)) {
      return;
    }

    // In proactive mode (no failed alias yet), only show unresolved name-based
    // aliases; VariableID aliases are normal in linked-library workflows.
    if (!failedAlias && aliasId.startsWith('VariableID:')) {
      return;
    }

    const existing = byAlias.get(aliasId) || {
      count: 0,
      consumers: new Set<string>(),
      modes: new Set<string>(),
    };
    existing.count += 1;
    existing.consumers.add(consumerNameById[mv.variableId] || mv.variableId);
    existing.modes.add(modeNameById[mv.modeId] || mv.modeId);
    byAlias.set(aliasId, existing);
  });

  if (byAlias.size === 0) {
    return;
  }

  const sorted = [...byAlias.entries()].sort((a, b) => {
    if (failedAlias) {
      if (a[0] === failedAlias) return -1;
      if (b[0] === failedAlias) return 1;
    }
    return b[1].count - a[1].count;
  });

  console.log(`\n🧭 Rebind punchlist for ${label}:`);
  if (failedAlias) {
    console.log(`  Failed alias from API: ${failedAlias}`);
  }
  console.log('  Rebind these local stand-ins to imported remote variables:');

  sorted.slice(0, 15).forEach(([aliasId, meta], index) => {
    const consumers = [...meta.consumers].slice(0, 4).join(', ');
    const modes = [...meta.modes].slice(0, 3).join(', ');
    console.log(
      `  ${index + 1}. ${aliasId}  (used ${meta.count}x)\n` +
        `     consumers: ${consumers}${
          meta.consumers.size > 4 ? ', …' : ''
        }\n` +
        `     modes: ${modes}${meta.modes.size > 3 ? ', …' : ''}`,
    );
  });

  if (sorted.length > 15) {
    console.log(`  … plus ${sorted.length - 15} more aliases.`);
  }
}

function formatError(error: unknown) {
  if (typeof error === 'object' && error !== null) {
    const maybeError = error as {
      message?: string;
      response?: { status?: number; data?: unknown };
    };

    if (maybeError.response) {
      const statusText =
        maybeError.response.status !== undefined
          ? `status ${maybeError.response.status}`
          : 'unknown status';
      const responseData =
        maybeError.response.data !== undefined
          ? JSON.stringify(maybeError.response.data, null, 2)
          : 'No response payload';

      return `${
        maybeError.message || 'Request failed'
      } (${statusText})\n${responseData}`;
    }

    if (maybeError.message) {
      return maybeError.message;
    }
  }

  return String(error);
}

async function main() {
  const options = parseCliOptions();

  if (!process.env.PERSONAL_ACCESS_TOKEN) {
    throw new Error('PERSONAL_ACCESS_TOKEN environment variable is required');
  }

  const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN);

  // ── Single-file mode ───────────────────────────────────────────────────────
  if (options.singleFileKey) {
    const fileKey = parseFileKeyInput(options.singleFileKey);
    if (!fileKey) {
      throw new Error(
        '--single-file value could not be parsed as a file key or Figma URL.',
      );
    }
    try {
      await validateFileKey(api, fileKey);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Cannot read local variables for --single-file key: ${message}`,
      );
    }
    await runSingleFileSync(fileKey, api, options);
    return;
  }

  // ── Per-role mode ──────────────────────────────────────────────────────────
  const roles: Role[] = options.roleFilter
    ? [options.roleFilter]
    : ['primitive', 'semantic', 'component'];

  const rl = options.nonInteractive
    ? null
    : readline.createInterface({ input, output });

  const resolvedKeys: Partial<Record<Role, string>> = {};
  const enteredRoleKeys: Array<{
    role: Role;
    envVar: string;
    fileKey: string;
  }> = [];
  // localVariablesByRole holds the snapshot fetched during key validation;
  // used only for verifyReferences pre-check. The sync loop re-fetches fresh.
  const localVariablesByRole: Partial<
    Record<Role, ApiGetLocalVariablesResponse>
  > = {};

  try {
    for (const role of roles) {
      const resolved = await resolveRoleFileKey(
        role,
        api,
        rl,
        options.nonInteractive,
      );
      if (!resolved) {
        continue;
      }

      resolvedKeys[role] = resolved.fileKey;
      if (resolved.fromPrompt) {
        enteredRoleKeys.push({
          role,
          envVar: roleToEnv[role],
          fileKey: resolved.fileKey,
        });
      }

      localVariablesByRole[role] = await api.getLocalVariables(
        resolved.fileKey,
      );
    }
  } finally {
    rl?.close();
  }

  if (resolvedKeys.semantic && resolvedKeys.component) {
    try {
      verifyReferences([
        localVariablesByRole.component!,
        localVariablesByRole.semantic!,
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(`Skipping strict reference validation: ${message}`);
    }
  } else {
    console.log(
      'Skipping cross-file reference validation. Resolve both semantic and component file keys to enable verifyReferences.',
    );
  }

  if (enteredRoleKeys.length > 0) {
    console.log(
      '\nTo persist discovered keys for future runs, update your shell profile or local secret script:',
    );
    enteredRoleKeys.forEach(({ envVar, fileKey, role }) => {
      console.log(`  export ${envVar}=${fileKey}  # ${role}`);
    });
  }

  const publishedKeysByRole: Partial<Record<Role, Set<string>>> = {};
  const publishedNameByKeyByRole: Partial<
    Record<Role, Record<string, string>>
  > = {};
  if (options.checkAliasSources) {
    const rolesToFetch: Role[] = [];
    if (resolvedKeys.primitive) rolesToFetch.push('primitive');
    if (resolvedKeys.semantic) rolesToFetch.push('semantic');

    for (const role of rolesToFetch) {
      try {
        const published = await api.getPublishedVariables(resolvedKeys[role]!);
        const keys = new Set<string>();
        const namesByKey: Record<string, string> = {};
        Object.values(published.meta.variables || {}).forEach(variable => {
          if (!variable.key) {
            return;
          }
          keys.add(variable.key);
          namesByKey[variable.key] = variable.name;
        });
        publishedKeysByRole[role] = keys;
        publishedNameByKeyByRole[role] = namesByKey;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.log(
          `⚠️  Could not load published variables for ${role}: ${message}`,
        );
      }
    }
  }

  const failedRoles: Role[] = [];
  let processedRoles = 0;
  let attemptedRoles = 0;

  // Each successfully resolved role's variables are accumulated here so that
  // subsequent roles can resolve cross-file aliases (e.g. semantic → primitive).
  // Roles must be processed in dependency order: primitive → semantic → component.
  const crossFileVars: ApiGetLocalVariablesResponse[] = [];

  for (const role of roles) {
    const fileKey = resolvedKeys[role];
    if (!fileKey) {
      continue;
    }

    let roleLocalVariables: ApiGetLocalVariablesResponse | null = null;
    let rolePayload: ReturnType<typeof generatePostVariablesPayload> | null =
      null;

    try {
      const tokenFiles = getTokenFilesForRole(role);
      if (tokenFiles.length === 0) {
        console.log(
          `No token files found for ${role} at ${TOKENS_DIR}/${role}. Skipping.`,
        );
        continue;
      }

      const tokensByFile = readJsonFiles(tokenFiles);
      attemptedRoles += 1;

      // Always re-fetch fresh local variables for this role so we pick up any
      // changes made by an earlier role apply in the same run.
      const localVariables = await api.getLocalVariables(fileKey);
      roleLocalVariables = localVariables;
      const postVariablesPayload = generatePostVariablesPayload(
        tokensByFile,
        localVariables,
        // In fresh-files mode don't pass real cross-file IDs — force name-based aliases
        options.freshFiles ? [] : crossFileVars,
        options.freshFiles,
      );
      rolePayload = postVariablesPayload;

      // Always run alias-source drift check against the full current Figma state
      // before any payload-emptiness check. This ensures results are deterministic
      // regardless of whether the payload diff is empty or not.
      if (
        options.checkAliasSources &&
        role !== 'primitive' &&
        roleLocalVariables
      ) {
        const allowedAliasKeys = new Set<string>();
        const aliasNameByKey: Record<string, string> = {};
        const expectedSources: string[] = [];

        // semantic aliases should come from primitive published library
        if (role === 'semantic' && publishedKeysByRole.primitive) {
          publishedKeysByRole.primitive.forEach(key =>
            allowedAliasKeys.add(key),
          );
          Object.assign(aliasNameByKey, publishedNameByKeyByRole.primitive);
          expectedSources.push('primitive');
        }

        // component aliases should come from semantic (and optionally primitive)
        if (role === 'component') {
          if (publishedKeysByRole.semantic) {
            publishedKeysByRole.semantic.forEach(key =>
              allowedAliasKeys.add(key),
            );
            Object.assign(aliasNameByKey, publishedNameByKeyByRole.semantic);
            expectedSources.push('semantic');
          }
          if (publishedKeysByRole.primitive) {
            publishedKeysByRole.primitive.forEach(key =>
              allowedAliasKeys.add(key),
            );
            Object.assign(aliasNameByKey, publishedNameByKeyByRole.primitive);
            expectedSources.push('primitive');
          }
        }

        if (allowedAliasKeys.size > 0) {
          const drift = collectAliasSourceDrift(
            roleLocalVariables,
            allowedAliasKeys,
            aliasNameByKey,
          );
          printAliasDriftReport(
            role,
            drift,
            expectedSources.join(', '),
            !!options.traceAliasChains,
          );
          if (options.strictAliasSources && drift.length > 0) {
            throw new Error(
              `Alias source drift detected for ${role}. Rebind aliases to expected libraries (${expectedSources.join(
                ', ',
              )}) or run without --strict-alias-sources.`,
            );
          }
        }
      }

      if (isPayloadEmpty(postVariablesPayload)) {
        console.log(
          green(
            `✅ "${role}" tokens are already up to date with the Figma file`,
          ),
        );
        // Still accumulate vars so downstream roles have the alias context.
        crossFileVars.push(localVariables);
        processedRoles += 1;
        continue;
      }

      const counts = payloadCounts(postVariablesPayload);
      console.log(`\nRole: ${role} (${fileKey})`);
      console.log('Planned changes:');
      console.log(`  variableCollections: ${counts.variableCollections}`);
      console.log(`  variableModes: ${counts.variableModes}`);
      console.log(`  variables: ${counts.variables}`);
      console.log(`  variableModeValues: ${counts.variableModeValues}`);
      const unresolvedAliasCount = reportUnresolvedAliases(
        postVariablesPayload,
        role,
      );
      if (unresolvedAliasCount > 0 && roleLocalVariables) {
        printRebindPunchlist(
          postVariablesPayload,
          roleLocalVariables,
          role,
          null,
        );
      }

      if (!options.apply) {
        console.log(
          'Dry-run mode: no POST request was sent. Re-run with --apply to push changes.',
        );
        // Use current state for downstream dry-run estimates.
        crossFileVars.push(localVariables);
        processedRoles += 1;
        continue;
      }

      const apiResp = await api.postVariables(fileKey, postVariablesPayload);
      console.log(`"${role}" POST variables API response:`, apiResp);
      console.log(green(`✅ Figma file has been updated with ${role} tokens`));

      // Refetch after apply so subsequent roles get real IDs (not temp IDs)
      // for alias resolution.
      const updatedVars = await api.getLocalVariables(fileKey);
      crossFileVars.push(updatedVars);
      processedRoles += 1;
    } catch (error) {
      failedRoles.push(role);
      const message = formatError(error);
      console.log(`❌ Failed to process ${role}: ${message}`);

      const failedAlias = extractInvalidAliasFromMessage(message);
      if (failedAlias && rolePayload && roleLocalVariables) {
        printRebindPunchlist(
          rolePayload,
          roleLocalVariables,
          role,
          failedAlias,
        );
      }

      // Detect cross-file alias failures and guide the user towards --fresh-files
      if (!options.freshFiles && message.includes('Invalid alias')) {
        console.log(
          '\n💡 Cross-file alias error detected. This usually means the Figma file' +
            ' does not have library subscriptions set up.\n' +
            '   Try one of:\n' +
            '   --fresh-files        : use name-based aliases across all role files\n' +
            '   --single-file=<key>  : merge all roles into one file (simplest for test envs)',
        );
      }

      // On failure, still attempt to fetch current vars so later roles are not
      // starved of potentially-useful alias context from a partial state.
      try {
        const fallbackVars = await api.getLocalVariables(resolvedKeys[role]!);
        crossFileVars.push(fallbackVars);
      } catch {
        // best-effort; ignore secondary fetch failure
      }
    }
  }

  if (attemptedRoles === 0) {
    throw new Error(
      'No roles were processed. Provide valid FILE_KEY_* values or run interactively to enter file keys.',
    );
  }

  if (failedRoles.length > 0) {
    process.exitCode = 1;
    console.log(
      `Completed with failures in role(s): ${failedRoles.join(', ')}`,
    );
  }
}

// ---------------------------------------------------------------------------
// Single-file mode
//
// All collections from every role (primitive, semantic, component) are merged
// into one combined payload and pushed to a single Figma file.
//
// Why this works for fresh files:
//   Within a single payload Figma resolves aliases through temp IDs — the
//   name-based fallback in variableValueFromToken produces an alias id equal
//   to the variable's temp id, so cross-collection references resolve at POST
//   time without requiring published-library subscriptions.
//
// When to use:
//   --single-file=<key> is designed for disposable test environments.  Use
//   the normal per-role mode when targeting production files that already have
//   library subscriptions configured between them in Figma.
// ---------------------------------------------------------------------------

async function runSingleFileSync(
  fileKey: string,
  api: FigmaApi,
  options: SyncOptions,
) {
  console.log(`\nSingle-file mode: all collections → ${fileKey}`);

  const allRoles: Role[] = ['primitive', 'semantic', 'component'];
  const allTokenFiles: string[] = [];

  for (const role of allRoles) {
    const files = getTokenFilesForRole(role);
    if (files.length === 0) {
      console.log(
        `  No token files found for ${role} at ${TOKENS_DIR}/${role} — skipping role.`,
      );
    } else {
      console.log(`  ${role}: ${files.length} file(s)`);
      allTokenFiles.push(...files);
    }
  }

  if (allTokenFiles.length === 0) {
    throw new Error('No token files found in any role directory.');
  }

  const tokensByFile = readJsonFiles(allTokenFiles);
  const localVariables = await api.getLocalVariables(fileKey);
  const postVariablesPayload = generatePostVariablesPayload(
    tokensByFile,
    localVariables,
    // No cross-file context needed: everything is in one file and aliases
    // resolve via temp IDs within the payload.
  );

  if (isPayloadEmpty(postVariablesPayload)) {
    console.log(
      green(
        `\n✅ Figma file is already up to date with all token collections.`,
      ),
    );
    return;
  }

  const counts = payloadCounts(postVariablesPayload);
  console.log('\nCombined planned changes:');
  console.log(`  variableCollections: ${counts.variableCollections}`);
  console.log(`  variableModes: ${counts.variableModes}`);
  console.log(`  variables: ${counts.variables}`);
  console.log(`  variableModeValues: ${counts.variableModeValues}`);
  reportUnresolvedAliases(postVariablesPayload, 'combined');

  if (!options.apply) {
    console.log(
      '\nDry-run mode: no POST request was sent. Re-run with --apply to push changes.',
    );
    return;
  }

  const apiResp = await api.postVariables(fileKey, postVariablesPayload);
  console.log('\nPOST variables API response:', apiResp);
  console.log(
    green(`\n✅ Figma file has been populated with all token collections.`),
  );
}

main();
