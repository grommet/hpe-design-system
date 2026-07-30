/* eslint-disable max-len */
import { rgbToHex } from './color.js';
import { ApiGetLocalVariablesResponse, Variable } from './figma_api.js';
import { ExportShadowToken, Token, TokensFile } from './token_types.js';
import { access, isReference } from './utils.js';

/**
 * Supported color interaction states
 */
const interactions = ['hover', 'focus', 'active'];
/**
 * Supported color prominence modifiers
 */
const prominences = ['xweak', 'weak', 'default', 'strong', 'xstrong'];
const exceptionColors = ['color/focus/support', 'color/transparent'];

function colorNameToHierarchyParts(colorVariableName: string): string[] {
  const parts = colorVariableName.split('/');

  if (parts[0] !== 'color') {
    return parts;
  }

  if (parts[1] === 'background' && parts[2] === 'accent') {
    const section = parts.slice(0, 3);
    const tail = parts.slice(3).join('-');
    if (!tail) {
      return section;
    }

    const tailParts = tail.split('-');
    const interactionCandidate = tailParts[tailParts.length - 1];
    const hasInteraction = interactions.includes(interactionCandidate);
    const prominenceIndex = hasInteraction
      ? tailParts.length - 2
      : tailParts.length - 1;
    const prominenceCandidate = tailParts[prominenceIndex];

    if (!prominenceCandidate || !prominences.includes(prominenceCandidate)) {
      return [...section, tail];
    }

    const colorNameParts = tailParts.slice(0, prominenceIndex);
    const colorName = colorNameParts.join('-');
    if (!colorName) {
      return [...section, tail];
    }

    const normalized = [...section, colorName, prominenceCandidate];
    if (hasInteraction) {
      normalized.push(interactionCandidate);
    }

    return normalized;
  }

  return colorVariableName.replaceAll('-', '/').split('/');
}

function normalizeColorVariableNameFromFigma(
  colorVariableName: string,
): string {
  const temp = colorNameToHierarchyParts(colorVariableName);
  if (!exceptionColors.includes(temp.join('/'))) {
    // last element of name should be interaction
    // Added exception for color/focus so that REST gets
    // added, issue to revisit this here:
    // https://github.com/grommet/hpe-design-system/issues/5676
    if (
      !interactions.includes(temp[temp.length - 1]) ||
      temp.join('/') === 'color/focus'
    ) {
      temp.push('REST');
    }
    // second to last element of name should be prominence
    if (!prominences.includes(temp[temp.length - 2])) {
      temp.splice(temp.length - 1, 0, 'DEFAULT');
    }
  }

  return temp.join('/');
}

type ShadowsByMode = Record<string, Record<string, ExportShadowToken>>;

function tokenTypeFromVariable(variable: Variable) {
  if (variable.resolvedType === 'STRING' && variable.name.includes('fontStack'))
    return 'fontFamily';
  switch (variable.resolvedType) {
    case 'BOOLEAN':
      return 'boolean';
    case 'COLOR':
      return 'color';
    case 'FLOAT':
      return 'number';
    case 'STRING':
      return 'string';
    default:
      throw new Error('No token type was defined.');
  }
}

function tokenValueFromVariable(
  variable: Variable,
  modeId: string,
  localVariables: { [id: string]: Variable },
) {
  const value = variable.valuesByMode[modeId];
  if (typeof value === 'object') {
    if ('type' in value && value.type === 'VARIABLE_ALIAS') {
      const aliasedVariable = localVariables[value.id];
      let aliasedName = aliasedVariable.name;
      if (
        aliasedVariable.resolvedType === 'COLOR' &&
        /^color/.test(aliasedName)
      ) {
        aliasedName = normalizeColorVariableNameFromFigma(aliasedName);
      }
      return `{${aliasedName.replace(/\//g, '.')}}`;
    }

    if ('r' in value) {
      return rgbToHex(value);
    }

    throw new Error(`Format of variable value is invalid: ${value}`);
  } else {
    return value;
  }
}

