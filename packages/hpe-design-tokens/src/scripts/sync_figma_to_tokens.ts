import 'dotenv/config';
import * as fs from 'fs';
import path from 'path';

import FigmaApi from '../figma_api.js';
import {
  ensureProductionMutationGuardrails,
  getCliArgValue,
  resolveFigmaSyncConfig,
} from '../figma_sync_config.js';
import {
  emitRunSummary,
  emitStageEvent,
  emptyCounts,
  FILE_TIERS,
  makeRunId,
  SCHEMA_VERSION,
  StageResult,
} from '../sync_events.js';

import { green, verifyReferences } from '../utils.js';
import { tokenFilesFromLocalVariables } from '../token_export.js';

/**
 * Usage:
 * This script pulls design tokens from Figma and writes
 * them to JSON files.
 *
 * // Defaults to writing to the tokens_new directory
 * npm run sync-figma-to-tokens
 *
 * // Writes to the specified directory
 * npm run sync-figma-to-tokens -- --output directory_name
 */

/**
 * Recursively sorts object keys alphabetically
 */

function sortObjectKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  } else if (obj !== null && typeof obj === 'object') {
    const sortedObj: any = {};
    Object.keys(obj)
      .sort()
      .forEach(key => {
        sortedObj[key] = sortObjectKeys(obj[key]);
      });
    return sortedObj;
  }
  return obj;
}

async function main() {
  const config = resolveFigmaSyncConfig();
  const fileKeys = config.fileKeys;
  const runId = makeRunId();
  const runStartedAt = new Date().toISOString();
  const stageResults: StageResult[] = [];
  const runErrors: { code: string; message: string; stage?: string }[] = [];
  let productionGuardrailPassed = true;

  const TOKENS_DIR = 'tokens';
  const availableTokenDirs = new Set(
    fs
      .readdirSync(TOKENS_DIR, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name),
  );

  const outputDir =
    getCliArgValue(process.argv.slice(2), '--output') || 'tokens_new';

  console.log(`Running sync-figma-to-tokens for env: ${config.env}`);

  const api = new FigmaApi(config.personalAccessToken);
  try {
    const guardrailResult = ensureProductionMutationGuardrails(config, {
      argv: process.argv.slice(2),
      env: process.env,
      isMutating: false,
    });
    productionGuardrailPassed = guardrailResult.passed;

    const componentTokens = await api.getLocalVariables(fileKeys.component);
    const semanticTokens = await api.getLocalVariables(fileKeys.semantic);
    const referenceReport = verifyReferences(
      [componentTokens, semanticTokens],
      config.expectedCollectionKeys,
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
    runErrors.push({ code: 'PREFLIGHT_FAILED', message });

    emitRunSummary({
      runId,
      environment: config.env,
      dryRun: config.dryRun,
      productionGuardrailPassed: false,
      mutationsApplied: false,
      unresolvedAliasCount: 0,
      stages: stageResults,
      errors: runErrors,
      startedAt: runStartedAt,
      finishedAt: new Date().toISOString(),
    });

    throw error;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
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
      const localVariables = await api.getLocalVariables(fileKeys[stage]);
      const tokensFiles = tokenFilesFromLocalVariables(localVariables);
      const stageOutputDir = path.join(outputDir, stage);

      if (!fs.existsSync(stageOutputDir)) {
        fs.mkdirSync(stageOutputDir);
      }

      Object.entries(tokensFiles).forEach(([fileName, fileContent]) => {
        const sortedContent = sortObjectKeys(fileContent);
        fs.writeFileSync(
          `${stageOutputDir}/${fileName}`,
          `${JSON.stringify(sortedContent, null, 2)}\n`,
        );
        console.log(`Wrote ${fileName}`);
      });

      const counts = emptyCounts();
      counts.variables.update = Object.keys(tokensFiles).length;

      const stageFinishedAt = new Date().toISOString();
      emitStageEvent({
        schemaVersion: SCHEMA_VERSION,
        eventType: 'stage-status',
        runId,
        environment: config.env,
        stage,
        status: 'succeeded',
        dryRun: config.dryRun,
        mutationsApplied: false,
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
        productionGuardrailPassed,
        mutationsApplied: false,
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
    productionGuardrailPassed,
    mutationsApplied: false,
    unresolvedAliasCount: 0,
    stages: stageResults,
    errors: runErrors,
    startedAt: runStartedAt,
    finishedAt: new Date().toISOString(),
  });

  console.log(
    green(`✅ Tokens files have been written to the ${outputDir} directory`),
  );
}

main();
