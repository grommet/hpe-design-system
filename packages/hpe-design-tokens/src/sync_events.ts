import {
  ApiGetLocalVariablesResponse,
  ApiPostVariablesPayload,
} from './figma_api.js';
import { SyncEnvironment } from './figma_sync_config.js';

export const SCHEMA_VERSION = '1.0.0';
export const FILE_TIERS = ['primitive', 'semantic', 'component'] as const;

export type FileTier = (typeof FILE_TIERS)[number];
export type StageStatus =
  | 'planned'
  | 'running'
  | 'succeeded'
  | 'failed'
  | 'skipped';

type MutationCounts = {
  create: number;
  update: number;
  delete: number;
};

export type StageCounts = {
  variableCollections: MutationCounts;
  variables: MutationCounts;
  variableModeValues: {
    update: number;
  };
};

export type StageResult = {
  stage: FileTier;
  status: StageStatus;
  counts: StageCounts;
};

export type SyncError = {
  code: string;
  message: string;
  stage?: string;
  tokenPath?: string;
  sourceFile?: string;
  environment?: string;
  remediation?: string;
};

function defaultRemediationForCode(code: string) {
  if (code.startsWith('ALIAS_')) {
    return 'Resolve alias mapping issues for the target environment and rerun the failed stage.';
  }

  if (code === 'CONFIG_RESOLUTION_FAILED') {
    return 'Fix required sync configuration and rerun the command.';
  }

  if (code === 'PREFLIGHT_FAILED') {
    return 'Fix preflight validation errors and rerun the command.';
  }

  if (code === 'STAGE_FAILED') {
    return 'Inspect stage logs, correct the failing token or API input, and retry.';
  }

  return 'Inspect sync logs and retry after correcting the reported issue.';
}

export function withRequiredErrorFields(
  errors: SyncError[],
  environment: SyncEnvironment,
) {
  return errors.map(error => ({
    ...error,
    environment: error.environment ?? environment,
    remediation: error.remediation ?? defaultRemediationForCode(error.code),
  }));
}

export type StageEvent = {
  schemaVersion: string;
  eventType: 'stage-status';
  runId: string;
  environment: SyncEnvironment;
  stage: FileTier;
  status: StageStatus;
  dryRun: boolean;
  mutationsApplied: boolean;
  counts: StageCounts;
  unresolvedAliasCount: number;
  startedAt: string;
  finishedAt: string;
};

export function makeRunId() {
  return `${new Date().toISOString()}#${Math.random().toString(36).slice(2, 8)}`;
}

export function emptyCounts(): StageCounts {
  return {
    variableCollections: { create: 0, update: 0, delete: 0 },
    variables: { create: 0, update: 0, delete: 0 },
    variableModeValues: { update: 0 },
  };
}

function countActions<T extends { action: 'CREATE' | 'UPDATE' | 'DELETE' }>(
  changes: T[] = [],
): MutationCounts {
  const counts = { create: 0, update: 0, delete: 0 };

  changes.forEach(change => {
    if (change.action === 'CREATE') counts.create += 1;
    if (change.action === 'UPDATE') counts.update += 1;
    if (change.action === 'DELETE') counts.delete += 1;
  });

  return counts;
}

export function countsFromPostPayload(
  payload: ApiPostVariablesPayload,
): StageCounts {
  return {
    variableCollections: countActions(payload.variableCollections),
    variables: countActions(payload.variables),
    variableModeValues: {
      update: payload.variableModeValues?.length || 0,
    },
  };
}

export function hasMutations(counts: StageCounts) {
  return (
    counts.variableCollections.create +
      counts.variableCollections.update +
      counts.variableCollections.delete +
      counts.variables.create +
      counts.variables.update +
      counts.variables.delete +
      counts.variableModeValues.update >
    0
  );
}

export function emitStageEvent(event: StageEvent) {
  console.log(JSON.stringify(event));
}

export function emitRunSummary({
  runId,
  environment,
  dryRun,
  productionGuardrailPassed,
  mutationsApplied,
  unresolvedAliasCount,
  stages,
  errors,
  startedAt,
  finishedAt,
}: {
  runId: string;
  environment: SyncEnvironment;
  dryRun: boolean;
  productionGuardrailPassed: boolean;
  mutationsApplied: boolean;
  unresolvedAliasCount: number;
  stages: StageResult[];
  errors: SyncError[];
  startedAt: string;
  finishedAt: string;
}) {
  console.log(
    JSON.stringify({
      schemaVersion: SCHEMA_VERSION,
      eventType: 'run-summary',
      runId,
      environment,
      dryRun,
      productionGuardrailPassed,
      mutationsApplied,
      unresolvedAliasCount,
      stages,
      errors,
      startedAt,
      finishedAt,
    }),
  );
}

export function buildAliasLookup(
  localVariables: ApiGetLocalVariablesResponse,
  {
    stage,
    environment,
  }: {
    stage: FileTier;
    environment: SyncEnvironment;
  },
) {
  const aliasLookup: Record<string, string> = {};
  const errors: SyncError[] = [];

  Object.values(localVariables.meta.variables).forEach(variable => {
    const resolvedId = variable.subscribed_id ?? variable.id;
    const existingId = aliasLookup[variable.name];
    if (existingId && existingId !== resolvedId) {
      errors.push({
        code: 'ALIAS_COLLISION',
        message: `Alias cache collision for variable name "${variable.name}"`,
        stage,
        tokenPath: variable.name,
        sourceFile: `${stage} variables`,
        environment,
        remediation:
          'Ensure alias target names are unique within the environment context for this stage.',
      });
      return;
    }

    aliasLookup[variable.name] = resolvedId;
  });

  return { aliasLookup, errors };
}
