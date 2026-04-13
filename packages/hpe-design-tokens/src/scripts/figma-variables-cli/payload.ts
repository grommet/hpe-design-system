import type { ApiPostVariablesPayload } from '../../figma_api.js';

const isPayloadArray = (value: unknown): value is unknown[] =>
  value === undefined || Array.isArray(value);

export const payloadSummary = (payload: ApiPostVariablesPayload) => ({
  variableCollections: payload.variableCollections?.length || 0,
  variableModes: payload.variableModes?.length || 0,
  variables: payload.variables?.length || 0,
  variableModeValues: payload.variableModeValues?.length || 0,
});

export const validatePostPayload = (
  payload: unknown,
): payload is ApiPostVariablesPayload => {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const candidate = payload as Record<string, unknown>;

  return (
    isPayloadArray(candidate.variableCollections) &&
    isPayloadArray(candidate.variableModes) &&
    isPayloadArray(candidate.variables) &&
    isPayloadArray(candidate.variableModeValues)
  );
};
