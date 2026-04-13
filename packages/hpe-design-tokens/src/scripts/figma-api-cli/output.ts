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

export function printCollections(collections: VariableCollection[]) {
  const rows = collections.map(collection => {
    const row: Record<string, string | number | boolean> = {
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
      row['modes'] = Array.isArray(collection.modes)
        ? collection.modes.map(mode => mode.name).join('|')
        : '(not returned for published endpoint)';
    }

    return row;
  });

  console.table(rows);
}

export function printModes(collections: VariableCollection[]) {
  const rows = collections.flatMap(collection =>
    collection.modes.map(mode => ({
      collectionName: collection.name,
      collectionId: collection.id,
      modeName: mode.name,
      modeId: mode.modeId,
    })),
  );

  console.table(rows);
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

export function printVariableById(
  response: ApiGetVariableResponse,
  variableId: string,
) {
  const normalizedVariableId = normalizeVariableId(variableId);
  const variable = response.meta.variables[normalizedVariableId];

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
  const matchingRow = rows.find(row => row.id === normalizedVariableId);

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
): VariableLocationRow | undefined {
  const normalizedVariableId = normalizeVariableId(variableId);
  const variable = response.meta.variables[normalizedVariableId];

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
