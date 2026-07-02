import * as fs from 'fs';
import * as path from 'path';

import {
  VariableCollection,
  Variable,
  ApiPostVariablesPayload,
  VariableValue,
  ApiGetLocalVariablesResponse,
  VariableChange,
  VariableCodeSyntax,
  VariableScope,
} from './figma_api.js';
import { colorApproximatelyEqual, parseColor } from './color.js';
import { areSetsEqual, excludedNameParts, isReference } from './utils.js';
import { Token, TokenOrTokenGroup, TokensFile } from './token_types.js';

type FlattenedTokens = {
  [tokenName: string]: Token;
};

type ShadowNumericValue = number | string;

type ShadowStep = {
  color: string;
  offsetX: ShadowNumericValue;
  offsetY: ShadowNumericValue;
  blur: ShadowNumericValue;
  spread: ShadowNumericValue;
  inset?: boolean | string;
};

type ShadowToken = Token & {
  $type: 'shadow';
  $value: string | ShadowStep | ShadowStep[];
};

type BorderStep = {
  width: ShadowNumericValue;
  color: string;
  style: string;
};

type BorderToken = Token & {
  $type: 'border';
  $value: BorderStep;
};

function shadowToVariables(name: string, values: ShadowStep): FlattenedTokens {
  const floatValue = (
    property: keyof Pick<ShadowStep, 'offsetX' | 'offsetY' | 'blur' | 'spread'>,
  ): Token => ({
    $value: values[property],
    $type: 'number',
    $extensions: {
      'com.figma': {
        hiddenFromPublishing: false,
        scopes: ['EFFECT_FLOAT' as VariableScope],
        codeSyntax: {},
      },
    },
  });

  const res: FlattenedTokens = {};
  res[`${name}/offsetX`] = floatValue('offsetX');
  res[`${name}/offsetY`] = floatValue('offsetY');
  res[`${name}/blur`] = floatValue('blur');
  res[`${name}/spread`] = floatValue('spread');
  res[`${name}/color`] = {
    $value: values.color,
    $type: 'color',
    $extensions: {
      'com.figma': {
        hiddenFromPublishing: false,
        scopes: ['EFFECT_COLOR' as VariableScope],
        codeSyntax: {},
      },
    },
  };
  if (values.inset) {
    res[`${name}/inset`] = {
      $value: values.inset,
      $type: 'boolean',
      $extensions: {
        'com.figma': {
          hiddenFromPublishing: true,
          scopes: undefined, // no scopes for boolean variables
          codeSyntax: {},
        },
      },
    };
  }

  return res;
}

function isShadowStep(value: unknown): value is ShadowStep {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return (
    'color' in value &&
    'offsetX' in value &&
    'offsetY' in value &&
    'blur' in value &&
    'spread' in value
  );
}

function transformShadow(name: string, token: ShadowToken): FlattenedTokens {
  const value = token.$value;

  // if shadow is referencing a shadow from the color collection,
  // we need to determine how many shadows exist and build up
  // the references for each shadow part
  if (typeof value === 'string' && isReference(value)) {
    // get that shadow from the global set to figure out how many shadows exist
    const raw = fs.readFileSync('./tokens/semantic/color.light.json');
    const parsed = JSON.parse(raw.toString()) as {
      shadow?: Record<string, { $value: ShadowStep | ShadowStep[] }>;
    };
    const shadowName = value.slice(1, -1).split('.')[1];
    const shadowRef = parsed.shadow?.[shadowName]?.$value;

    if (shadowRef === undefined) {
      throw new Error(`Invalid shadow reference: ${value}`);
    }

    const numShadows = Array.isArray(shadowRef) ? shadowRef.length : 1;
    const ref = value.slice(1, -1).split('.').join('/');

    return Array.from({ length: numShadows }, (_, index) => {
      const shadowIndex = index + 1;

      return shadowToVariables(`${name}/${shadowIndex}`, {
        color: `{${ref}/${shadowIndex}/color}`,
        offsetX: `{${ref}/${shadowIndex}/offsetX}`,
        offsetY: `{${ref}/${shadowIndex}/offsetY}`,
        blur: `{${ref}/${shadowIndex}/blur}`,
        spread: `{${ref}/${shadowIndex}/spread}`,
      });
    }).reduce<FlattenedTokens>(
      (tokens, shadowTokens) => ({ ...tokens, ...shadowTokens }),
      {},
    );
  }

  const shadowValues = Array.isArray(value) ? value : [value];

  return shadowValues.reduce<FlattenedTokens>((tokens, stepValue, index) => {
    if (!isShadowStep(stepValue)) {
      throw new Error(`Invalid shadow token value for ${name}`);
    }

    return {
      ...tokens,
      ...shadowToVariables(`${name}/${index + 1}`, stepValue),
    };
  }, {});
}

