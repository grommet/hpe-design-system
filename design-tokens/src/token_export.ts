import { rgbToHex } from './color.js';
import { ApiGetLocalVariablesResponse, Variable } from './figma_api.js';
import { Token, TokensFile } from './token_types.js';
import { access } from './utils.js';

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
      return `{${aliasedVariable.name.replace(/\//g, '.')}}`;
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
  shadows.shadow = {};
  const root = shadows.shadow; // TO DO this hard codes the concept of "shadow" in shadow naming

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

      if (variable.name.includes('outline')) {
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

        const token = {
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

        // if there isn't anything in the shadow yet, create the initial value array
        const boxShadow = access(keyPath.join('.'), tokenFiles[fileName]);
        if (Object.keys(boxShadow).length === 0) {
          Object.assign(obj, token);
        } else {
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
        if (!(shadow in root))
          root[shadow] = {
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
        else {
          // shadow/small/2/offsetY --> need index 1
          const index =
            parseInt(parts[parts.length - 3], 10) >= 0
              ? parseInt(parts[parts.length - 3], 10)
              : 0;
          const partialShadow = root[shadow].$value[index];
          partialShadow[property] = tokenValueFromVariable(
            variable,
            mode.modeId,
            localVariables,
          );
        }
        Object.assign(tokenFiles[fileName], { ...shadows });
      } else {
        variable.name.split('/').forEach(groupName => {
          obj[groupName] = obj[groupName] || {};
          obj = obj[groupName];
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
