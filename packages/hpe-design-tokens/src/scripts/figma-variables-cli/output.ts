import type {
  ApiGetVariableResponse,
  VariableCollection,
} from '../../figma_api.js';
import { ask, type ReadlineInterface } from './prompts.js';
import { normalizeVariableId, previewVariableValue } from './types.js';

type VariableLocationRow = {
  id: string;
  name: string;
  role: string;
  file: string;
  sourceType: string;
  collection: string;
  collectionId: string;
  resolvedType: string;
  remote: boolean;
  previewMode: string;
  previewValue: string;
};

type CollectionLocationRow = {
  id: string;
  name: string;
  key: string;
  role: string;
  file: string;
  sourceType: string;
  remote: boolean | undefined;
  variableCount: number;
  modes: string;
  subscribedId: string;
  updatedAt: string;
};

export function printCollections(collections: VariableCollection[]) {
  const rows = buildCollectionRows(collections);

  console.table(rows);
}

function modesToString(collection: VariableCollection) {
  return Array.isArray(collection.modes)
    ? collection.modes.map(mode => mode.name).join('|')
    : '(not returned for published endpoint)';
}

export function buildExpandedCollectionJson(collection: VariableCollection) {
  return {
    id: collection.id,
    name: collection.name,
    key: collection.key || '',
    modes: modesToString(collection),
    defaultModeId: collection.defaultModeId,
    remote: collection.remote,
    hiddenFromPublishing: collection.hiddenFromPublishing,
    variableCount: collection.variableIds?.length || 0,
    isExtension: collection.isExtension || false,
    parentVariableCollectionId: collection.parentVariableCollectionId || null,
    rootVariableCollectionId: collection.rootVariableCollectionId || null,
    inheritedVariableIds: collection.inheritedVariableIds || [],
    localVariableIds: collection.localVariableIds || [],
    variableOverrideIds: collection.variableOverrideIds || [],
    subscribedId: collection.subscribed_id || '',
    updatedAt: collection.updatedAt || '',
  };
}

export function buildCollectionJson(collections: VariableCollection[]) {
  return {
    collections: collections.map(buildExpandedCollectionJson),
  };
}

export function buildCollectionRows(collections: VariableCollection[]) {
  return collections.map(collection => {
    const row: Record<string, string | number | boolean | undefined> = {
      name: collection.name,
      key: collection.key || '',
      id: collection.id,
    };

    // If subscribed_id is present, it indicates this collection is from the
    // published endpoint and we won't have access to certain details about
    // the collection.
    if (collection.subscribed_id) {
      row['subscribed_id'] = collection.subscribed_id;
      row['updatedAt'] = collection.updatedAt;
    } else {
      row['remote'] = collection.remote;
      row['variableCount'] = collection.variableIds?.length || 0;
      row['modes'] = modesToString(collection);
    }

    return row;
  });
}

export function printModes(collections: VariableCollection[]) {
  const rows = buildModeRows(collections);

  console.table(rows);
}

export function buildModeRows(collections: VariableCollection[]) {
  return collections.flatMap(collection =>
    collection.modes.map(mode => ({
      collectionName: collection.name,
      collectionId: collection.id,
      modeName: mode.name,
      modeId: mode.modeId,
    })),
  );
}

type CollectionLookupResult = {
  collection?: VariableCollection;
  searchedId: string;
  matchedBy?: string;
};

function findCollectionById(
  response: ApiGetVariableResponse,
  collectionId: string,
): CollectionLookupResult {
  const searchedId = collectionId.trim();

  const direct = response.meta.variableCollections[searchedId];
  if (direct) {
    return {
      collection: direct,
      searchedId,
      matchedBy: `direct map key: ${searchedId}`,
    };
  }

  const byId = Object.values(response.meta.variableCollections).find(
    collection => collection.id === searchedId,
  );
  if (byId) {
    return {
      collection: byId,
      searchedId,
      matchedBy: `collection.id match: ${searchedId}`,
    };
  }

  return { searchedId };
}

function toCollectionLocationRow(
  collection: VariableCollection,
  location: { role: string; source: string; sourceType: string },
): CollectionLocationRow {
  return {
    id: collection.id,
    name: collection.name,
    key: collection.key || '',
    role: location.role,
    file: location.source,
    sourceType: location.sourceType,
    remote: collection.remote,
    variableCount: collection.variableIds?.length || 0,
    modes: Array.isArray(collection.modes)
      ? collection.modes.map(mode => mode.name).join('|')
      : '',
    subscribedId: collection.subscribed_id || '',
    updatedAt: collection.updatedAt || '',
  };
}