function borderToVariables(name: string, values: BorderStep): FlattenedTokens {
  const floatValue = (property: 'width'): Token => ({
    $type: 'number',
    $value: values[property],
    $extensions: {
      'com.figma': {
        hiddenFromPublishing: false,
        scopes: ['EFFECT_FLOAT' as VariableScope],
        codeSyntax: {},
      },
    },
  });

  const res: FlattenedTokens = {};
  res[`${name}/width`] = floatValue('width');
  res[`${name}/color`] = {
    $type: 'color',
    $value: values.color,
    $extensions: {
      'com.figma': {
        hiddenFromPublishing: false,
        scopes: ['EFFECT_COLOR' as VariableScope],
        codeSyntax: {},
      },
    },
  };
  res[`${name}/style`] = {
    $type: 'string',
    $value: values.style,
    $extensions: {
      'com.figma': {
        hiddenFromPublishing: false,
        scopes: [],
        codeSyntax: {},
      },
    },
  };

  return res;
}

function transformBorder(name: string, token: BorderToken): FlattenedTokens {
  return borderToVariables(name, token.$value);
}

export type FlattenedTokensByFile = {
  [fileName: string]: {
    [tokenName: string]: Token;
  };
};

export type AliasResolutionError = {
  code: 'ALIAS_NOT_FOUND' | 'ALIAS_COLLISION' | 'ALIAS_CROSS_TIER_INVALID';
  message: string;
  stage?: string;
  tokenPath: string;
  sourceFile: string;
  environment?: string;
  remediation: string;
};

type GeneratePostVariablesPayloadOptions = {
  aliasLookup?: Record<string, string>;
  stage?: string;
  environment?: string;
  onAliasResolutionError?: (error: AliasResolutionError) => void;
  plannedVariableIds?: Set<string>;
};

function fillTraverseCollection(
  tokens: FlattenedTokens,
  key: string,
  object: TokenOrTokenGroup,
) {
  const acc = tokens;

  // if key is a meta field, move on
  if (key.charAt(0) === '$') {
    return;
  }

  if (object.$value !== undefined) {
    if (object.$type === 'shadow') {
      Object.assign(acc, transformShadow(key, object as ShadowToken));
      return;
    }

    if (object.$type === 'border') {
      Object.assign(acc, transformBorder(key, object as BorderToken));
      return;
    }

    acc[key] = object;
    return;
  }

  Object.entries<TokenOrTokenGroup>(object).forEach(([key2, object2]) => {
    if (key2.charAt(0) === '$' || typeof object2 !== 'object') {
      return;
    }

    fillTraverseCollection(acc, `${key}/${key2}`, object2);
  });
}

function flattenTokensFile(tokensFile: TokensFile) {
  const flattenedTokens: FlattenedTokens = {};

  Object.entries(tokensFile).forEach(([tokenGroup, groupValues]) => {
    fillTraverseCollection(flattenedTokens, tokenGroup, groupValues);
  });

  return flattenedTokens;
}

function collectionAndModeFromFileName(fileName: string) {
  const fileNameParts = fileName.split('.');
  if (fileNameParts.length < 3) {
    throw new Error(
      `Invalid tokens file name: ${fileName}. File names must be ` +
        'in the format: {collectionName}.{modeName}.json',
    );
  }
  const [collectionName, modeName] = fileNameParts;
  return { collectionName, modeName };
}

