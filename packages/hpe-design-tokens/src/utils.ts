import { readdirSync } from 'fs';
import { ApiGetLocalVariablesResponse } from './figma_api.js';
import { ExpectedCollectionKeys } from './figma_sync_config.js';

export function green(msg: string) {
  return `\x1b[32m${msg}\x1b[0m`;
}

export function brightRed(msg: string) {
  return `\x1b[1;31m${msg}\x1b[0m`;
}

export function areSetsEqual<T>(a: Set<T>, b: Set<T>) {
  return a.size === b.size && [...a].every(item => b.has(item));
}

export const getThemeAndMode = (file: string) => {
  const parts = file.split('.');
  const themeAndMode = parts[parts.length - 2];
  let theme;
  let mode;
  if (themeAndMode.includes('-')) [theme, mode] = themeAndMode.split('-');
  else mode = themeAndMode;

  return [theme, mode];
};

export const access = <T = Record<string, unknown>>(
  path: string,
  object: Record<string, unknown>,
): T => {
  const result = path.split('.').reduce(
    (state, segment) => {
      if (state.missingPath) {
        return state;
      }

      const nextPath = state.currentPath
        ? `${state.currentPath}.${segment}`
        : segment;

      if (
        state.currentValue &&
        typeof state.currentValue === 'object' &&
        segment in state.currentValue
      ) {
        return {
          currentValue: (state.currentValue as Record<string, unknown>)[
            segment
          ],
          currentPath: nextPath,
          missingPath: undefined as string | undefined,
        };
      }

      return {
        ...state,
        currentPath: nextPath,
        missingPath: nextPath,
      };
    },
    {
      currentValue: object as unknown,
      currentPath: '',
      missingPath: undefined as string | undefined,
    },
  );

  if (result.missingPath) {
    throw new Error(
      `Unable to access path "${path}"; missing segment at ` +
        `"${result.missingPath}".`,
    );
  }

  return result.currentValue as T;
};

export const isReference = (value: string) => /{.*}/.test(value);

export const nonComponentTokens: string[] = [
  'static',
  'base',
  'color',
  'TBD',
  'spacing',
  'radius',
  'borderWidth',
  'content',
  'text',
  'heading',
  'display',
  'paragraph',
  'shadow',
  'size',
  'container',
  'icon',
  'fontStack',
  'breakpoint',
  'fontWeight',
  'focusIndicator',
];

export const numberToPixel = (value: number): string => `${value}px`;

export const excludedNameParts = ['DEFAULT', 'REST'];

export type ReferenceValidationReport = {
  status: 'passed' | 'failed';
  checkedRemoteCollections: number;
  invalidVariablesCount: number;
  errorMessage?: string;
};

/**
 * Ensure variable references are to valid collections.
 * Log errors for any variables referencing invalid Figma files.
 */
