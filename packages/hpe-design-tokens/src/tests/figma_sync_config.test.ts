import fs from 'fs';
import os from 'os';
import path from 'path';

import { describe, expect, it } from 'vitest';

import {
  ensureProductionMutationGuardrails,
  resolveFigmaSyncConfig,
} from '../figma_sync_config.js';

const TEST_ENV = {
  TEST_PERSONAL_ACCESS_TOKEN: 'test-token',
  TEST_FILE_KEY_PRIMITIVE: 'test-primitive',
  TEST_FILE_KEY_SEMANTIC: 'test-semantic',
  TEST_FILE_KEY_COMPONENT: 'test-component',
  TEST_FIGMA_COLOR_COLLECTION_KEY: 'test-color',
  TEST_FIGMA_DIMENSION_COLLECTION_KEY: 'test-dimension',
  TEST_FIGMA_PRIMITIVES_COLLECTION_KEY: 'test-primitives',
  TEST_FIGMA_GLOBAL_COLLECTION_KEY: 'test-global',
};

describe('resolveFigmaSyncConfig', () => {
  it('resolves env-scoped values for --env=test', () => {
    const config = resolveFigmaSyncConfig({
      argv: ['--env=test'],
      env: TEST_ENV,
    });

    expect(config.env).toBe('test');
    expect(config.personalAccessToken).toBe('test-token');
    expect(config.fileKeys).toEqual({
      primitive: 'test-primitive',
      semantic: 'test-semantic',
      component: 'test-component',
    });
    expect(config.expectedCollectionKeys).toEqual({
      color: 'test-color',
      dimension: 'test-dimension',
      primitives: 'test-primitives',
      global: 'test-global',
    });
  });

  it('supports legacy production env var names', () => {
    const config = resolveFigmaSyncConfig({
      argv: [],
      env: {
        PERSONAL_ACCESS_TOKEN: 'prod-token',
        FILE_KEY_PRIMITIVE: 'prod-primitive',
        FILE_KEY_SEMANTIC: 'prod-semantic',
        FILE_KEY_COMPONENT: 'prod-component',
        FIGMA_COLOR_COLLECTION_KEY: 'prod-color',
        FIGMA_DIMENSION_COLLECTION_KEY: 'prod-dimension',
        FIGMA_PRIMITIVES_COLLECTION_KEY: 'prod-primitives',
        FIGMA_GLOBAL_COLLECTION_KEY: 'prod-global',
      },
    });

    expect(config.env).toBe('production');
    expect(config.personalAccessToken).toBe('prod-token');
    expect(config.fileKeys.primitive).toBe('prod-primitive');
    expect(config.expectedCollectionKeys.global).toBe('prod-global');
  });

  it('resolves from config file defaults when env vars are absent', () => {
    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'figma-sync-config-test-'),
    );
    const configFilePath = path.join(tempDir, 'figma-sync.config.json');
    fs.writeFileSync(
      configFilePath,
      JSON.stringify(
        {
          environments: {
            test: {
              files: {
                primitive: 'cfg-primitive',
                semantic: 'cfg-semantic',
                component: 'cfg-component',
              },
              collections: {
                color: 'cfg-color',
                dimension: 'cfg-dimension',
                primitives: 'cfg-primitives',
                global: 'cfg-global',
              },
            },
          },
        },
        null,
        2,
      ),
    );

    const config = resolveFigmaSyncConfig({
      argv: ['--env', 'test', '--config', configFilePath],
      env: {
        TEST_PERSONAL_ACCESS_TOKEN: 'from-env-token',
      },
    });

    expect(config.fileKeys).toEqual({
      primitive: 'cfg-primitive',
      semantic: 'cfg-semantic',
      component: 'cfg-component',
    });
    expect(config.expectedCollectionKeys.color).toBe('cfg-color');
  });

  it('throws on invalid env value', () => {
    expect(() =>
      resolveFigmaSyncConfig({
        argv: ['--env=staging'],
        env: TEST_ENV,
      }),
    ).toThrow('Invalid --env value');
  });

  it('throws with missing key list when configuration is incomplete', () => {
    expect(() =>
      resolveFigmaSyncConfig({
        argv: ['--env=test'],
        env: {
          TEST_PERSONAL_ACCESS_TOKEN: 'token-only',
        },
      }),
    ).toThrow('Missing required Figma sync configuration');
  });

  it('blocks local production mutation without --confirm-production', () => {
    const config = resolveFigmaSyncConfig({
      argv: [],
      env: {
        PERSONAL_ACCESS_TOKEN: 'prod-token',
        FILE_KEY_PRIMITIVE: 'prod-primitive',
        FILE_KEY_SEMANTIC: 'prod-semantic',
        FILE_KEY_COMPONENT: 'prod-component',
        FIGMA_COLOR_COLLECTION_KEY: 'prod-color',
        FIGMA_DIMENSION_COLLECTION_KEY: 'prod-dimension',
        FIGMA_PRIMITIVES_COLLECTION_KEY: 'prod-primitives',
        FIGMA_GLOBAL_COLLECTION_KEY: 'prod-global',
      },
    });

    expect(() =>
      ensureProductionMutationGuardrails(config, {
        argv: [],
        env: {},
        isMutating: true,
      }),
    ).toThrow('requires --confirm-production');
  });

  it('allows local production mutation with --confirm-production', () => {
    const config = resolveFigmaSyncConfig({
      argv: [],
      env: {
        PERSONAL_ACCESS_TOKEN: 'prod-token',
        FILE_KEY_PRIMITIVE: 'prod-primitive',
        FILE_KEY_SEMANTIC: 'prod-semantic',
        FILE_KEY_COMPONENT: 'prod-component',
        FIGMA_COLOR_COLLECTION_KEY: 'prod-color',
        FIGMA_DIMENSION_COLLECTION_KEY: 'prod-dimension',
        FIGMA_PRIMITIVES_COLLECTION_KEY: 'prod-primitives',
        FIGMA_GLOBAL_COLLECTION_KEY: 'prod-global',
      },
    });

    const result = ensureProductionMutationGuardrails(config, {
      argv: ['--confirm-production'],
      env: {},
      isMutating: true,
    });

    expect(result).toEqual({ passed: true, reason: 'local-confirm-flag' });
  });

  it('blocks production mutation in CI without ALLOW_PRODUCTION_WRITES=true', () => {
    const config = resolveFigmaSyncConfig({
      argv: [],
      env: {
        PERSONAL_ACCESS_TOKEN: 'prod-token',
        FILE_KEY_PRIMITIVE: 'prod-primitive',
        FILE_KEY_SEMANTIC: 'prod-semantic',
        FILE_KEY_COMPONENT: 'prod-component',
        FIGMA_COLOR_COLLECTION_KEY: 'prod-color',
        FIGMA_DIMENSION_COLLECTION_KEY: 'prod-dimension',
        FIGMA_PRIMITIVES_COLLECTION_KEY: 'prod-primitives',
        FIGMA_GLOBAL_COLLECTION_KEY: 'prod-global',
      },
    });

    expect(() =>
      ensureProductionMutationGuardrails(config, {
        argv: [],
        env: { CI: 'true' },
        isMutating: true,
      }),
    ).toThrow('ALLOW_PRODUCTION_WRITES=true');
  });

  it('allows production mutation in CI with ALLOW_PRODUCTION_WRITES=true', () => {
    const config = resolveFigmaSyncConfig({
      argv: [],
      env: {
        PERSONAL_ACCESS_TOKEN: 'prod-token',
        FILE_KEY_PRIMITIVE: 'prod-primitive',
        FILE_KEY_SEMANTIC: 'prod-semantic',
        FILE_KEY_COMPONENT: 'prod-component',
        FIGMA_COLOR_COLLECTION_KEY: 'prod-color',
        FIGMA_DIMENSION_COLLECTION_KEY: 'prod-dimension',
        FIGMA_PRIMITIVES_COLLECTION_KEY: 'prod-primitives',
        FIGMA_GLOBAL_COLLECTION_KEY: 'prod-global',
      },
    });

    const result = ensureProductionMutationGuardrails(config, {
      argv: [],
      env: { CI: 'true', ALLOW_PRODUCTION_WRITES: 'true' },
      isMutating: true,
    });

    expect(result).toEqual({ passed: true, reason: 'ci-allow-var' });
  });
});
