import { ApiPostVariablesPayload } from './figma_api.js';
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
  errors: any[];
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
