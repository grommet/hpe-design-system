/**
 * @deprecated
 * This script was a standalone remediation tool for rebinding legacy
 * cross-file aliases to canonical collection targets. Its functionality
 * has been superseded by the `--bootstrap` flag and the two-pass
 * `buildCrossFileAliasLookup` approach built into sync_tokens_to_figma.ts.
 *
 * Kept for reference and diagnostics only. Do not use in the regular
 * sync workflow.
 */
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import FigmaApi, {
  ApiGetLocalVariablesResponse,
  VariableModeValue,
} from '../figma_api.js';
import {
  getCliArgValue,
  resolveFigmaSyncConfig,
} from '../figma_sync_config.js';
import { makeRunId, SCHEMA_VERSION } from '../sync_events.js';

type FileTier = 'semantic' | 'component';
type CollectionName = 'color' | 'dimension' | 'primitives' | 'global';
type RebindReason = 'missing-canonical-match' | 'ambiguous-canonical-match';

type ProposedRebind = {
  variableId: string;
  variableName: string;
  modeId: string;
  fromAliasId: string;
  fromAliasName: string;
  fromCollectionKey: string;
  toAliasId: string;
  toAliasName: string;
  toCollectionKey: string;
};

type UnresolvedAlias = {
  variableId: string;
  variableName: string;
  modeId: string;
  fromAliasId: string;
  fromAliasName: string;
  fromCollectionKey: string;
  targetCollectionName: CollectionName;
  reason: RebindReason;
  candidateIds: string[];
};

type TierResult = {
  tier: FileTier;
  fileKey: string;
  scannedVariableCount: number;
  scannedAliasModeValueCount: number;
  needingRebindCount: number;
  resolvableCount: number;
  appliedCount: number;
  unresolvedCount: number;
  rebindingPlan: ProposedRebind[];
  unresolved: UnresolvedAlias[];
};

type RemediationReport = {
  schemaVersion: string;
  eventType: 'alias-rebind-remediation';
  runId: string;
  environment: 'production' | 'test';
  dryRun: boolean;
  generatedAt: string;
  targetCollections: CollectionName[];
  tiers: TierResult[];
  summary: {
    scannedVariableCount: number;
    scannedAliasModeValueCount: number;
    needingRebindCount: number;
    resolvableCount: number;
    appliedCount: number;
    unresolvedCount: number;
  };
};

function normalizeVariableName(name: string) {
  return name.trim().toLowerCase();
}

function parseTargetCollections(argv: string[]) {
  const raw = getCliArgValue(argv, '--collections');
  if (!raw) {
    return ['color', 'primitives'] as CollectionName[];
  }

  const allowed = new Set<CollectionName>([
    'color',
    'dimension',
    'primitives',
    'global',
  ]);

  const parsed = raw
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);

  if (!parsed.length) {
    throw new Error(
      // eslint-disable-next-line max-len
      'Invalid --collections value. Provide a comma-separated list such as color,primitives.',
    );
  }

  const invalid = parsed.filter(value => !allowed.has(value as CollectionName));

  if (invalid.length) {
    throw new Error(
      // eslint-disable-next-line max-len
      `Invalid collection name(s) in --collections: ${invalid.join(', ')}. Allowed values: color, dimension, primitives, global.`,
    );
  }

  return Array.from(new Set(parsed)) as CollectionName[];
}

function isAliasValue(
  value: unknown,
): value is { type: 'VARIABLE_ALIAS'; id: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    (value as { type?: string }).type === 'VARIABLE_ALIAS' &&
    'id' in value &&
    typeof (value as { id?: unknown }).id === 'string'
  );
}

function buildCanonicalLookup(
  payload: ApiGetLocalVariablesResponse,
  targetCollections: Set<CollectionName>,
  expectedCollectionKeys: Record<CollectionName, string>,
) {
  const byCollectionName = new Map<CollectionName, Map<string, string[]>>();

  Object.values(payload.meta.variables).forEach(variable => {
    const collection =
      payload.meta.variableCollections[variable.variableCollectionId];
    if (!collection || !collection.remote) return;

    const collectionName = collection.name as CollectionName;
    if (!targetCollections.has(collectionName)) return;

    if (collection.key !== expectedCollectionKeys[collectionName]) return;

    const perCollection =
      byCollectionName.get(collectionName) || new Map<string, string[]>();
    const normalized = normalizeVariableName(variable.name);
    const current = perCollection.get(normalized) || [];
    current.push(variable.id);
    perCollection.set(normalized, current);
    byCollectionName.set(collectionName, perCollection);
  });

  return byCollectionName;
}

