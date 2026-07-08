import 'dotenv/config';
import * as fs from 'fs';
import path from 'path';

import FigmaApi from '../figma_api.js';
import {
  ensureProductionMutationGuardrails,
  getCliArgValue,
  ProductionGuardrailError,
  resolveFigmaSyncConfig,
  SyncEnvironment,
} from '../figma_sync_config.js';
import {
  emitRunSummary,
  emitStageEvent,
  emptyCounts,
  FILE_TIERS,
  makeRunId,
  SCHEMA_VERSION,
  StageResult,
  withRequiredErrorFields,
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

function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  if (obj !== null && typeof obj === 'object') {
    const source = obj as Record<string, unknown>;
    const sortedObj: Record<string, unknown> = {};
    Object.keys(source)
      .sort()
      .forEach(key => {
        sortedObj[key] = sortObjectKeys(source[key]);
      });
    return sortedObj;
  }

  return obj;
}

function getSummaryEnvironment(argv: string[]): SyncEnvironment {
  return getCliArgValue(argv, '--env') === 'test' ? 'test' : 'production';
}

async function main() {
  const argv = process.argv.slice(2);
  const runId = makeRunId();
  const runStartedAt = new Date().toISOString();
  const stageResults: StageResult[] = [];
  const runErrors: { code: string; message: string; stage?: string }[] = [];
  const summaryEnvironment = getSummaryEnvironment(argv);
  const dryRun = argv.includes('--dry-run');
  let config;
  const fallbackStageResults = FILE_TIERS.map(stage => ({
    stage,
    status: 'skipped' as const,
    counts: emptyCounts(),
  }));

  try {
    config = resolveFigmaSyncConfig();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    runErrors.push({ code: 'CONFIG_RESOLUTION_FAILED', message });

    emitRunSummary({
      runId,
      environment: summaryEnvironment,
      dryRun,
      productionGuardrailPassed: false,
      mutationsApplied: false,
      unresolvedAliasCount: 0,
      stages: stageResults.length ? stageResults : fallbackStageResults,
      errors: withRequiredErrorFields(runErrors, summaryEnvironment),
      startedAt: runStartedAt,
      finishedAt: new Date().toISOString(),
    });

    throw error;
  }

  const { fileKeys } = config;
  let productionGuardrailPassed = true;

  const TOKENS_DIR = 'tokens';
  const availableTokenDirs = new Set(
    fs
      .readdirSync(TOKENS_DIR, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name),
  );

  const outputDir = getCliArgValue(argv, '--output') || 'tokens_new';

  console.log(`Running sync-figma-to-tokens for env: ${config.env}`);

  const api = new FigmaApi(config.personalAccessToken);
  try {
    const guardrailResult = ensureProductionMutationGuardrails(config, {
      argv,
      env: process.env,
      isMutating: false,
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

    if (referenceReport.status === 'failed') {
      throw new Error(
        referenceReport.errorMessage ||
          'Invalid references were found. Resolve reference errors in Figma.',
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    runErrors.push({
      code:
        error instanceof ProductionGuardrailError
          ? 'PRODUCTION_GUARDRAIL_BLOCKED'
          : 'PREFLIGHT_FAILED',
      message,
    });

    emitRunSummary({
      runId,
      environment: config.env,
      dryRun: config.dryRun,
      productionGuardrailPassed:
        error instanceof ProductionGuardrailError
          ? false
          : productionGuardrailPassed,
      mutationsApplied: false,
      unresolvedAliasCount: 0,
      stages: stageResults.length ? stageResults : fallbackStageResults,
      errors: withRequiredErrorFields(runErrors, config.env),
      startedAt: runStartedAt,
      finishedAt: new Date().toISOString(),
    });

    throw error;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  await FILE_TIERS.reduce<Promise<void>>(async (chainPromise, stage) => {
    await chainPromise;

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
      return;
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
      FILE_TIERS.slice(FILE_TIERS.indexOf(stage) + 1).forEach(
        remainingStage => {
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
          stageResults.push({
            stage: remainingStage,
            status: 'skipped',
            counts,
          });
        },
      );

      emitRunSummary({
        runId,
        environment: config.env,
        dryRun: config.dryRun,
        productionGuardrailPassed,
        mutationsApplied: false,
        unresolvedAliasCount: 0,
        stages: stageResults,
        errors: withRequiredErrorFields(runErrors, config.env),
        startedAt: runStartedAt,
        finishedAt: new Date().toISOString(),
      });

      throw error;
    }
  }, Promise.resolve());

  emitRunSummary({
    runId,
    environment: config.env,
    dryRun: config.dryRun,
    productionGuardrailPassed,
    mutationsApplied: false,
    unresolvedAliasCount: 0,
    stages: stageResults,
    errors: withRequiredErrorFields(runErrors, config.env),
    startedAt: runStartedAt,
    finishedAt: new Date().toISOString(),
  });

  console.log(
    green(`✅ Tokens files have been written to the ${outputDir} directory`),
  );
}

main();
