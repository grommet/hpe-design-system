import { ApiGetLocalVariablesResponse } from './figma_api.js';

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

export const access = (path: string, object: { [key: string]: any }) => {
  return path.split('.').reduce((o, i) => o[i], object);
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
  'fontStack',
  'breakpoint',
  'fontWeight',
  'focusIndicator',
];

export const numberToPixel = (value: number): string => `${value}px`;

export const excludedNameParts = ['DEFAULT', 'REST'];
/**
 * Ensure variable references are to valid collections. Log errors for any variables that are referencing invalid Figma files.
 */
export const verifyReferences = (
  localTokens: ApiGetLocalVariablesResponse[],
) => {
  if (
    !process.env.FIGMA_PRIMITIVES_COLLECTION_KEY ||
    !process.env.FIGMA_GLOBAL_COLLECTION_KEY ||
    !process.env.FIGMA_COLOR_COLLECTION_KEY ||
    !process.env.FIGMA_DIMENSION_COLLECTION_KEY
  ) {
    throw new Error(
      'FIGMA_PRIMITIVES_COLLECTION_KEY, FIGMA_GLOBAL_COLLECTION_KEY, FIGMA_COLOR_COLLECTION_KEY, and FIGMA_DIMENSION_COLLECTION_KEY environment variables are required',
    );
  }
  const invalidVariables: string[] = [];
  localTokens.forEach(tokens => {
    Object.keys(tokens.meta.variableCollections).forEach(key => {
      const collection = tokens.meta.variableCollections[key];
      if (collection.remote === true) {
        if (
          collection.name === 'color' &&
          collection.key !== process.env['FIGMA_COLOR_COLLECTION_KEY']
        ) {
          collection.variableIds.forEach(id =>
            invalidVariables.push(tokens.meta.variables[id].id),
          );
        } else if (
          collection.name === 'dimension' &&
          collection.key !== process.env['FIGMA_DIMENSION_COLLECTION_KEY']
        ) {
          collection.variableIds.forEach(id =>
            invalidVariables.push(tokens.meta.variables[id].id),
          );
        } else if (
          collection.name === 'primitives' &&
          collection.key !== process.env['FIGMA_PRIMITIVES_COLLECTION_KEY']
        ) {
          collection.variableIds.forEach(id =>
            invalidVariables.push(tokens.meta.variables[id].id),
          );
        } else if (
          collection.name === 'global' &&
          collection.key !== process.env['FIGMA_GLOBAL_COLLECTION_KEY']
        ) {
          collection.variableIds.forEach(id =>
            invalidVariables.push(tokens.meta.variables[id].id),
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
          invalidVariables.includes(modeValue.id)
        ) {
          console.error(
            `🛑 Invalid collection reference for value of: ${variable.name}. Resolve reference error in Figma.`,
          );
        }
      });
    });
  });
  if (invalidVariables.length)
    throw new Error(
      'Invalid references were found. Resolve reference errors in Figma.',
    );
};