function buildTierPlan(args: {
  payload: ApiGetLocalVariablesResponse;
  tier: FileTier;
  fileKey: string;
  targetCollections: Set<CollectionName>;
  expectedCollectionKeys: Record<CollectionName, string>;
}) {
  const { payload, tier, fileKey, targetCollections, expectedCollectionKeys } =
    args;
  const canonicalLookup = buildCanonicalLookup(
    payload,
    targetCollections,
    expectedCollectionKeys,
  );

  const plan: ProposedRebind[] = [];
  const unresolved: UnresolvedAlias[] = [];

  let scannedVariableCount = 0;
  let scannedAliasModeValueCount = 0;
  let needingRebindCount = 0;

  Object.values(payload.meta.variables).forEach(variable => {
    if (variable.remote) return;

    scannedVariableCount += 1;

    Object.entries(variable.valuesByMode).forEach(([modeId, modeValue]) => {
      if (!isAliasValue(modeValue)) return;
      scannedAliasModeValueCount += 1;

      const aliasTarget = payload.meta.variables[modeValue.id];
      if (!aliasTarget) return;

      const targetCollection =
        payload.meta.variableCollections[aliasTarget.variableCollectionId];
      if (!targetCollection || !targetCollection.remote) return;

      const targetCollectionName = targetCollection.name as CollectionName;
      if (!targetCollections.has(targetCollectionName)) return;

      const expectedKey = expectedCollectionKeys[targetCollectionName];
      if (targetCollection.key === expectedKey) return;

      needingRebindCount += 1;

      const perCollection = canonicalLookup.get(targetCollectionName);
      const normalizedName = normalizeVariableName(aliasTarget.name);
      const candidates = perCollection?.get(normalizedName) || [];

      if (candidates.length !== 1) {
        unresolved.push({
          variableId: variable.id,
          variableName: variable.name,
          modeId,
          fromAliasId: aliasTarget.id,
          fromAliasName: aliasTarget.name,
          fromCollectionKey: targetCollection.key || '',
          targetCollectionName,
          reason:
            candidates.length === 0
              ? 'missing-canonical-match'
              : 'ambiguous-canonical-match',
          candidateIds: candidates,
        });
        return;
      }

      const replacementId = candidates[0];
      if (replacementId === aliasTarget.id) return;

      const replacement = payload.meta.variables[replacementId];
      const replacementCollection =
        payload.meta.variableCollections[replacement.variableCollectionId];

      plan.push({
        variableId: variable.id,
        variableName: variable.name,
        modeId,
        fromAliasId: aliasTarget.id,
        fromAliasName: aliasTarget.name,
        fromCollectionKey: targetCollection.key || '',
        toAliasId: replacement.id,
        toAliasName: replacement.name,
        toCollectionKey: replacementCollection.key || '',
      });
    });
  });

  return {
    tier,
    fileKey,
    scannedVariableCount,
    scannedAliasModeValueCount,
    needingRebindCount,
    resolvableCount: plan.length,
    appliedCount: 0,
    unresolvedCount: unresolved.length,
    rebindingPlan: plan,
    unresolved,
  } as TierResult;
}

async function applyRebindPlan(
  api: FigmaApi,
  tierResult: TierResult,
  chunkSize = 200,
) {
  const updates: VariableModeValue[] = tierResult.rebindingPlan.map(item => ({
    variableId: item.variableId,
    modeId: item.modeId,
    value: {
      type: 'VARIABLE_ALIAS',
      id: item.toAliasId,
    },
  }));

  const chunks = Array.from(
    { length: Math.ceil(updates.length / chunkSize) },
    (_, index) => updates.slice(index * chunkSize, (index + 1) * chunkSize),
  );

  const applied = await chunks.reduce<Promise<number>>(
    async (appliedPromise, chunk) => {
      const appliedCount = await appliedPromise;
      await api.postVariables(tierResult.fileKey, {
        variableModeValues: chunk,
      });
      return appliedCount + chunk.length;
    },
    Promise.resolve(0),
  );

  return applied;
}

async function main() {
  const argv = process.argv.slice(2);
  const config = resolveFigmaSyncConfig({ argv });
  const apply = argv.includes('--apply');
  const pretty = argv.includes('--pretty');
  const outputPathArg = getCliArgValue(argv, '--output');
  const targetCollections = parseTargetCollections(argv);

  const api = new FigmaApi(config.personalAccessToken);
  const tiers: FileTier[] = ['semantic', 'component'];

  const results = await tiers.reduce<Promise<TierResult[]>>(
    async (resultsPromise, tier) => {
      const accResults = await resultsPromise;
      const fileKey = config.fileKeys[tier];
      const payload = await api.getLocalVariables(fileKey);
      const tierPlan = buildTierPlan({
        payload,
        tier,
        fileKey,
        targetCollections: new Set(targetCollections),
        expectedCollectionKeys: config.expectedCollectionKeys,
      });

      if (apply && tierPlan.rebindingPlan.length > 0) {
        tierPlan.appliedCount = await applyRebindPlan(api, tierPlan);
      }

      return [...accResults, tierPlan];
    },
    Promise.resolve([]),
  );

  const summary = results.reduce(
    (acc, tier) => {
      acc.scannedVariableCount += tier.scannedVariableCount;
      acc.scannedAliasModeValueCount += tier.scannedAliasModeValueCount;
      acc.needingRebindCount += tier.needingRebindCount;
      acc.resolvableCount += tier.resolvableCount;
      acc.appliedCount += tier.appliedCount;
      acc.unresolvedCount += tier.unresolvedCount;
      return acc;
    },
    {
      scannedVariableCount: 0,
      scannedAliasModeValueCount: 0,
      needingRebindCount: 0,
      resolvableCount: 0,
      appliedCount: 0,
      unresolvedCount: 0,
    },
  );

  const report: RemediationReport = {
    schemaVersion: SCHEMA_VERSION,
    eventType: 'alias-rebind-remediation',
    runId: makeRunId(),
    environment: config.env,
    dryRun: !apply,
    generatedAt: new Date().toISOString(),
    targetCollections,
    tiers: results,
    summary,
  };

  const json = JSON.stringify(report, null, pretty ? 2 : undefined);

  if (outputPathArg) {
    const outputPath = path.isAbsolute(outputPathArg)
      ? outputPathArg
      : path.resolve(process.cwd(), outputPathArg);
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, `${json}\n`, 'utf8');
  }

  console.log(json);
}

main();
