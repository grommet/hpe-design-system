import fs from 'fs';
import path from 'path';

export type SyncEnvironment = 'production' | 'test';

type FileTier = 'primitive' | 'semantic' | 'component';
type CollectionName = 'primitives' | 'global' | 'color' | 'dimension';

type EnvironmentConfigDefaults = {
  files?: Partial<Record<FileTier, string>>;
  collections?: Partial<Record<CollectionName, string>>;
};

type ConfigDefaults = {
  environments?: Partial<Record<SyncEnvironment, EnvironmentConfigDefaults>>;
};

export type ExpectedCollectionKeys = Record<CollectionName, string>;

export type FigmaSyncConfig = {
  env: SyncEnvironment;
  personalAccessToken: string;
  fileKeys: Record<FileTier, string>;
  expectedCollectionKeys: ExpectedCollectionKeys;
  dryRun: boolean;
  bootstrap: boolean;
};

export type GuardrailCheckOptions = {
  argv?: string[];
  env?: NodeJS.ProcessEnv;
  isMutating: boolean;
};

type ResolveConfigOptions = {
  argv?: string[];
  env?: NodeJS.ProcessEnv;
  cwd?: string;
};

function getArgValue(argv: string[], name: string) {
  const exactMatchIdx = argv.findIndex(arg => arg === name);
  if (exactMatchIdx !== -1) {
    return argv[exactMatchIdx + 1];
  }

  const prefixedArg = argv.find(arg => arg.startsWith(`${name}=`));
  if (prefixedArg) {
    return prefixedArg.slice(name.length + 1);
  }

  return undefined;
}

export function getCliArgValue(argv: string[], name: string) {
  return getArgValue(argv, name);
}

export function hasCliFlag(argv: string[], name: string) {
  return argv.includes(name);
}

function getSyncEnvironment(argv: string[]): SyncEnvironment {
  const envArg = getArgValue(argv, '--env');
  if (!envArg) return 'production';

  if (envArg !== 'production' && envArg !== 'test') {
    throw new Error(
      `Invalid --env value "${envArg}". Allowed values: production, test.`,
    );
  }

  return envArg;
}

function getConfigDefaults(configPath: string | undefined, cwd: string) {
  if (!configPath) return {} as ConfigDefaults;

  const absoluteConfigPath = path.isAbsolute(configPath)
    ? configPath
    : path.resolve(cwd, configPath);

  if (!fs.existsSync(absoluteConfigPath)) {
    throw new Error(`Config file not found: ${absoluteConfigPath}`);
  }

  const raw = fs.readFileSync(absoluteConfigPath, 'utf-8');
  try {
    return JSON.parse(raw) as ConfigDefaults;
  } catch (error) {
    throw new Error(
      `Invalid JSON in config file: ${absoluteConfigPath}. ${(error as Error).message}`,
    );
  }
}

function resolveValue({
  env,
  envVars,
  envKeySuffix,
  configValue,
  legacyEnvKey,
}: {
  env: SyncEnvironment;
  envVars: NodeJS.ProcessEnv;
  envKeySuffix: string;
  configValue?: string;
  legacyEnvKey?: string;
}) {
  const envPrefix = env.toUpperCase();
  const scopedKey = `${envPrefix}_${envKeySuffix}`;

  if (envVars[scopedKey]) return envVars[scopedKey] as string;
  if (env === 'production' && legacyEnvKey && envVars[legacyEnvKey]) {
    return envVars[legacyEnvKey] as string;
  }
  if (configValue) return configValue;

  return undefined;
}

