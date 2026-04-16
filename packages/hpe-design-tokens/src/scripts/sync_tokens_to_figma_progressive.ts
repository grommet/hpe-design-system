import 'dotenv/config';
import * as fs from 'fs';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import FigmaApi, { ApiGetLocalVariablesResponse } from '../figma_api.js';
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
    }
  });

  return { apply, nonInteractive, roleFilter, singleFileKey };
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

  const failedRoles: Role[] = [];
  let processedRoles = 0;

  // Each successfully resolved role's variables are accumulated here so that
  // subsequent roles can resolve cross-file aliases (e.g. semantic → primitive).
  // Roles must be processed in dependency order: primitive → semantic → component.
  const crossFileVars: ApiGetLocalVariablesResponse[] = [];

  for (const role of roles) {
    const fileKey = resolvedKeys[role];
    if (!fileKey) {
      continue;
    }

    try {
      const tokenFiles = getTokenFilesForRole(role);
      if (tokenFiles.length === 0) {
        console.log(
          `No token files found for ${role} at ${TOKENS_DIR}/${role}. Skipping.`,
        );
        continue;
      }

      const tokensByFile = readJsonFiles(tokenFiles);

      // Always re-fetch fresh local variables for this role so we pick up any
      // changes made by an earlier role apply in the same run.
      const localVariables = await api.getLocalVariables(fileKey);
      const postVariablesPayload = generatePostVariablesPayload(
        tokensByFile,
        localVariables,
        crossFileVars,
      );

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
      reportUnresolvedAliases(postVariablesPayload, role);

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

  if (processedRoles === 0) {
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