function printCollectionLookupDebug(
  lookup: CollectionLookupResult,
  location?: { role: string; source: string; sourceType: string },
) {
  console.log('\nCollection lookup debug:');
  console.table([
    {
      searchedId: lookup.searchedId,
      matchedBy: lookup.matchedBy || '',
      role: location?.role || '',
      source: location?.source || '',
      sourceType: location?.sourceType || '',
      matchedCollectionId: lookup.collection?.id || '',
      matchedCollectionName: lookup.collection?.name || '',
    },
  ]);
}

export function printCollectionById(
  response: ApiGetVariableResponse,
  collectionId: string,
  options?: { debug?: boolean },
) {
  const lookup = findCollectionById(response, collectionId);

  if (options?.debug) {
    printCollectionLookupDebug(lookup);
  }

  if (!lookup.collection) {
    console.log(`No collection found for id: ${lookup.searchedId}`);
    return;
  }

  console.table([
    toCollectionLocationRow(lookup.collection, {
      role: '',
      source: '',
      sourceType: '',
    }),
  ]);
  console.log('Displayed 1 collection.');
}

export function buildCollectionLocationRow(
  response: ApiGetVariableResponse,
  collectionId: string,
  location: {
    role: string;
    source: string;
    sourceType: string;
  },
  options?: { debug?: boolean },
): CollectionLocationRow | undefined {
  const lookup = findCollectionById(response, collectionId);

  if (options?.debug) {
    printCollectionLookupDebug(lookup, location);
  }

  if (!lookup.collection) {
    return undefined;
  }

  return toCollectionLocationRow(lookup.collection, location);
}

export function printCollectionLocationResults(
  rows: CollectionLocationRow[],
  collectionId: string,
) {
  const normalizedCollectionId = collectionId.trim();

  if (rows.length === 0) {
    console.log(`No collection found for id: ${normalizedCollectionId}`);
    return;
  }

  console.table(rows);
  console.log(`Found ${rows.length} matching location(s).`);
}

export function buildVariableRows(
  response: ApiGetVariableResponse,
  {
    collectionFilter,
    modeFilter,
    rowLimit,
  }: { collectionFilter?: string; modeFilter?: string; rowLimit: number },
) {
  const collectionsById = response.meta.variableCollections;

  return Object.values(response.meta.variables)
    .filter(variable => {
      const collection = collectionsById[variable.variableCollectionId];
      if (!collection) {
        return false;
      }

      const collectionMatches =
        !collectionFilter || collection.name === collectionFilter;
      if (!collectionMatches) {
        return false;
      }

      if (!modeFilter) {
        return true;
      }

      const matchingModeIds = collection.modes
        .filter(mode => mode.name === modeFilter)
        .map(mode => mode.modeId);

      return matchingModeIds.some(
        modeId => variable.valuesByMode[modeId] !== undefined,
      );
    })
    .slice(0, rowLimit)
    .map(variable => {
      const collection = collectionsById[variable.variableCollectionId];
      const firstModeId = Object.keys(variable.valuesByMode)[0];
      const firstModeName =
        collection?.modes.find(mode => mode.modeId === firstModeId)?.name ||
        firstModeId ||
        '';

      return {
        name: variable.name,
        id: variable.id,
        collection: collection?.name || variable.variableCollectionId,
        resolvedType: variable.resolvedType,
        remote: variable.remote,
        previewMode: firstModeName,
        previewValue:
          firstModeId !== undefined
            ? previewVariableValue(variable.valuesByMode[firstModeId])
            : '',
      };
    });
}

export async function printVariables(
  rl: ReadlineInterface,
  response: ApiGetVariableResponse,
) {
  const collectionFilter = (
    await ask(rl, '\nOptional collection name filter (press enter to skip): ')
  ).trim();
  const modeFilter = (
    await ask(rl, 'Optional mode name filter (press enter to skip): ')
  ).trim();
  const maxRowsInput = (
    await ask(rl, 'Max rows to print (default 100): ')
  ).trim();

  const maxRows = Number(maxRowsInput);
  const rowLimit = Number.isFinite(maxRows) && maxRows > 0 ? maxRows : 100;

  const rows = buildVariableRows(response, {
    collectionFilter,
    modeFilter,
    rowLimit,
  });

  console.table(rows);
  console.log(`Displayed ${rows.length} variable(s).`);
}

function buildVariableIdCandidates(variableId: string) {
  const trimmed = variableId.trim();
  const withoutPrefix = normalizeVariableId(trimmed);
  const slashSuffix = withoutPrefix.includes('/')
    ? withoutPrefix.split('/').pop() || ''
    : '';

  const rawCandidates = [
    trimmed,
    withoutPrefix,
    slashSuffix,
    `VariableID:${withoutPrefix}`,
    slashSuffix ? `VariableID:${slashSuffix}` : '',
  ].filter(Boolean);

  return Array.from(new Set(rawCandidates));
}

