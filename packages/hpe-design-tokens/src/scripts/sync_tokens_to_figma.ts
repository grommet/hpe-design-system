import 'dotenv/config';
import * as fs from 'fs';
import path from 'path';

import FigmaApi from '../figma_api.js';
import {
  ensureProductionMutationGuardrails,
  resolveFigmaSyncConfig,
} from '../figma_sync_config.js';
import {
  buildAliasLookup,
  countsFromPostPayload,
  emitRunSummary,
  emitStageEvent,
  emptyCounts,
  FILE_TIERS,
  FileTier,
  hasMutations,
  makeRunId,
  SCHEMA_VERSION,
  StageResult,
  SyncError,
  withRequiredErrorFields,
} from '../sync_events.js';

import { green, verifyReferences } from '../utils.js';
import {
  AliasResolutionError,
  generatePostVariablesPayload,
  normalizeAliasReference,
  readJsonFiles,
} from '../token_import.js';

// This script pushes design tokens from JSON files to Figma design files

async function main() {
  const config = resolveFigmaSyncConfig();
  const fileKeys = config.fileKeys;
  const runId = makeRunId();
  const runStartedAt = new Date().toISOString();
  const stageResults: StageResult[] = [];
  const runErrors: SyncError[] = [];
  let runMutationsApplied = false;
  const hasDependencyStage: Set<FileTier> = new Set(['semantic', 'component']);
  const dependencyFileKeyByStage: Partial<Record<FileTier, string>> = {
    semantic: config.fileKeys.primitive,
    component: config.fileKeys.semantic,
  };

  console.log(`Running sync-tokens-to-figma for env: ${config.env}`);

  const TOKENS_DIR = 'tokens';
  const availableTokenDirs = new Set(
    fs
      .readdirSync(TOKENS_DIR, { withFileTypes: true })
      .filter(dir => dir.isDirectory() && dir.name !== '.tmp')
      .map(dir => dir.name),
  );

  const api = new FigmaApi(config.personalAccessToken);
  let productionGuardrailPassed = true;

  try {
    const guardrailResult = ensureProductionMutationGuardrails(config, {
      argv: process.argv.slice(2),
      env: process.env,
      isMutating: !config.dryRun,
    });
    productionGuardrailPassed = guardrailResult.passed;

    const componentTokens = await api.getLocalVariables(fileKeys.component);
    const semanticTokens = await api.getLocalVariables(fileKeys.semantic);
    const referenceReport = verifyReferences(
      [componentTokens, semanticTokens],
      config.expectedCollectionKeys,
      { bootstrap: config.bootstrap },
    );

    console.log(
      JSON.stringify({
        schemaVersion: SCHEMA_VERSION,
        eventType: 'preflight-validation',
        runId,
        environment: config.env,
        dryRun: config.dryRun,
        productionGuardrailPassed,
        referenceValidation: referenceReport,
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    runErrors.push({
      code: 'PREFLIGHT_FAILED',
      message,
      environment: config.env,
      remediation:
        'Review production guardrail and reference validation requirements, then retry.',
    });

    emitRunSummary({
      runId,
      environment: config.env,
      dryRun: config.dryRun,
      productionGuardrailPassed: false,
      mutationsApplied: false,
      unresolvedAliasCount: 0,
      stages: stageResults,
      errors: withRequiredErrorFields(runErrors, config.env),
      startedAt: runStartedAt,
      finishedAt: new Date().toISOString(),
    });

    throw error;
  }

  for (const stage of FILE_TIERS) {
    const plannedAt = new Date().toISOString();
    emitStageEvent({
      schemaVersion: SCHEMA_VERSION,
      eventType: 'stage-status',
      runId,
      environment: config.env,
      stage,
      status: 'planned',
      dryRun: config.dryRun,
      mutationsApplied: false,
      counts: emptyCounts(),
      unresolvedAliasCount: 0,
      startedAt: plannedAt,
      finishedAt: plannedAt,
    });

    if (!availableTokenDirs.has(stage)) {
      const skippedAt = new Date().toISOString();
      const counts = emptyCounts();
      emitStageEvent({
        schemaVersion: SCHEMA_VERSION,
        eventType: 'stage-status',
        runId,
        environment: config.env,
        stage,
        status: 'skipped',
        dryRun: config.dryRun,
        mutationsApplied: false,
        counts,
        unresolvedAliasCount: 0,
        startedAt: skippedAt,
        finishedAt: skippedAt,
      });
      stageResults.push({ stage, status: 'skipped', counts });
      continue;
    }

    const stageStartedAt = new Date().toISOString();
    emitStageEvent({
      schemaVersion: SCHEMA_VERSION,
      eventType: 'stage-status',
      runId,
      environment: config.env,
      stage,
      status: 'running',
      dryRun: config.dryRun,
      mutationsApplied: false,
      counts: emptyCounts(),
      unresolvedAliasCount: 0,
      startedAt: stageStartedAt,
      finishedAt: stageStartedAt,
    });

    try {
      const tokensDir = path.join(TOKENS_DIR, stage);
      const tokensFiles = fs
        .readdirSync(tokensDir)
        .map((file: string) => path.join(tokensDir, file))
        .filter(file => file);

      const tokensByFile = readJsonFiles(tokensFiles);
      console.log(`Read ${stage} token files:`, Object.keys(tokensByFile));

      const localVariables = await api.getLocalVariables(fileKeys[stage]);

      // Build alias lookup in two passes:
      // Pass 1 — published vars from the dependency file. Covers ALL vars.
      //   subscribed_ids are remapped to this file's subscription hash, since
      //   each subscriber file receives a distinct hash per subscription
      //   relationship (hash extracted from the 1–3 canonical remote vars
      //   that ARE explicitly referenced in this file).
      // Pass 2 — canonical remote vars from THIS file. Confirmed-correct IDs
      //   for explicitly-referenced vars; overrides Pass 1 for those vars.
      const canonicalKeySet = new Set(
        Object.values(config.expectedCollectionKeys),
      );
      const depFileKey = dependencyFileKeyByStage[stage];
      const aliasLookup =
        hasDependencyStage.has(stage) && depFileKey
          ? await (async () => {
              // Pass 2 source: canonical remote vars (per-collection hash seed).
              const localRemoteVars = Object.fromEntries(
                Object.entries(localVariables.meta.variables).filter(
                  ([, v]) => {
                    if (!v.remote) return false;
                    const coll =
                      localVariables.meta.variableCollections[
                        v.variableCollectionId
                      ];
                    return !!coll?.key && canonicalKeySet.has(coll.key);
                  },
                ),
              );

              // Extract subscription hash for each canonical collection.
              // ID format: VariableID:{hash}/{nodeId}
              const collHashByKey: Record<string, string> = {};
              for (const v of Object.values(localRemoteVars)) {
                const coll =
                  localVariables.meta.variableCollections[
                    v.variableCollectionId
                  ];
                if (!coll?.key) continue;
                const [, hash] = v.id.match(/^VariableID:([^/]+)\//) ?? [];
                if (hash && !collHashByKey[coll.key]) {
                  collHashByKey[coll.key] = hash;
                }
              }

              // Pass 1: fetch and remap published vars from the dependency file.
              const publishedDep = await api.getPublishedVariables(depFileKey);
              const depCollKeyById: Record<string, string> = {};
              for (const [cid, c] of Object.entries(
                publishedDep.meta.variableCollections,
              )) {
                if (c.key) depCollKeyById[cid] = c.key;
              }
              const remappedVars = Object.fromEntries(
                Object.entries(publishedDep.meta.variables).map(([vid, v]) => {
                  const collKey = depCollKeyById[v.variableCollectionId];
                  const compHash = collKey ? collHashByKey[collKey] : undefined;
                  const subId = v.subscribed_id ?? v.id;
                  if (compHash && subId) {
                    const remapped = subId.replace(
                      /^VariableID:[^/]+\//,
                      `VariableID:${compHash}/`,
                    );
                    return [vid, { ...v, subscribed_id: remapped }];
                  }
                  return [vid, v];
                }),
              );
              const baseLookup = buildAliasLookup(
                {
                  ...publishedDep,
                  meta: { ...publishedDep.meta, variables: remappedVars },
                },
                { stage, environment: config.env },
              ).aliasLookup;

              const localOverride = buildAliasLookup(
                {
                  ...localVariables,
                  meta: {
                    ...localVariables.meta,
                    variables: localRemoteVars,
                  },
                },
                { stage, environment: config.env },
              ).aliasLookup;

              const merged = { ...baseLookup, ...localOverride };

              // Figma requires alias targets to be present in this file's
              // remote variable list (getLocalVariables). Filter to only
              // in-scope IDs to avoid 400 "does not exist" errors for
              // remote vars that haven't been imported yet. Once the
              // library is fully imported (e.g., via Figma's Swap Library
              // UI), this filter will pass all remapped IDs through.
              const inScopeIds = new Set(
                Object.values(localVariables.meta.variables)
                  .filter(v => v.remote)
                  .map(v => v.id),
              );
              return Object.fromEntries(
                Object.entries(merged).filter(([, id]) => inScopeIds.has(id)),
              );
            })()
          : undefined;

      const stageAliasErrors: AliasResolutionError[] = [];

      const postVariablesPayload = generatePostVariablesPayload(
        tokensByFile,
        localVariables,
        {
          aliasLookup,
          stage,
          environment: config.env,
          onAliasResolutionError: error => {
            stageAliasErrors.push(error);
          },
        },
      );

      if (stageAliasErrors.length) {
        stageAliasErrors.forEach(error => {
          runErrors.push({
            ...error,
            tokenPath: normalizeAliasReference(error.tokenPath),
          });
        });
        throw new Error(
          `Alias resolution failed for ${stage}: ${stageAliasErrors.length} unresolved aliases`,
        );
      }

      const counts = countsFromPostPayload(postVariablesPayload);
      const stageHasMutations = hasMutations(counts);

      if (!stageHasMutations) {
        console.log(
          green(
            `✅ "${stage}" tokens are already up to date with the Figma file`,
          ),
        );
      } else if (config.dryRun) {
        console.log(
          green(
            `✅ Dry run: "${stage}" has planned updates, no mutations applied`,
          ),
        );
      } else {
        const apiResp = await api.postVariables(
          fileKeys[stage],
          postVariablesPayload,
        );

        console.log(`"${stage}" POST variables API response:`, apiResp);
        runMutationsApplied = true;
      }

      const stageFinishedAt = new Date().toISOString();
      emitStageEvent({
        schemaVersion: SCHEMA_VERSION,
        eventType: 'stage-status',
        runId,
        environment: config.env,
        stage,
        status: 'succeeded',
        dryRun: config.dryRun,
        mutationsApplied: stageHasMutations && !config.dryRun,
        counts,
        unresolvedAliasCount: stageAliasErrors.length,
        startedAt: stageStartedAt,
        finishedAt: stageFinishedAt,
      });

      stageResults.push({ stage, status: 'succeeded', counts });
      console.log(green(`✅ Completed ${stage} stage`));
    } catch (error) {
      const stageFinishedAt = new Date().toISOString();
      const message = error instanceof Error ? error.message : String(error);
      const failedCounts = emptyCounts();
      const stageAliasErrorCount = runErrors.filter(
        err => err.stage === stage && err.code.startsWith('ALIAS_'),
      ).length;

      emitStageEvent({
        schemaVersion: SCHEMA_VERSION,
        eventType: 'stage-status',
        runId,
        environment: config.env,
        stage,
        status: 'failed',
        dryRun: config.dryRun,
        mutationsApplied: false,
        counts: failedCounts,
        unresolvedAliasCount: stageAliasErrorCount,
        startedAt: stageStartedAt,
        finishedAt: stageFinishedAt,
      });

      stageResults.push({ stage, status: 'failed', counts: failedCounts });
      if (!runErrors.some(errorItem => errorItem.stage === stage)) {
        runErrors.push({ code: 'STAGE_FAILED', message, stage });
      }

      const skippedAt = new Date().toISOString();
      for (const remainingStage of FILE_TIERS.slice(
        FILE_TIERS.indexOf(stage) + 1,
      )) {
        const counts = emptyCounts();
        emitStageEvent({
          schemaVersion: SCHEMA_VERSION,
          eventType: 'stage-status',
          runId,
          environment: config.env,
          stage: remainingStage,
          status: 'skipped',
          dryRun: config.dryRun,
          mutationsApplied: false,
          counts,
          unresolvedAliasCount: stageAliasErrorCount,
          startedAt: skippedAt,
          finishedAt: skippedAt,
        });
        stageResults.push({ stage: remainingStage, status: 'skipped', counts });
      }

      emitRunSummary({
        runId,
        environment: config.env,
        dryRun: config.dryRun,
        productionGuardrailPassed,
        mutationsApplied: runMutationsApplied,
        unresolvedAliasCount: runErrors.filter(errorItem =>
          errorItem.code.startsWith('ALIAS_'),
        ).length,
        stages: stageResults,
        errors: withRequiredErrorFields(runErrors, config.env),
        startedAt: runStartedAt,
        finishedAt: new Date().toISOString(),
      });

      throw error;
    }
  }

  emitRunSummary({
    runId,
    environment: config.env,
    dryRun: config.dryRun,
    productionGuardrailPassed,
    mutationsApplied: runMutationsApplied,
    unresolvedAliasCount: runErrors.filter(errorItem =>
      errorItem.code.startsWith('ALIAS_'),
    ).length,
    stages: stageResults,
    errors: withRequiredErrorFields(runErrors, config.env),
    startedAt: runStartedAt,
    finishedAt: new Date().toISOString(),
  });
}

main();