export function readJsonFiles(files: string[]) {
  const tokensJsonByFile: FlattenedTokensByFile = {};
  const seenCollectionsAndModes = new Set<string>();

  files.forEach(file => {
    const baseFileName = path.basename(file);
    const { collectionName, modeName } =
      collectionAndModeFromFileName(baseFileName);

    if (seenCollectionsAndModes.has(`${collectionName}.${modeName}`)) {
      throw new Error(`Duplicate collection and mode in file: ${file}`);
    }

    seenCollectionsAndModes.add(`${collectionName}.${modeName}`);

    const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });

    if (!fileContent) {
      throw new Error(`Invalid tokens file: ${file}. File is empty.`);
    }

    const tokensFile: TokensFile = JSON.parse(fileContent);
    tokensJsonByFile[baseFileName] = flattenTokensFile(tokensFile);
  });

  return tokensJsonByFile;
}

function variableResolvedTypeFromToken(token: Token) {
  switch (token.$type) {
    case 'color':
      return 'COLOR';
    case 'number':
      return 'FLOAT';
    case 'string':
      return 'STRING';
    case 'boolean':
      return 'BOOLEAN';
    case 'shadow':
      // Not directly supported by Figma, so we flatten to parts.
      return 'SHADOW';
    case 'fontFamily':
      return 'STRING';
    case 'border':
      // Not directly supported by Figma, so we flatten to parts.
      return 'BORDER';
    // undefined since Figma Variables doesn't support yet
    case 'cubicBezier':
      return undefined;
    case 'duration':
      return undefined;
    case 'gradient':
      return undefined;
    default:
      throw new Error(`Invalid token $type: ${token.$type}`);
  }
}

function isAlias(value: string) {
  return value.toString().trim().charAt(0) === '{';
}

/**
 * When pushing to Figma, strip off "DEFAULT" and "REST" to match
 * simplified token outputs.
 * Also format nested roles, prominence, or interaction to a
 * hyphenated ("-") approach.
 * Example:
 * color/background/critical/weak/DEFAULT/REST becomes
 * color/background/critical-weak
 * @param alias
 */
const tokenAliasToFigmaAlias = (alias: string): string => {
  const exceptionColors = ['color/focus'];
  const isColor = /^color/.test(alias);
  let adjustedName = alias;

  if (isColor) {
    let parts = adjustedName.split('/');
    parts = parts.filter(part => !excludedNameParts.includes(part));
    let section = parts.slice(0, 2).join('/');
    let name = parts.slice(2).join('-');

    if (exceptionColors.includes(section)) {
      // If it's an exception color, the token hierarchy is one level
      // higher than others. Adjust the section and name accordingly.
      section = parts.slice(0, 1).join('/');
      name = parts.slice(1).join('-');
    }

    adjustedName = `${section}${name ? `/${name}` : ''}`;
  }
  return adjustedName;
};

export const normalizeAliasReference = (value: string): string => {
  return tokenAliasToFigmaAlias(
    value.trim().replace(/\./g, '/').replace(/[{}]/g, ''),
  );
};

function variableValueFromToken(
  token: Token,
  tokenPath: string,
  sourceFile: string,
  localVariablesByCollectionAndName: {
    [variableCollectionId: string]: { [variableName: string]: Variable };
  },
  options: GeneratePostVariablesPayloadOptions = {},
): VariableValue {
  if (typeof token.$value === 'string' && isAlias(token.$value)) {
    const value = normalizeAliasReference(token.$value);

    if (options.aliasLookup && options.aliasLookup[value]) {
      return {
        type: 'VARIABLE_ALIAS',
        id: options.aliasLookup[value],
      };
    }

    // When mapping aliases to existing local variables, we assume
    // variable names are unique across all collections in the file.
    // TO DO how will this work with our density token concept if there
    // are repeated
    // variable names for spacing.medium on breakpoint/density?
    const localAliasTarget = Object.values(
      localVariablesByCollectionAndName,
    ).find(localVariablesByName => localVariablesByName[value]);

    if (localAliasTarget?.[value]) {
      return {
        type: 'VARIABLE_ALIAS',
        id: localAliasTarget[value].id,
      };
    }

    if (
      options.aliasLookup &&
      options.onAliasResolutionError &&
      !options.plannedVariableIds?.has(value)
    ) {
      options.onAliasResolutionError({
        code: 'ALIAS_NOT_FOUND',
        message: `Alias target not found for "${value}"`,
        stage: options.stage,
        tokenPath,
        sourceFile,
        environment: options.environment,
        remediation:
          'Ensure dependent stage variables are synced and alias ' +
          'cache was refreshed before retrying.',
      });
    }

    // If we do not find a local variable matching the alias, assume it
    // is a variable that will be created elsewhere in the payload.
    // If the file has an invalid alias, rely on the Figma API to return
    // a 400 error.
    return {
      type: 'VARIABLE_ALIAS',
      id: value,
    };
  }

  if (typeof token.$value === 'string' && token.$type === 'color') {
    return parseColor(token.$value);
  }

  return token.$value;
}

