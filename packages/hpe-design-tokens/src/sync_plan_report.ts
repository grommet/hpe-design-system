// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  ApiGetLocalVariablesResponse,
  ApiPostVariablesPayload,
  VariableCollection,
  VariableMode,
  Variable,
} from './figma_api.js';
import {
  FILE_TIERS,
  FileTier,
  StageCounts,
  countsFromPostPayload,
} from './sync_events.js';

type CollectionSnapshot = Pick<
  VariableCollection,
  'id' | 'name' | 'hiddenFromPublishing' | 'defaultModeId' | 'remote'
> & {
  modes: VariableMode[];
};

type VariableSnapshot = Pick<
  Variable,
  | 'id'
  | 'name'
  | 'variableCollectionId'
  | 'resolvedType'
  | 'description'
  | 'hiddenFromPublishing'
  | 'scopes'
  | 'codeSyntax'
>;

export type StagePlanReport = {
  stage: FileTier;
  counts: StageCounts;
  variableCollections: Array<{
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    id: string | null;
    name: string | null;
    before: CollectionSnapshot | null;
    changes: Record<string, unknown>;
  }>;
  variableModes: Array<{
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    id: string | null;
    name: string | null;
    modeId: string | null;
    collectionId: string;
    collectionName: string | null;
    before: VariableMode | null;
  }>;
  variables: Array<{
    action: 'CREATE' | 'UPDATE' | 'DELETE';
    id: string | null;
    name: string | null;
    collectionId: string | null;
    collectionName: string | null;
    before: VariableSnapshot | null;
    changes: Record<string, unknown>;
  }>;
  variableModeValues: Array<{
    variableId: string;
    variableName: string | null;
    modeId: string;
    modeName: string | null;
    before: unknown;
    after: unknown;
  }>;
};

function collectionSnapshot(
  collection: VariableCollection | undefined,
): CollectionSnapshot | null {
  if (!collection) {
    return null;
  }

  return {
    id: collection.id,
    name: collection.name,
    hiddenFromPublishing: collection.hiddenFromPublishing,
    defaultModeId: collection.defaultModeId,
    remote: collection.remote,
    modes: collection.modes,
  };
}

function variableSnapshot(
  variable: Variable | undefined,
): VariableSnapshot | null {
  if (!variable) {
    return null;
  }

  return {
    id: variable.id,
    name: variable.name,
    variableCollectionId: variable.variableCollectionId,
    resolvedType: variable.resolvedType,
    description: variable.description,
    hiddenFromPublishing: variable.hiddenFromPublishing,
    scopes: variable.scopes,
    codeSyntax: variable.codeSyntax,
  };
}

function omitUndefined<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  );
}

export function parsePlanStageFilterValue(
  value: string | undefined,
): FileTier[] | null {
  if (value === undefined) {
    return null;
  }

  const stages = value
    .split(',')
    .map(stage => stage.trim())
    .filter(Boolean);

  if (stages.length === 0) {
    throw new Error(
      `Invalid --plan-stage value "${value}".` +
        ` Allowed values: ${FILE_TIERS.join(', ')}.`,
    );
  }

  const invalidStages = stages.filter(
    stage => !FILE_TIERS.includes(stage as FileTier),
  );

  if (invalidStages.length > 0) {
    throw new Error(
      `Invalid --plan-stage value "${invalidStages.join(', ')}".` +
        ` Allowed values: ${FILE_TIERS.join(', ')}.`,
    );
  }

  return Array.from(new Set(stages)) as FileTier[];
}

export function buildStagePlanReport(
  stage: FileTier,
  payload: ApiPostVariablesPayload,
  localVariables: ApiGetLocalVariablesResponse,
): StagePlanReport {
  const collectionsById = localVariables.meta.variableCollections;
  const variablesById = localVariables.meta.variables;
  const modeById = new Map<string, VariableMode>();
  const modeNameById = new Map<string, string>();

  Object.values(collectionsById).forEach(collection => {
    collection.modes.forEach(mode => {
      modeById.set(mode.modeId, mode);
      modeNameById.set(mode.modeId, `${collection.name}.${mode.name}`);
    });
  });

  return {
    stage,
    counts: countsFromPostPayload(payload),
    variableCollections: (payload.variableCollections ?? []).map(change => {
      const before = change.id ? collectionsById[change.id] : undefined;
      return {
        action: change.action,
        id: change.id ?? null,
        name: change.name ?? before?.name ?? null,
        before: collectionSnapshot(before),
        changes: omitUndefined({
          initialModeId: change.initialModeId,
          name: change.name,
          hiddenFromPublishing: change.hiddenFromPublishing,
        }),
      };
    }),
    variableModes: (payload.variableModes ?? []).map(change => {
      const before = change.id ? modeById.get(change.id) : undefined;
      const collectionId = change.variableCollectionId;
      return {
        action: change.action,
        id: change.id ?? null,
        name: change.name ?? before?.name ?? null,
        modeId: change.id ?? null,
        collectionId,
        collectionName: collectionsById[collectionId]?.name ?? null,
        before: before ?? null,
      };
    }),
    variables: (payload.variables ?? []).map(change => {
      const before = change.id ? variablesById[change.id] : undefined;
      const collectionId =
        change.variableCollectionId ?? before?.variableCollectionId ?? null;
      return {
        action: change.action,
        id: change.id ?? null,
        name: change.name ?? before?.name ?? null,
        collectionId,
        collectionName: collectionId
          ? (collectionsById[collectionId]?.name ?? null)
          : null,
        before: variableSnapshot(before),
        changes: omitUndefined({
          name: change.name,
          variableCollectionId: change.variableCollectionId,
          resolvedType: change.resolvedType,
          description: change.description,
          hiddenFromPublishing: change.hiddenFromPublishing,
          scopes: change.scopes,
          codeSyntax: change.codeSyntax,
        }),
      };
    }),
    variableModeValues: (payload.variableModeValues ?? []).map(change => {
      const variable = variablesById[change.variableId];
      return {
        variableId: change.variableId,
        variableName: variable?.name ?? null,
        modeId: change.modeId,
        modeName: modeNameById.get(change.modeId) ?? null,
        before: variable?.valuesByMode?.[change.modeId] ?? null,
        after: change.value,
      };
    }),
  };
}
