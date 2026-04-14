import type {
  ApiGetVariableResponse,
  VariableCollection,
} from '../../figma_api.js';

export type CollectionLocationRow = {
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
  const isExtension = collection.isExtension || false;

  return {
    id: collection.id,
    name: collection.name,
    key: collection.key || '',
    modes: modesToString(collection),
    defaultModeId: collection.defaultModeId,
    remote: collection.remote,
    hiddenFromPublishing: collection.hiddenFromPublishing,
    variableCount: collection.variableIds?.length || 0,
    isExtension,
    ...(isExtension
      ? {
          parentVariableCollectionId:
            collection.parentVariableCollectionId || null,
          rootVariableCollectionId: collection.rootVariableCollectionId || null,
          inheritedVariableIds: collection.inheritedVariableIds || [],
          localVariableIds: collection.localVariableIds || [],
          variableOverrideIds: collection.variableOverrideIds || [],
        }
      : {}),
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
