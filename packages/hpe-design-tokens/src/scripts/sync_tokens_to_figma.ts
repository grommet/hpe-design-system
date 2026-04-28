import 'dotenv/config';
import * as fs from 'fs';
import path from 'path';

import FigmaApi from '../figma_api.js';
import { resolveFigmaSyncConfig } from '../figma_sync_config.js';
import {
  countsFromPostPayload,
  emitRunSummary,
  emitStageEvent,
  emptyCounts,
  FILE_TIERS,
  hasMutations,
  makeRunId,
  SCHEMA_VERSION,
  StageResult,
} from '../sync_events.js';

import { green, verifyReferences } from '../utils.js';
import {
  generatePostVariablesPayload,
  readJsonFiles,
} from '../token_import.js';

// This script pushes design tokens from JSON files to Figma design files

async function main() {
  const config = resolveFigmaSyncConfig();
  const fileKeys = config.fileKeys;
  const runId = makeRunId();
  const runStartedAt = new Date().toISOString();
  const stageResults: StageResult[] = [];
  const runErrors: { code: string; message: string; stage?: string }[] = [];
  let runMutationsApplied = false;

  console.log(`Running sync-tokens-to-figma for env: ${config.env}`);

  const TOKENS_DIR = 'tokens';
  const availableTokenDirs = new Set(
    fs
      .readdirSync(TOKENS_DIR, { withFileTypes: true })
      .filter(dir => dir.isDirectory() && dir.name !== '.tmp')
      .map(dir => dir.name),
  );

  const api = new FigmaApi(config.personalAccessToken);
  const componentTokens = await api.getLocalVariables(fileKeys.component);
  const semanticTokens = await api.getLocalVariables(fileKeys.semantic);
  verifyReferences(
    [componentTokens, semanticTokens],
    config.expectedCollectionKeys,
  );

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
      const postVariablesPayload = generatePostVariablesPayload(
        tokensByFile,
        localVariables,
      );
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
        unresolvedAliasCount: 0,
        startedAt: stageStartedAt,
        finishedAt: stageFinishedAt,
      });

      stageResults.push({ stage, status: 'succeeded', counts });
      console.log(green(`✅ Completed ${stage} stage`));
    } catch (error) {
      const stageFinishedAt = new Date().toISOString();
      const message = error instanceof Error ? error.message : String(error);
      const failedCounts = emptyCounts();

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
        unresolvedAliasCount: 0,
        startedAt: stageStartedAt,
        finishedAt: stageFinishedAt,
      });

      stageResults.push({ stage, status: 'failed', counts: failedCounts });
      runErrors.push({ code: 'STAGE_FAILED', message, stage });

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
          unresolvedAliasCount: 0,
          startedAt: skippedAt,
          finishedAt: skippedAt,
        });
        stageResults.push({ stage: remainingStage, status: 'skipped', counts });
      }

      emitRunSummary({
        runId,
        environment: config.env,
        dryRun: config.dryRun,
        productionGuardrailPassed: true,
        mutationsApplied: runMutationsApplied,
        unresolvedAliasCount: 0,
        stages: stageResults,
        errors: runErrors,
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
    productionGuardrailPassed: true,
    mutationsApplied: runMutationsApplied,
    unresolvedAliasCount: 0,
    stages: stageResults,
    errors: runErrors,
    startedAt: runStartedAt,
    finishedAt: new Date().toISOString(),
  });
}

main();