function compareVariableValues(a: VariableValue, b: VariableValue) {
  if (typeof a === 'object' && typeof b === 'object') {
    if (
      'type' in a &&
      'type' in b &&
      a.type === 'VARIABLE_ALIAS' &&
      b.type === 'VARIABLE_ALIAS'
    ) {
      return a.id === b.id;
    }

    if ('r' in a && 'r' in b) {
      return colorApproximatelyEqual(a, b);
    }

    return false;
  }

  if (typeof a !== 'object' && typeof b !== 'object') {
    return a === b;
  }

  return false;
}

function isCodeSyntaxEqual(a: VariableCodeSyntax, b: VariableCodeSyntax) {
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every(
      key =>
        a[key as keyof VariableCodeSyntax] ===
        b[key as keyof VariableCodeSyntax],
    )
  );
}

/**
 * Get writable token properties that are different from the variable.
 * If the variable does not exist, all writable properties are returned.
 *
 * This function is being used to decide what properties to include in the
 * POST variables call to update variables in Figma. If a token does not have
 * a particular property, we do not include it in the differences object
 * to avoid touching that property in Figma.
 */
function tokenAndVariableDifferences(token: Token, variable: Variable | null) {
  const differences: Partial<
    Omit<
      VariableChange,
      'id' | 'name' | 'variableCollectionId' | 'resolvedType' | 'action'
    >
  > = {};

  if (
    token.$description !== undefined &&
    (!variable || token.$description !== variable.description)
  ) {
    differences.description = token.$description;
  }

  if (token.$extensions && token.$extensions['com.figma']) {
    const figmaExtensions = token.$extensions['com.figma'];

    if (
      figmaExtensions.hiddenFromPublishing !== undefined &&
      (!variable ||
        figmaExtensions.hiddenFromPublishing !== variable.hiddenFromPublishing)
    ) {
      differences.hiddenFromPublishing = figmaExtensions.hiddenFromPublishing;
    }

    if (
      figmaExtensions.scopes &&
      (!variable ||
        !areSetsEqual(
          new Set(figmaExtensions.scopes),
          new Set(variable.scopes),
        ))
    ) {
      differences.scopes = figmaExtensions.scopes;
    }

    if (
      figmaExtensions.codeSyntax &&
      (!variable ||
        !isCodeSyntaxEqual(figmaExtensions.codeSyntax, variable.codeSyntax))
    ) {
      differences.codeSyntax = figmaExtensions.codeSyntax;
    }
  }

  return differences;
}

