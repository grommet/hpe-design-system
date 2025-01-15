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
} from './figma_api.js';
import { colorApproximatelyEqual, parseColor } from './color.js';
import { areSetsEqual, excludedNameParts } from './utils.js';
import { Token, TokenOrTokenGroup, TokensFile } from './token_types.js';

const shadowToVariables = (name: any, values: any) => {
  const floatValue = (property: any) => ({
    $value: values[property],
    $type: 'number',
    $extensions: {
      'com.figma': {
        hiddenFromPublishing: false,
        scopes: ['EFFECT_FLOAT'],
        codeSyntax: {},
      },
    },
  });

  const res: { [key: string]: any } = {};
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
        scopes: ['EFFECT_COLOR'],
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
};

const transformShadow = (name: string, token: any) => {
  let tokens = {};
  const value = token['$value'];
  const shadowValues = !Array.isArray(value) ? [value] : value;

  // loop through shadows and add the index to the name
  for (const [index, stepValue] of shadowValues.entries()) {
    tokens = {
      ...tokens,
      ...shadowToVariables(`${name}/${index + 1}`, stepValue),
    };
  }

  return tokens;
};

const borderToVariables = (name: any, values: any) => {
  const floatValue = (property: any) => ({
    $type: 'number',
    $value: values[property],
    $extensions: {
      'com.figma': {
        hiddenFromPublishing: false,
        scopes: ['EFFECT_FLOAT'],
        codeSyntax: {},
      },
    },
  });

  const res: { [key: string]: any } = {};
  res[`${name}/width`] = floatValue('width');
  res[`${name}/color`] = {
    $type: 'color',
    $value: values.color,
    $extensions: {
      'com.figma': {
        hiddenFromPublishing: false,
        scopes: ['EFFECT_COLOR'],
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
};

const transformBorder = (name: string, token: any) => {
  let tokens = {};
  const value = token['$value'];
  tokens = {
    ...tokens,
    ...borderToVariables(name, value),
  };

  return tokens;
};
export type FlattenedTokensByFile = {
  [fileName: string]: {
    [tokenName: string]: Token;
  };
};

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

function flattenTokensFile(tokensFile: TokensFile) {
  const flattenedTokens: { [tokenName: string]: Token } = {};

  Object.entries(tokensFile).forEach(([tokenGroup, groupValues]) => {
    traverseCollection({
      key: tokenGroup,
      object: groupValues,
      tokens: flattenedTokens,
    });
  });

  return flattenedTokens;
}

function traverseCollection({
  key,
  object,
  tokens,
}: {
  key: string;
  object: TokenOrTokenGroup;
  tokens: { [tokenName: string]: Token };
}) {
  // if key is a meta field, move on
  if (key.charAt(0) === '$') {
    return;
  }

  if (object.$value !== undefined) {
    if (object.$type === 'shadow') {
      const shadowTokens: { [key: string]: any } = transformShadow(key, object);
      Object.keys(shadowTokens).forEach(shadowToken => {
        tokens[shadowToken] = shadowTokens[shadowToken];
      });
    } else if (object.$type === 'border') {
      const borderTokens: { [key: string]: any } = transformBorder(key, object);
      Object.keys(borderTokens).forEach(borderToken => {
        tokens[borderToken] = borderTokens[borderToken];
      });
    } else tokens[key] = object;
  } else {
    Object.entries<TokenOrTokenGroup>(object).forEach(([key2, object2]) => {
      if (key2.charAt(0) !== '$' && typeof object2 === 'object') {
        traverseCollection({
          key: `${key}/${key2}`,
          object: object2,
          tokens,
        });
      }
    });
  }
}

function collectionAndModeFromFileName(fileName: string) {
  const fileNameParts = fileName.split('.');
  if (fileNameParts.length < 3) {
    throw new Error(
      `Invalid tokens file name: ${fileName}. File names must be in the format: {collectionName}.{modeName}.json`,
    );
  }
  const [collectionName, modeName] = fileNameParts;
  return { collectionName, modeName };
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
      return 'SHADOW'; // not directly supported by Figma, so we flatten to parts
    case 'fontFamily':
      return 'STRING';
    case 'border':
      return 'BORDER'; // not directly supported by Figma, so we flatten to parts
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

function variableValueFromToken(
  token: Token,
  localVariablesByCollectionAndName: {
    [variableCollectionId: string]: { [variableName: string]: Variable };
  },
): VariableValue {
  if (typeof token.$value === 'string' && isAlias(token.$value)) {
    // Assume aliases are in the format {group.subgroup.token} with any number of optional groups/subgroups
    // The Figma syntax for variable names is: group/subgroup/token
    const value = token.$value
      .trim()
      .replace(/\./g, '/')
      .replace(/[\{\}]/g, '')
      .split('/')
      .filter(part => !excludedNameParts.includes(part))
      .join('/');

    // When mapping aliases to existing local variables, we assume that variable names
    // are unique *across all collections* in the Figma file
    // TO DO how will this work with our density token concept is there are repeated
    // variable names for spacing.medium on breakpoint/density?
    for (const localVariablesByName of Object.values(
      localVariablesByCollectionAndName,
    )) {
      if (localVariablesByName[value]) {
        return {
          type: 'VARIABLE_ALIAS',
          id: localVariablesByName[value].id,
        };
      }
    }

    // If we don't find a local variable matching the alias, we assume it's a variable
    // that we're going to create elsewhere in the payload.
    // If the file has an invalid alias, we rely on the Figma API to return a 400 error
    return {
      type: 'VARIABLE_ALIAS',
      id: value,
    };
  } else if (typeof token.$value === 'string' && token.$type === 'color') {
    return parseColor(token.$value);
  } else {
    return token.$value;
  }
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
    } else if ('r' in a && 'r' in b) {
      return colorApproximatelyEqual(a, b);
    }
  } else {
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
 * a particular property, we do not include it in the differences object to avoid
 * touching that property in Figma.
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
) {
  const localVariableCollectionsByName: { [name: string]: VariableCollection } =
    {};
  const localVariablesByCollectionAndName: {
    [variableCollectionId: string]: { [variableName: string]: Variable };
  } = {};

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

      // Rename the initial mode, since we're using it as our first mode in the collection
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
      const isColor = /^color/.test(tokenName);
      // When pushing to Figma, we should strip off "DEFAULT" and "REST"
      // to match simplified token outputs
      // we should also format nested roles, prominence, or interaction to hyphenated ("-") approach
      // e.g. color/background/critical/weak/DEFAULT/REST --> color/background/critical-weak
      let adjustedName = tokenName;
      if (isColor) {
        let parts = tokenName.split('/');
        parts = parts.filter(part => !excludedNameParts.includes(part));
        const section = parts.slice(0, 2).join('/');
        const name = parts.slice(2).join('-');
        adjustedName = `${section}${name ? `/${name}` : ''}`;
      }

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
          name: tokenName,
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
        localVariablesByCollectionAndName,
      );

      // Only include the variable mode value in the payload if it's different from the existing value
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
