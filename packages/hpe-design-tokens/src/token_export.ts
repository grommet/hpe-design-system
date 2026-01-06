import { rgbToHex } from './color.js';
import { ApiGetLocalVariablesResponse, Variable } from './figma_api.js';
import { Token, TokensFile } from './token_types.js';
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
        const temp = aliasedName.replaceAll('-', '/').split('/');
        if (!exceptionColors.includes(temp.join('/'))) {
          // last element of name should be interaction
          if (
            !interactions.includes(temp[temp.length - 1]) ||
            aliasedName === 'color/focus'
          ) {
            temp.push('REST');
          }
          // second to last element of name should be prominence
          if (!prominences.includes(temp[temp.length - 2])) {
            temp.splice(temp.length - 1, 0, 'DEFAULT');
          }
        }
        aliasedName = temp.join('/');
      }
      return `{${aliasedName.replace(/\//g, '.')}}`;
    } else if ('r' in value) {
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
  const shadows: { [key: string]: any } = {};

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

      let obj: any = tokenFiles[fileName];

      // specific to "outline" but not something like "outlineOffset"
      if (/outline\//.test(variable.name)) {
        const parts = variable.name.split('/');
        const keyPath = parts.slice(0, -1);
        const property = parts[parts.length - 1];

        keyPath.forEach(groupName => {
          obj[groupName] = obj[groupName] || {};
          obj = obj[groupName];
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
        const outline = access(keyPath.join('.'), tokenFiles[fileName]);
        if (Object.keys(outline).length === 0) {
          Object.assign(obj, token);
        } else {
          const partialOutline = outline.$value;
          partialOutline[property] = tokenValueFromVariable(
            variable,
            mode.modeId,
            localVariables,
          );
        }
      } else if (variable.name.includes('boxShadow')) {
        const parts = variable.name.split('/');
        const keyPath = parts.slice(0, parts.indexOf('boxShadow') + 1);
        const property = parts[parts.length - 1];

        keyPath.forEach(groupName => {
          obj[groupName] = obj[groupName] || {};
          obj = obj[groupName];
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
        const boxShadow = access(keyPath.join('.'), tokenFiles[fileName]);
        if (Object.keys(boxShadow).length === 0) {
          Object.assign(obj, token);
          // if not a string reference
        } else if (typeof boxShadow.$value === 'object') {
          const index =
            parseInt(parts[parts.length - 3], 10) >= 0
              ? parseInt(parts[parts.length - 3], 10)
              : 0;
          const partialShadow = boxShadow.$value[index];
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
          const temp = variable.name.replaceAll('-', '/').split('/');
          if (!exceptionColors.includes(temp.join('/'))) {
            // last element of name should be interaction
            if (
              !interactions.includes(temp[temp.length - 1]) ||
              adjustedName === 'color/focus'
            ) {
              temp.push('REST');
            }
            // second to last element of name should be prominence
            if (!prominences.includes(temp[temp.length - 2])) {
              temp.splice(temp.length - 1, 0, 'DEFAULT');
            }
          }
          adjustedName = temp.join('/');
        }

        adjustedName.split('/').forEach(groupName => {
          obj[groupName] = obj[groupName] || {};
          obj = obj[groupName];
        });

        let token: Token;
        token = {
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
