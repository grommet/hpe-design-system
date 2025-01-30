import { readdirSync } from 'fs';
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
  'container',
  'icon',
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

const TOKENS_DIR = 'tokens';

export const getThemeFiles = (tokensDir = TOKENS_DIR) => {
  const tokenDirs = readdirSync(tokensDir, { withFileTypes: true })
    .filter((dir: any) => dir.isDirectory())
    .map((dir: any) => dir.name);

  const themes: { [key: string]: string[] } = {
    default: [],
    v1: [],
  };

  const tokens = tokenDirs
    .map(dir =>
      readdirSync(`${tokensDir}/${dir}`).map(
        file => `${tokensDir}/${dir}/${file}`,
      ),
    )
    .flat();

  tokens.forEach(file => {
    if (!file.includes('v1')) themes.default.push(file);
    else themes.v1.push(file);
  });

  themes.default.forEach(file => {
    let [fileName] = file.split('/').slice(-1);
    const collection = fileName.split('.')[0];
    const exists = themes.v1.find(file => {
      let [v1FileName] = file.split('/').slice(-1);
      const v1Collection = v1FileName.split('.')[0];
      return v1Collection === collection;
    });
    if (!exists) themes.v1.push(file);
  });

  return themes;
};
