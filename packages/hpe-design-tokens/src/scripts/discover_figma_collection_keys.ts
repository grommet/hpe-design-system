import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import FigmaApi, { ApiGetLocalVariablesResponse } from '../figma_api.js';
import { getCliArgValue, SyncEnvironment } from '../figma_sync_config.js';
import { makeRunId, SCHEMA_VERSION } from '../sync_events.js';

type FileTier = 'primitive' | 'semantic' | 'component';
type CollectionName = 'color' | 'dimension' | 'primitives' | 'global';

type DiscoveryCollection = {
  id: string;
  name: string;
  key: string;
  variableCount: number;
  modeNames: string[];
};

type TierDiscovery = {
  tier: FileTier;
  fileKey: string;
  remoteCollections: DiscoveryCollection[];
};

type CandidateKey = {
  key: string;
  observedInTiers: FileTier[];
  variableReferenceCount: number;
  isConfiguredKey: boolean;
};

type CollectionDiscovery = {
  collectionName: CollectionName;
  configuredKey: string | null;
  recommendation: {
    key: string | null;
    reason: 'single-candidate' | 'multiple-candidates' | 'none-found';
  };
  candidates: CandidateKey[];
};

type DiscoveryReport = {
  schemaVersion: string;
  eventType: 'collection-key-discovery';
  runId: string;
  environment: SyncEnvironment;
  generatedAt: string;
  files: TierDiscovery[];
  collections: Record<CollectionName, CollectionDiscovery>;
  conflicts: Array<{
    collectionName: CollectionName;
    candidateKeys: string[];
  }>;
};

function parseEnvironment(argv: string[]): SyncEnvironment {
  const value = getCliArgValue(argv, '--env');
  if (!value) return 'production';
  if (value === 'production' || value === 'test') return value;

  throw new Error(
    `Invalid --env value "${value}". Allowed values: production, test.`,
  );
}

function resolveScopedValue(
  envName: SyncEnvironment,
  envVars: NodeJS.ProcessEnv,
  suffix: string,
  legacyKey?: string,
) {
  const scopedKey = `${envName.toUpperCase()}_${suffix}`;
  const scoped = envVars[scopedKey];
  if (scoped) return scoped;

  if (envName === 'production' && legacyKey) {
    const legacy = envVars[legacyKey];
    if (legacy) return legacy;
  }

  return undefined;
}

function resolveDiscoveryInputs(
  envName: SyncEnvironment,
  envVars: NodeJS.ProcessEnv,
) {
  const personalAccessToken = resolveScopedValue(
    envName,
    envVars,
    'PERSONAL_ACCESS_TOKEN',
    'PERSONAL_ACCESS_TOKEN',
  );

  const fileKeys: Record<FileTier, string | undefined> = {
    primitive: resolveScopedValue(
      envName,
      envVars,
      'FILE_KEY_PRIMITIVE',
      'FILE_KEY_PRIMITIVE',
    ),
    semantic: resolveScopedValue(
      envName,
      envVars,
      'FILE_KEY_SEMANTIC',
      'FILE_KEY_SEMANTIC',
    ),
    component: resolveScopedValue(
      envName,
      envVars,
      'FILE_KEY_COMPONENT',
      'FILE_KEY_COMPONENT',
    ),
  };

  const configuredKeys: Record<CollectionName, string | null> = {
    color:
      resolveScopedValue(
        envName,
        envVars,
        'FIGMA_COLOR_COLLECTION_KEY',
        'FIGMA_COLOR_COLLECTION_KEY',
      ) || null,
    dimension:
      resolveScopedValue(
        envName,
        envVars,
        'FIGMA_DIMENSION_COLLECTION_KEY',
        'FIGMA_DIMENSION_COLLECTION_KEY',
      ) || null,
    primitives:
      resolveScopedValue(
        envName,
        envVars,
        'FIGMA_PRIMITIVES_COLLECTION_KEY',
        'FIGMA_PRIMITIVES_COLLECTION_KEY',
      ) || null,
    global:
      resolveScopedValue(
        envName,
        envVars,
        'FIGMA_GLOBAL_COLLECTION_KEY',
        'FIGMA_GLOBAL_COLLECTION_KEY',
      ) || null,
  };

  const missing: string[] = [];
  if (!personalAccessToken) {
    missing.push(`${envName.toUpperCase()}_PERSONAL_ACCESS_TOKEN`);
  }

  (Object.keys(fileKeys) as FileTier[]).forEach(tier => {
    if (!fileKeys[tier]) {
      missing.push(`${envName.toUpperCase()}_FILE_KEY_${tier.toUpperCase()}`);
    }
  });

  if (missing.length) {
    throw new Error(
      `Missing required discovery configuration for env "${envName}": ${missing.join(', ')}`,
    );
  }

  return {
    personalAccessToken: personalAccessToken as string,
    fileKeys: fileKeys as Record<FileTier, string>,
    configuredKeys,
  };
}

