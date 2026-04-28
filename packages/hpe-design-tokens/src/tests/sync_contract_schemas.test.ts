import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import * as Ajv2020Module from 'ajv/dist/2020.js';
import * as addFormatsModule from 'ajv-formats';
import { describe, expect, it, vi } from 'vitest';

import {
  emitRunSummary,
  emitStageEvent,
  emptyCounts,
  withRequiredErrorFields,
} from '../sync_events.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

function loadSchema(schemaPath: string) {
  return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
}

function parseConsoleJson(callArg: unknown) {
  expect(typeof callArg).toBe('string');
  return JSON.parse(callArg as string);
}

const Ajv2020 =
  (Ajv2020Module as unknown as { default?: new (...args: any[]) => any })
    .default ?? (Ajv2020Module as unknown as new (...args: any[]) => any);

const addFormats =
  (addFormatsModule as unknown as { default?: (ajv: any) => void }).default ??
  (addFormatsModule as unknown as (ajv: any) => void);

describe('sync contract schemas', () => {
  const schemaDir = path.join(projectRoot, 'contracts', 'schemas');
  const stageStatusSchema = loadSchema(
    path.join(schemaDir, 'figma-sync.stage-status.schema.json'),
  );
  const runSummarySchema = loadSchema(
    path.join(schemaDir, 'figma-sync.run-summary.schema.json'),
  );
  const collectionKeyDiscoverySchema = loadSchema(
    path.join(schemaDir, 'figma-sync.collection-key-discovery.schema.json'),
  );
  const errorSchema = loadSchema(
    path.join(schemaDir, 'figma-sync.error.schema.json'),
  );

  const ajv = new Ajv2020({ strict: false, allErrors: true });
  addFormats(ajv);
  ajv.addSchema(errorSchema, 'figma-sync.error.schema.json');

  const validateStage = ajv.compile(stageStatusSchema);
  const validateRunSummary = ajv.compile(runSummarySchema);
  const validateCollectionKeyDiscovery = ajv.compile(
    collectionKeyDiscoverySchema,
  );

  it('emits stage-status event that matches frozen schema', () => {
    const now = new Date().toISOString();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    emitStageEvent({
      schemaVersion: '1.0.0',
      eventType: 'stage-status',
      runId: 'run-1',
      environment: 'test',
      stage: 'primitive',
      status: 'succeeded',
      dryRun: false,
      mutationsApplied: true,
      counts: {
        variableCollections: { create: 0, update: 1, delete: 0 },
        variables: { create: 2, update: 8, delete: 0 },
        variableModeValues: { update: 10 },
      },
      unresolvedAliasCount: 0,
      startedAt: now,
      finishedAt: now,
    });

    expect(logSpy).toHaveBeenCalledTimes(1);
    const event = parseConsoleJson(logSpy.mock.calls[0][0]);
    expect(validateStage(event)).toBe(true);
    logSpy.mockRestore();
  });

  it('normalizes errors and emits run-summary matching frozen schema', () => {
    const now = new Date().toISOString();
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    const normalizedErrors = withRequiredErrorFields(
      [
        {
          code: 'STAGE_FAILED',
          message: 'semantic stage failed',
          stage: 'semantic',
        },
      ],
      'test',
    );

    emitRunSummary({
      runId: 'run-2',
      environment: 'test',
      dryRun: false,
      productionGuardrailPassed: true,
      mutationsApplied: true,
      unresolvedAliasCount: 0,
      stages: [
        {
          stage: 'semantic',
          status: 'failed',
          counts: emptyCounts(),
        },
      ],
      errors: normalizedErrors,
      startedAt: now,
      finishedAt: now,
    });

    expect(logSpy).toHaveBeenCalledTimes(1);
    const summary = parseConsoleJson(logSpy.mock.calls[0][0]);
    expect(validateRunSummary(summary)).toBe(true);
    logSpy.mockRestore();
  });

  it('validates collection-key-discovery report schema', () => {
    const report = {
      schemaVersion: '1.0.0',
      eventType: 'collection-key-discovery',
      runId: 'run-3',
      environment: 'test',
      generatedAt: '2026-04-28T20:32:01.152Z',
      files: [
        {
          tier: 'primitive',
          fileKey: 'file-key-primitive',
          remoteCollections: [
            {
              id: 'VariableCollectionId:abc/123',
              name: 'color',
              key: 'abc123',
              variableCount: 2,
              modeNames: ['light', 'dark'],
            },
          ],
        },
      ],
      collections: {
        color: {
          collectionName: 'color',
          configuredKey: 'abc123',
          recommendation: {
            key: null,
            reason: 'multiple-candidates',
          },
          candidates: [
            {
              key: 'abc123',
              observedInTiers: ['primitive'],
              variableReferenceCount: 2,
              isConfiguredKey: true,
            },
            {
              key: 'def456',
              observedInTiers: ['component'],
              variableReferenceCount: 10,
              isConfiguredKey: false,
            },
          ],
        },
        dimension: {
          collectionName: 'dimension',
          configuredKey: null,
          recommendation: {
            key: null,
            reason: 'none-found',
          },
          candidates: [],
        },
        primitives: {
          collectionName: 'primitives',
          configuredKey: 'prim123',
          recommendation: {
            key: 'prim123',
            reason: 'single-candidate',
          },
          candidates: [
            {
              key: 'prim123',
              observedInTiers: ['semantic'],
              variableReferenceCount: 25,
              isConfiguredKey: true,
            },
          ],
        },
        global: {
          collectionName: 'global',
          configuredKey: 'glob123',
          recommendation: {
            key: 'glob123',
            reason: 'single-candidate',
          },
          candidates: [
            {
              key: 'glob123',
              observedInTiers: ['component'],
              variableReferenceCount: 4,
              isConfiguredKey: true,
            },
          ],
        },
      },
      conflicts: [
        {
          collectionName: 'color',
          candidateKeys: ['abc123', 'def456'],
        },
      ],
    };

    expect(validateCollectionKeyDiscovery(report)).toBe(true);
  });
});