export function resolveFigmaSyncConfig(
  options: ResolveConfigOptions = {},
): FigmaSyncConfig {
  const argv = options.argv ?? process.argv.slice(2);
  const envVars = options.env ?? process.env;
  const cwd = options.cwd ?? process.cwd();

  const env = getSyncEnvironment(argv);
  const configPath = getArgValue(argv, '--config');
  const defaults = getConfigDefaults(configPath, cwd);
  const defaultsForEnv = defaults.environments?.[env] || {};

  const personalAccessToken = resolveValue({
    env,
    envVars,
    envKeySuffix: 'PERSONAL_ACCESS_TOKEN',
    legacyEnvKey: 'PERSONAL_ACCESS_TOKEN',
  });

  const fileKeys = {
    primitive: resolveValue({
      env,
      envVars,
      envKeySuffix: 'FILE_KEY_PRIMITIVE',
      legacyEnvKey: 'FILE_KEY_PRIMITIVE',
      configValue: defaultsForEnv.files?.primitive,
    }),
    semantic: resolveValue({
      env,
      envVars,
      envKeySuffix: 'FILE_KEY_SEMANTIC',
      legacyEnvKey: 'FILE_KEY_SEMANTIC',
      configValue: defaultsForEnv.files?.semantic,
    }),
    component: resolveValue({
      env,
      envVars,
      envKeySuffix: 'FILE_KEY_COMPONENT',
      legacyEnvKey: 'FILE_KEY_COMPONENT',
      configValue: defaultsForEnv.files?.component,
    }),
  };

  const expectedCollectionKeys = {
    color: resolveValue({
      env,
      envVars,
      envKeySuffix: 'FIGMA_COLOR_COLLECTION_KEY',
      legacyEnvKey: 'FIGMA_COLOR_COLLECTION_KEY',
      configValue: defaultsForEnv.collections?.color,
    }),
    dimension: resolveValue({
      env,
      envVars,
      envKeySuffix: 'FIGMA_DIMENSION_COLLECTION_KEY',
      legacyEnvKey: 'FIGMA_DIMENSION_COLLECTION_KEY',
      configValue: defaultsForEnv.collections?.dimension,
    }),
    primitives: resolveValue({
      env,
      envVars,
      envKeySuffix: 'FIGMA_PRIMITIVES_COLLECTION_KEY',
      legacyEnvKey: 'FIGMA_PRIMITIVES_COLLECTION_KEY',
      configValue: defaultsForEnv.collections?.primitives,
    }),
    global: resolveValue({
      env,
      envVars,
      envKeySuffix: 'FIGMA_GLOBAL_COLLECTION_KEY',
      legacyEnvKey: 'FIGMA_GLOBAL_COLLECTION_KEY',
      configValue: defaultsForEnv.collections?.global,
    }),
  };

  const bootstrap = hasCliFlag(argv, '--bootstrap');

  const missing: string[] = [];
  if (!personalAccessToken) {
    missing.push(`${env.toUpperCase()}_PERSONAL_ACCESS_TOKEN`);
  }

  Object.entries(fileKeys).forEach(([tier, value]) => {
    if (!value) {
      missing.push(`${env.toUpperCase()}_FILE_KEY_${tier.toUpperCase()}`);
    }
  });

  if (!bootstrap) {
    Object.entries(expectedCollectionKeys).forEach(([collection, value]) => {
      if (!value) {
        missing.push(
          `${env.toUpperCase()}_FIGMA_${collection.toUpperCase()}_COLLECTION_KEY`,
        );
      }
    });
  }

  if (missing.length) {
    throw new Error(
      `Missing required Figma sync configuration for env "${env}": ${missing.join(', ')}`,
    );
  }

  return {
    env,
    personalAccessToken: personalAccessToken as string,
    fileKeys: fileKeys as Record<FileTier, string>,
    expectedCollectionKeys:
      expectedCollectionKeys as unknown as ExpectedCollectionKeys,
    dryRun: hasCliFlag(argv, '--dry-run'),
    bootstrap,
  };
}

export function ensureProductionMutationGuardrails(
  config: FigmaSyncConfig,
  options: GuardrailCheckOptions,
) {
  if (!options.isMutating || config.env !== 'production') {
    return { passed: true, reason: 'not-required' as const };
  }

  const argv = options.argv ?? process.argv.slice(2);
  const envVars = options.env ?? process.env;
  const isCI = envVars.CI === 'true' || envVars.CI === '1';
  const allowProdWrites = envVars.ALLOW_PRODUCTION_WRITES === 'true';
  const hasConfirmFlag = hasCliFlag(argv, '--confirm-production');

  if (isCI && !allowProdWrites) {
    throw new Error(
      'Production mutation blocked in CI. Set ALLOW_PRODUCTION_WRITES=true to proceed.',
    );
  }

  if (!isCI && !hasConfirmFlag) {
    throw new Error(
      'Production mutation requires --confirm-production when running locally.',
    );
  }

  return {
    passed: true,
    reason: isCI ? ('ci-allow-var' as const) : ('local-confirm-flag' as const),
  };
}