function extractRemoteCollections(
  payload: ApiGetLocalVariablesResponse,
): DiscoveryCollection[] {
  const collections = Object.values(payload.meta.variableCollections || {})
    .filter(collection => collection.remote)
    .map(collection => ({
      id: collection.id,
      name: collection.name,
      key: collection.key || '',
      variableCount: collection.variableIds?.length || 0,
      modeNames: (collection.modes || []).map(mode => mode.name),
    }))
    .filter(collection => collection.key);

  return collections;
}

function buildCollectionDiscovery(
  files: TierDiscovery[],
  configuredKeys: Record<CollectionName, string | null>,
) {
  const names: CollectionName[] = [
    'color',
    'dimension',
    'primitives',
    'global',
  ];
  const output = {} as Record<CollectionName, CollectionDiscovery>;

  names.forEach(collectionName => {
    const candidateMap = new Map<
      string,
      { observedInTiers: Set<FileTier>; variableReferenceCount: number }
    >();

    files.forEach(file => {
      file.remoteCollections
        .filter(collection => collection.name === collectionName)
        .forEach(collection => {
          const current = candidateMap.get(collection.key) || {
            observedInTiers: new Set<FileTier>(),
            variableReferenceCount: 0,
          };
          current.observedInTiers.add(file.tier);
          current.variableReferenceCount += collection.variableCount;
          candidateMap.set(collection.key, current);
        });
    });

    const candidates: CandidateKey[] = Array.from(candidateMap.entries())
      .map(([key, value]) => ({
        key,
        observedInTiers: Array.from(value.observedInTiers).sort(),
        variableReferenceCount: value.variableReferenceCount,
        isConfiguredKey: configuredKeys[collectionName] === key,
      }))
      .sort((a, b) => b.variableReferenceCount - a.variableReferenceCount);

    let recommendation: CollectionDiscovery['recommendation'];
    if (candidates.length === 0) {
      recommendation = { key: null, reason: 'none-found' };
    } else if (candidates.length === 1) {
      recommendation = { key: candidates[0].key, reason: 'single-candidate' };
    } else {
      recommendation = { key: null, reason: 'multiple-candidates' };
    }

    output[collectionName] = {
      collectionName,
      configuredKey: configuredKeys[collectionName],
      recommendation,
      candidates,
    };
  });

  return output;
}

async function main() {
  const argv = process.argv.slice(2);
  const envName = parseEnvironment(argv);
  const outputPathArg = getCliArgValue(argv, '--output');
  const pretty = argv.includes('--pretty');

  const resolved = resolveDiscoveryInputs(envName, process.env);
  const api = new FigmaApi(resolved.personalAccessToken);

  const files: TierDiscovery[] = [];
  const tiers: FileTier[] = ['primitive', 'semantic', 'component'];

  for (const tier of tiers) {
    const fileKey = resolved.fileKeys[tier];
    const response = await api.getLocalVariables(fileKey);
    files.push({
      tier,
      fileKey,
      remoteCollections: extractRemoteCollections(response),
    });
  }

  const collections = buildCollectionDiscovery(files, resolved.configuredKeys);

  const conflicts = (Object.keys(collections) as CollectionName[])
    .filter(name => collections[name].candidates.length > 1)
    .map(name => ({
      collectionName: name,
      candidateKeys: collections[name].candidates.map(c => c.key),
    }));

  const report: DiscoveryReport = {
    schemaVersion: SCHEMA_VERSION,
    eventType: 'collection-key-discovery',
    runId: makeRunId(),
    environment: envName,
    generatedAt: new Date().toISOString(),
    files,
    collections,
    conflicts,
  };

  const json = JSON.stringify(report, null, pretty ? 2 : undefined);

  if (outputPathArg) {
    const outputPath = path.isAbsolute(outputPathArg)
      ? outputPathArg
      : path.resolve(process.cwd(), outputPathArg);
    const dirName = path.dirname(outputPath);
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }
    fs.writeFileSync(outputPath, `${json}\n`);
  }

  console.log(json);
}

main();
