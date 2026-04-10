import type { Variable } from '../../figma_api.js';

export type Role = 'primitive' | 'semantic' | 'component';
export type SourceType = 'local' | 'published';
export type ActionType =
  | 'collections'
  | 'modes'
  | 'variables'
  | 'variable-by-id'
  | 'post';

export type CliOptions = {
  action?: ActionType;
  source?: SourceType;
  role?: Role;
  fileKey?: string;
  payload?: string;
  collection?: string;
  mode?: string;
  maxRows?: number;
  variableId?: string;
  confirm?: string;
  help?: boolean;
};

export type FileKeySelection = {
  fileKey: string;
  source: string;
};

export const isRole = (value: string): value is Role =>
  value === 'primitive' || value === 'semantic' || value === 'component';

export const isSourceType = (value: string): value is SourceType =>
  value === 'local' || value === 'published';

export const isActionType = (value: string): value is ActionType =>
  value === 'collections' ||
  value === 'modes' ||
  value === 'variables' ||
  value === 'variable-by-id' ||
  value === 'post';

export const previewVariableValue = (
  value: Variable['valuesByMode'][string],
) => {
  if (typeof value === 'object' && value !== null) {
    if ('type' in value && value.type === 'VARIABLE_ALIAS') {
      return `alias:${value.id}`;
    }
    if ('r' in value && 'g' in value && 'b' in value) {
      const alpha = 'a' in value && typeof value.a === 'number' ? value.a : 1;
      return `rgba(${value.r.toFixed(3)}, ${value.g.toFixed(
        3,
      )}, ${value.b.toFixed(3)}, ${alpha.toFixed(3)})`;
    }
  }

  return JSON.stringify(value);
};