export const verifyReferences = (
  localTokens: ApiGetLocalVariablesResponse[],
  expectedCollectionKeys?: ExpectedCollectionKeys,
  options?: { bootstrap?: boolean },
): ReferenceValidationReport => {
  if (options?.bootstrap) {
    return {
      status: 'passed' as const,
      checkedRemoteCollections: 0,
      invalidVariablesCount: 0,
    };
  }

  const resolvedExpectedCollectionKeys: ExpectedCollectionKeys =
    expectedCollectionKeys || {
      primitives: process.env.FIGMA_PRIMITIVES_COLLECTION_KEY || '',
      global: process.env.FIGMA_GLOBAL_COLLECTION_KEY || '',
      color: process.env.FIGMA_COLOR_COLLECTION_KEY || '',
      dimension: process.env.FIGMA_DIMENSION_COLLECTION_KEY || '',
    };

  if (
    !resolvedExpectedCollectionKeys.primitives ||
    !resolvedExpectedCollectionKeys.global ||
    !resolvedExpectedCollectionKeys.color ||
    !resolvedExpectedCollectionKeys.dimension
  ) {
    return {
      status: 'failed',
      checkedRemoteCollections: 0,
      invalidVariablesCount: 0,
      errorMessage:
        'FIGMA_PRIMITIVES_COLLECTION_KEY, FIGMA_GLOBAL_COLLECTION_KEY, ' +
        'FIGMA_COLOR_COLLECTION_KEY, and FIGMA_DIMENSION_COLLECTION_KEY ' +
        'environment variables are required',
    };
  }

  const invalidVariables = new Set<string>();
  let checkedRemoteCollections = 0;
  localTokens.forEach(tokens => {
    Object.keys(tokens.meta.variableCollections).forEach(key => {
      const collection = tokens.meta.variableCollections[key];
      if (collection.remote === true) {
        checkedRemoteCollections += 1;
        if (
          collection.name === 'color' &&
          collection.key !== resolvedExpectedCollectionKeys.color
        ) {
          collection.variableIds?.forEach(id =>
            invalidVariables.add(tokens.meta.variables[id].id),
          );
        } else if (
          collection.name === 'dimension' &&
          collection.key !== resolvedExpectedCollectionKeys.dimension
        ) {
          collection.variableIds?.forEach(id =>
            invalidVariables.add(tokens.meta.variables[id].id),
          );
        } else if (
          collection.name === 'primitives' &&
          collection.key !== resolvedExpectedCollectionKeys.primitives
        ) {
          collection.variableIds?.forEach(id =>
            invalidVariables.add(tokens.meta.variables[id].id),
          );
        } else if (
          collection.name === 'global' &&
          collection.key !== resolvedExpectedCollectionKeys.global
        ) {
          collection.variableIds?.forEach(id =>
            invalidVariables.add(tokens.meta.variables[id].id),
          );
        }
      }
    });

    Object.keys(tokens.meta.variables).forEach(key => {
      const variable = tokens.meta.variables[key];
      Object.keys(variable.valuesByMode).forEach(j => {
        const modeValue = variable.valuesByMode[j];
        if (
          typeof modeValue === 'object' &&
          'id' in modeValue &&
          invalidVariables.has(modeValue.id)
        ) {
          console.error(
            `🛑 Invalid collection reference for value of: ${variable.name}.`,
            'Resolve reference error in Figma.',
          );
        }
      });
    });
  });

  if (invalidVariables.size) {
    return {
      status: 'failed',
      checkedRemoteCollections,
      invalidVariablesCount: invalidVariables.size,
      errorMessage:
        'Invalid references were found. Resolve reference errors in Figma.',
    };
  }

  return {
    status: 'passed',
    checkedRemoteCollections,
    invalidVariablesCount: 0,
  };
};

const TOKENS_DIR = 'tokens';
export const COPYRIGHT = 'Copyright Hewlett Packard Enterprise Development LP.';

export const getThemeFiles = (tokensDir = TOKENS_DIR) => {
  const tokenDirs = readdirSync(tokensDir, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

  const themes: { [key: string]: string[] } = {
    default: [],
    v1: [],
    v0: [],
  };

  const tokens = tokenDirs
    .map(dir =>
      readdirSync(`${tokensDir}/${dir}`).map(
        file => `${tokensDir}/${dir}/${file}`,
      ),
    )
    .flat();

  tokens.forEach(file => {
    if (!file.includes('v1') && !file.includes('v0')) themes.default.push(file);
    else if (file.includes('v1')) themes.v1.push(file);
    else if (file.includes('v0')) themes.v0.push(file);
  });

  themes.default.forEach(file => {
    const [fileName] = file.split('/').slice(-1);
    const collection = fileName.split('.')[0];
    const v1Exists = themes.v1.find(v1File => {
      const [v1FileName] = v1File.split('/').slice(-1);
      const v1Collection = v1FileName.split('.')[0];
      return v1Collection === collection;
    });
    if (!v1Exists) themes.v1.push(file);

    const v0Exists = themes.v0.find(v0File => {
      const [v0FileName] = v0File.split('/').slice(-1);
      const v0Collection = v0FileName.split('.')[0];
      return v0Collection === collection;
    });
    if (!v0Exists) themes.v0.push(file);
  });

  return themes;
};

export const filterColorTokens = (
  tokens: Record<string, unknown>,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  Object.keys(tokens).forEach(key => {
    const value = tokens[key];
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      const obj = value as Record<string, unknown>;
      if (obj.$type === 'color') {
        result[key] = value;
      } else {
        const nestedResult = filterColorTokens(obj);
        if (Object.keys(nestedResult).length > 0) {
          result[key] = nestedResult;
        }
      }
    }
  });

  return result;
};