type VariableLookupResult = {
  variable?: ApiGetVariableResponse['meta']['variables'][string];
  candidates: string[];
  matchedBy?: string;
};

function findVariableById(
  response: ApiGetVariableResponse,
  variableId: string,
): VariableLookupResult {
  const candidates = buildVariableIdCandidates(variableId);
  const normalizedCandidates = new Set(candidates.map(normalizeVariableId));

  for (const candidate of candidates) {
    const directMatch = response.meta.variables[candidate];
    if (directMatch) {
      return {
        variable: directMatch,
        candidates,
        matchedBy: `direct map key: ${candidate}`,
      };
    }
  }

  for (const [mapKey, variable] of Object.entries(response.meta.variables)) {
    const comparableValues = [
      mapKey,
      normalizeVariableId(mapKey),
      variable.id,
      normalizeVariableId(variable.id),
      variable.key,
      variable.key ? normalizeVariableId(variable.key) : '',
    ].filter(Boolean);

    if (
      comparableValues.some(
        value => candidates.includes(value) || normalizedCandidates.has(value),
      )
    ) {
      return {
        variable,
        candidates,
        matchedBy: `fallback comparison via map key ${mapKey}`,
      };
    }
  }

  return { candidates };
}

function printLookupDebug(
  variableId: string,
  lookup: VariableLookupResult,
  location?: { role: string; source: string; sourceType: string },
) {
  const rows = lookup.candidates.map(candidate => ({
    input: variableId,
    normalizedInput: normalizeVariableId(variableId),
    candidate,
    normalizedCandidate: normalizeVariableId(candidate),
    matchedBy: lookup.matchedBy || '',
    role: location?.role || '',
    source: location?.source || '',
    sourceType: location?.sourceType || '',
    matchedVariableId: lookup.variable?.id || '',
    matchedVariableKey: lookup.variable?.key || '',
  }));

  console.log('\nVariable lookup debug:');
  console.table(rows);
}

export function printVariableById(
  response: ApiGetVariableResponse,
  variableId: string,
  options?: { debug?: boolean },
) {
  const normalizedVariableId = normalizeVariableId(variableId);
  const lookup = findVariableById(response, variableId);

  if (options?.debug) {
    printLookupDebug(variableId, lookup);
  }

  const variable = lookup.variable;

  if (!variable) {
    console.log(`No variable found for id: ${normalizedVariableId}`);
    return;
  }

  const collection =
    response.meta.variableCollections[variable.variableCollectionId];
  const rows = buildVariableRows(response, {
    collectionFilter: collection?.name,
    rowLimit: Number.MAX_SAFE_INTEGER,
  });
  const matchingRow = rows.find(row => row.id === variable.id);

  console.table(matchingRow ? [matchingRow] : []);
  console.log('Displayed 1 variable.');
}

export function buildVariableLocationRow(
  response: ApiGetVariableResponse,
  variableId: string,
  location: {
    role: string;
    source: string;
    sourceType: string;
  },
  options?: { debug?: boolean },
): VariableLocationRow | undefined {
  const lookup = findVariableById(response, variableId);

  if (options?.debug) {
    printLookupDebug(variableId, lookup, location);
  }

  const variable = lookup.variable;

  if (!variable) {
    return undefined;
  }

  const collection =
    response.meta.variableCollections[variable.variableCollectionId];
  const firstModeId = Object.keys(variable.valuesByMode)[0];
  const firstModeName =
    collection?.modes.find(mode => mode.modeId === firstModeId)?.name ||
    firstModeId ||
    '';

  return {
    id: variable.id,
    name: variable.name,
    role: location.role,
    file: location.source,
    sourceType: location.sourceType,
    collection: collection?.name || variable.variableCollectionId,
    collectionId: variable.variableCollectionId,
    resolvedType: variable.resolvedType,
    remote: variable.remote,
    previewMode: firstModeName,
    previewValue:
      firstModeId !== undefined
        ? previewVariableValue(variable.valuesByMode[firstModeId])
        : '',
  };
}

export function printVariableLocationResults(
  rows: VariableLocationRow[],
  variableId: string,
) {
  const normalizedVariableId = normalizeVariableId(variableId);

  if (rows.length === 0) {
    console.log(`No variable found for id: ${normalizedVariableId}`);
    return;
  }

  console.table(rows);
  console.log(`Found ${rows.length} matching location(s).`);
}