export function tokenFilesFromLocalVariables(
  localVariablesResponse: ApiGetLocalVariablesResponse,
) {
  const tokenFiles: { [fileName: string]: TokensFile } = {};
  const localVariableCollections =
    localVariablesResponse.meta.variableCollections;
  const localVariables = localVariablesResponse.meta.variables;
  const shadows: ShadowsByMode = {};

  Object.values(localVariables).forEach(variable => {
    // Skip remote variables because we only want to generate tokens for local variables
    if (variable.remote) {
      return;
    }

    const collection = localVariableCollections[variable.variableCollectionId];

    collection.modes.forEach(mode => {
      const fileName = `${collection.name}.${mode.name}.json`;
      if (!tokenFiles[fileName]) {
        tokenFiles[fileName] = {};
      }

      let obj = tokenFiles[fileName] as Record<string, unknown>;

      // specific to "outline" but not something like "outlineOffset"
      if (/outline\//.test(variable.name)) {
        const parts = variable.name.split('/');
        const keyPath = parts.slice(0, -1);
        const property = parts[parts.length - 1];

        keyPath.forEach(groupName => {
          obj[groupName] = (obj[groupName] as Record<string, unknown>) || {};
          obj = obj[groupName] as Record<string, unknown>;
        });
        const token = {
          $type: 'border',
          $value: {
            [property]: tokenValueFromVariable(
              variable,
              mode.modeId,
              localVariables,
            ),
          },
          $description: '',
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: true,
              scopes: [],
              codeSyntax: {},
            },
          },
        };
        const outline = access<Record<string, unknown>>(
          keyPath.join('.'),
          tokenFiles[fileName] as Record<string, unknown>,
        );
        if (Object.keys(outline).length === 0) {
          Object.assign(obj, token);
        } else {
          const partialOutline = outline.$value as Record<string, unknown>;
          partialOutline[property] = tokenValueFromVariable(
            variable,
            mode.modeId,
            localVariables,
          );
        }
      } else if (variable.name.includes('boxShadow')) {
        const parts = variable.name.split('/');
        const boxShadowIndex = parts.indexOf('boxShadow');
        const keyPath = parts.slice(0, boxShadowIndex + 1);
        const property = parts[parts.length - 1];
        const parsedStep = parseInt(parts[boxShadowIndex + 1], 10);
        const stepIndex =
          Number.isInteger(parsedStep) && parsedStep > 0 ? parsedStep - 1 : 0;

        keyPath.forEach(groupName => {
          obj[groupName] = (obj[groupName] as Record<string, unknown>) || {};
          obj = obj[groupName] as Record<string, unknown>;
        });

        let value = tokenValueFromVariable(
          variable,
          mode.modeId,
          localVariables,
        );
        if (typeof value === 'string' && value.includes('shadow')) {
          // convert {shadow.small.1.offsetY} --> {shadow.small}
          value = `{${value.slice(1, -1).split('.').slice(0, -2).join('.')}}`;
        }

        const token = {
          $type: 'shadow',
          $value:
            typeof value === 'string' && isReference(value)
              ? value
              : [
                  {
                    [property]: value,
                  },
                ],
          $description: '',
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: false,
              scopes: ['ALL_SCOPES'],
              codeSyntax: {},
            },
          },
        };

        // if there isn't anything in the shadow yet, create the initial value array
        const boxShadow = access<Record<string, unknown>>(
          keyPath.join('.'),
          tokenFiles[fileName] as Record<string, unknown>,
        );
        if (Object.keys(boxShadow).length === 0) {
          if (typeof token.$value === 'string') {
            Object.assign(obj, token);
          } else {
            const initialValues: Array<Record<string, unknown>> = [];
            initialValues[stepIndex] = {
              [property]: value,
            };
            Object.assign(obj, {
              ...token,
              $value: initialValues,
            });
          }
          // if not a string reference
        } else if (Array.isArray(boxShadow.$value)) {
          const partialShadow =
            (boxShadow.$value[stepIndex] as Record<string, unknown>) || {};
          boxShadow.$value[stepIndex] = partialShadow;
          partialShadow[property] = tokenValueFromVariable(
            variable,
            mode.modeId,
            localVariables,
          );
        }
      } else if (/^shadow/.test(variable.name)) {
        const parts = variable.name.split('/');
        const shadow = parts.slice(1, 2).join('');
        const property = parts[parts.length - 1];
        if (!(mode.modeId in shadows)) {
          shadows[mode.modeId] = {};
        }
        if (!(shadow in shadows[mode.modeId])) {
          shadows[mode.modeId][shadow] = {
            $type: 'shadow',
            $value: [
              {
                [property]: tokenValueFromVariable(
                  variable,
                  mode.modeId,
                  localVariables,
                ),
              },
            ],
            $description: '',
            $extensions: {
              'com.figma': {
                hiddenFromPublishing: false,
                scopes: ['ALL_SCOPES'],
                codeSyntax: {},
              },
            },
          };
        } else {
          // shadow/small/2/offsetY --> need index 1
          const index =
            parseInt(parts[parts.length - 3], 10) >= 0
              ? parseInt(parts[parts.length - 3], 10)
              : 0;
          const partialShadow = shadows[mode.modeId][shadow].$value[index];
          partialShadow[property] = tokenValueFromVariable(
            variable,
            mode.modeId,
            localVariables,
          );
        }
        Object.assign(tokenFiles[fileName], {
          ...{ shadow: shadows[mode.modeId] }, // TO DO this hard codes naming concept of "shadow"
        });
      } else {
        const isColor = /^color/.test(variable.name);
        let adjustedName = variable.name;
        // When pulling from Figma, we should fill out "DEFAULT" and "REST"
        // to align to design token spec
        // e.g. color/background/critical --> color/background/critical/DEFAULT/REST
        if (isColor) {
          adjustedName = normalizeColorVariableNameFromFigma(variable.name);
        }

        adjustedName.split('/').forEach(groupName => {
          obj[groupName] = (obj[groupName] as Record<string, unknown>) || {};
          obj = obj[groupName] as Record<string, unknown>;
        });

        const token: Token = {
          $type: tokenTypeFromVariable(variable),
          $value: tokenValueFromVariable(variable, mode.modeId, localVariables),
          $description: variable.description,
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: variable.hiddenFromPublishing,
              scopes: variable.scopes,
              codeSyntax: variable.codeSyntax,
            },
          },
        };

        Object.assign(obj, token);
      }
    });
  });

  return tokenFiles;
}