export function generatePostVariablesPayload(
  tokensByFile: FlattenedTokensByFile,
  localVariables: ApiGetLocalVariablesResponse,
  options: GeneratePostVariablesPayloadOptions = {},
) {
  const localVariableCollectionsByName: { [name: string]: VariableCollection } =
    {};
  const localVariablesByCollectionAndName: {
    [variableCollectionId: string]: { [variableName: string]: Variable };
  } = {};

  // Pre-scan all tokens to collect variable IDs planned for creation/update.
  // This allows us to distinguish true missing aliases from same-payload refs.
  const plannedVariableIds = new Set<string>();
  Object.values(tokensByFile).forEach(tokens => {
    Object.keys(tokens).forEach(tokenName => {
      const adjustedName = tokenAliasToFigmaAlias(tokenName);
      plannedVariableIds.add(adjustedName);
    });
  });

  Object.values(localVariables.meta.variableCollections).forEach(collection => {
    // Skip over remote collections because we can't modify them
    if (collection.remote) {
      return;
    }

    if (localVariableCollectionsByName[collection.name]) {
      throw new Error(
        `Duplicate variable collection in file: ${collection.name}`,
      );
    }

    localVariableCollectionsByName[collection.name] = collection;
  });

  Object.values(localVariables.meta.variables).forEach(variable => {
    // Commenting the below out to accommodate separate Figma file structure
    // Skip over remote variables because we can't modify them
    // if (variable.remote) {
    //   return;
    // }

    if (!localVariablesByCollectionAndName[variable.variableCollectionId]) {
      localVariablesByCollectionAndName[variable.variableCollectionId] = {};
    }

    localVariablesByCollectionAndName[variable.variableCollectionId][
      variable.name
    ] = variable;
  });

  console.log(
    'Local variable collections in Figma file:',
    Object.keys(localVariableCollectionsByName),
  );

  // Merge user-provided plannedVariableIds with discovered ones.
  if (options.plannedVariableIds) {
    options.plannedVariableIds.forEach(id => {
      plannedVariableIds.add(id);
    });
  }

  const resolvedOptions = {
    ...options,
    plannedVariableIds,
  };

  const postVariablesPayload: ApiPostVariablesPayload = {
    variableCollections: [],
    variableModes: [],
    variables: [],
    variableModeValues: [],
  };

  Object.entries(tokensByFile).forEach(([fileName, tokens]) => {
    const { collectionName, modeName } =
      collectionAndModeFromFileName(fileName);

    const variableCollection = localVariableCollectionsByName[collectionName];
    // Use the actual variable collection id or use the name as the temporary id
    const variableCollectionId = variableCollection
      ? variableCollection.id
      : collectionName;
    const variableMode = variableCollection?.modes.find(
      mode => mode.name === modeName,
    );
    // Use the actual mode id or use the name as the temporary id
    const modeId = variableMode ? variableMode.modeId : modeName;

    if (
      !variableCollection &&
      !postVariablesPayload.variableCollections!.find(
        c => c.id === variableCollectionId,
      )
    ) {
      postVariablesPayload.variableCollections!.push({
        action: 'CREATE',
        id: variableCollectionId,
        name: variableCollectionId,
        initialModeId: modeId, // Use the initial mode as the first mode
      });

      // Rename the initial mode since we are using it as the first
      // mode in the collection.
      postVariablesPayload.variableModes!.push({
        action: 'UPDATE',
        id: modeId,
        name: modeId,
        variableCollectionId,
      });
    }

    // Add a new mode if it doesn't exist in the Figma file
    // and it's not the initial mode in the collection
    if (
      !variableMode &&
      !postVariablesPayload.variableCollections!.find(
        c => c.id === variableCollectionId && c.initialModeId === modeId,
      )
    ) {
      postVariablesPayload.variableModes!.push({
        action: 'CREATE',
        id: modeId,
        name: modeId,
        variableCollectionId,
      });
    }

    const localVariablesByName =
      localVariablesByCollectionAndName[variableCollection?.id] || {};

    Object.entries(tokens).forEach(([tokenName, token]) => {
      const adjustedName = tokenAliasToFigmaAlias(tokenName);

      const variable = localVariablesByName[adjustedName];
      const variableId = variable ? variable.id : adjustedName;
      const variableInPayload = postVariablesPayload.variables!.find(
        v =>
          v.id === variableId &&
          v.variableCollectionId === variableCollectionId,
      );
      const differences = tokenAndVariableDifferences(token, variable);

      const resolvedType = variableResolvedTypeFromToken(token);

      // Add a new variable if it doesn't exist in the Figma file,
      // and we haven't added it already in another mode
      if (!variable && !variableInPayload && resolvedType !== undefined) {
        postVariablesPayload.variables!.push({
          action: 'CREATE',
          id: variableId,
          name: adjustedName,
          variableCollectionId,
          resolvedType: variableResolvedTypeFromToken(token),
          ...differences,
        });
      } else if (variable && Object.keys(differences).length > 0) {
        postVariablesPayload.variables!.push({
          action: 'UPDATE',
          id: variableId,
          ...differences,
        });
      }

      const existingVariableValue =
        variable && variableMode ? variable.valuesByMode[modeId] : null;
      const newVariableValue = variableValueFromToken(
        token,
        tokenName,
        fileName,
        localVariablesByCollectionAndName,
        resolvedOptions,
      );

      // Only include the variable mode value in the payload if it is
      // different from the existing value.
      if (
        resolvedType &&
        (existingVariableValue === null ||
          !compareVariableValues(existingVariableValue, newVariableValue))
      ) {
        postVariablesPayload.variableModeValues!.push({
          variableId,
          modeId,
          value: newVariableValue,
        });
      }
    });
  });

  return postVariablesPayload;
}
