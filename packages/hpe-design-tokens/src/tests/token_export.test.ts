import { describe, expect, it } from 'vitest';
import { ApiGetLocalVariablesResponse } from '../figma_api.js';
import { tokenFilesFromLocalVariables } from '../token_export.js';

describe('tokenFilesFromLocalVariables', () => {
  it('ignores remote variables', () => {
    const localVariablesResponse: ApiGetLocalVariablesResponse = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {
          'VariableCollectionId:1:1': {
            id: 'VariableCollectionId:1:1',
            name: 'primitives',
            modes: [{ modeId: '1:0', name: 'mode1' }],
            defaultModeId: '1:0',
            remote: true,
            hiddenFromPublishing: false,
          },
        },
        variables: {
          'VariableID:2:1': {
            id: 'VariableID:2:1',
            name: 'spacing/1',
            key: 'variable_key',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': 8,
            },
            remote: true,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
    };

    const tokenFiles = tokenFilesFromLocalVariables(localVariablesResponse);
    expect(tokenFiles).toEqual({});
  });

  it('returns token files', () => {
    const localVariablesResponse: ApiGetLocalVariablesResponse = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {
          'VariableCollectionId:1:1': {
            id: 'VariableCollectionId:1:1',
            name: 'primitives',
            modes: [
              { modeId: '1:0', name: 'mode1' },
              { modeId: '1:1', name: 'mode2' },
            ],
            defaultModeId: '1:0',
            remote: false,
            hiddenFromPublishing: false,
          },
        },
        variables: {
          'VariableID:2:1': {
            id: 'VariableID:2:1',
            name: 'spacing/1',
            key: 'variable_key',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': 8,
              '1:1': 8,
            },
            remote: false,
            description: '8px spacing',
            hiddenFromPublishing: true,
            scopes: ['TEXT_CONTENT'],
            codeSyntax: { WEB: 'web', ANDROID: 'android' },
          },
          'VariableID:2:2': {
            id: 'VariableID:2:2',
            name: 'spacing/2',
            key: 'variable_key2',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': 16,
              '1:1': 16,
            },
            remote: false,
            description: '16px spacing',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:2:3': {
            id: 'VariableID:2:3',
            name: 'color/brand/radish',
            key: 'variable_key3',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'COLOR',
            valuesByMode: {
              '1:0': {
                r: 1,
                g: 0.7450980392156863,
                b: 0.08627450980392157,
                a: 1,
              },
              '1:1': {
                r: 1,
                g: 0.796078431372549,
                b: 0.7176470588235294,
                a: 1,
              },
            },
            remote: false,
            description: 'Radish color',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:2:4': {
            id: 'VariableID:2:4',
            name: 'color/brand/pear',
            key: 'variable_key4',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'COLOR',
            valuesByMode: {
              '1:0': { r: 1, g: 0, b: 0.08627450980392157, a: 1 },
              '1:1': {
                r: 0.8705882352941177,
                g: 0.9529411764705882,
                b: 0.34509803921568627,
                a: 1,
              },
            },
            remote: false,
            description: 'Pear color',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
    };

    const tokenFiles = tokenFilesFromLocalVariables(localVariablesResponse);

    expect(tokenFiles['primitives.mode1.json']).toEqual({
      spacing: {
        '1': {
          $type: 'number',
          $value: 8,
          $description: '8px spacing',
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: true,
              scopes: ['TEXT_CONTENT'],
              codeSyntax: { WEB: 'web', ANDROID: 'android' },
            },
          },
        },
        '2': {
          $type: 'number',
          $value: 16,
          $description: '16px spacing',
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: false,
              scopes: ['ALL_SCOPES'],
              codeSyntax: {},
            },
          },
        },
      },
      color: {
        brand: {
          radish: {
            DEFAULT: {
              REST: {
                $type: 'color',
                $value: '#ffbe16',
                $description: 'Radish color',
                $extensions: {
                  'com.figma': {
                    hiddenFromPublishing: false,
                    scopes: ['ALL_SCOPES'],
                    codeSyntax: {},
                  },
                },
              },
            },
          },
          pear: {
            DEFAULT: {
              REST: {
                $type: 'color',
                $value: '#ff0016',
                $description: 'Pear color',
                $extensions: {
                  'com.figma': {
                    hiddenFromPublishing: false,
                    scopes: ['ALL_SCOPES'],
                    codeSyntax: {},
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(tokenFiles['primitives.mode2.json']).toEqual({
      spacing: {
        '1': {
          $type: 'number',
          $value: 8,
          $description: '8px spacing',
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: true,
              scopes: ['TEXT_CONTENT'],
              codeSyntax: { WEB: 'web', ANDROID: 'android' },
            },
          },
        },
        '2': {
          $type: 'number',
          $value: 16,
          $description: '16px spacing',
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: false,
              scopes: ['ALL_SCOPES'],
              codeSyntax: {},
            },
          },
        },
      },
      color: {
        brand: {
          radish: {
            DEFAULT: {
              REST: {
                $type: 'color',
                $value: '#ffcbb7',
                $description: 'Radish color',
                $extensions: {
                  'com.figma': {
                    hiddenFromPublishing: false,
                    scopes: ['ALL_SCOPES'],
                    codeSyntax: {},
                  },
                },
              },
            },
          },
          pear: {
            DEFAULT: {
              REST: {
                $type: 'color',
                $value: '#def358',
                $description: 'Pear color',
                $extensions: {
                  'com.figma': {
                    hiddenFromPublishing: false,
                    scopes: ['ALL_SCOPES'],
                    codeSyntax: {},
                  },
                },
              },
            },
          },
        },
      },
    });
  });

  it('handles aliases', () => {
    const localVariablesResponse: ApiGetLocalVariablesResponse = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {
          'VariableCollectionId:1:1': {
            id: 'VariableCollectionId:1:1',
            name: 'collection1',
            modes: [
              { modeId: '1:0', name: 'mode1' },
              { modeId: '1:1', name: 'mode2' },
            ],
            defaultModeId: '1:0',
            remote: false,
            hiddenFromPublishing: false,
          },
        },
        variables: {
          'VariableID:2:1': {
            id: 'VariableID:2:1',
            name: 'var1',
            key: 'variable_key1',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': 1,
            },
            remote: false,
            description: 'var1 description',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:2:2': {
            id: 'VariableID:2:2',
            name: 'var2',
            key: 'variable_key2',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': { type: 'VARIABLE_ALIAS', id: 'VariableID:2:1' },
            },
            remote: false,
            description: 'var2 description',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
    };

    const tokenFiles = tokenFilesFromLocalVariables(localVariablesResponse);

    expect(tokenFiles['collection1.mode1.json']).toEqual({
      var1: {
        $type: 'number',
        $value: 1,
        $description: 'var1 description',
        $extensions: {
          'com.figma': {
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
      var2: {
        $type: 'number',
        $value: '{var1}',
        $description: 'var2 description',
        $extensions: {
          'com.figma': {
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
    });
  });

  it('merges boxShadow properties by step index', () => {
    const localVariablesResponse: ApiGetLocalVariablesResponse = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {
          'VariableCollectionId:1:1': {
            id: 'VariableCollectionId:1:1',
            name: 'component',
            modes: [{ modeId: '1:0', name: 'mode1' }],
            defaultModeId: '1:0',
            remote: false,
            hiddenFromPublishing: false,
          },
        },
        variables: {
          'VariableID:2:1': {
            id: 'VariableID:2:1',
            name: 'panel/boxShadow/1/offsetX',
            key: 'variable_key1',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': 1,
            },
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:2:2': {
            id: 'VariableID:2:2',
            name: 'panel/boxShadow/1/offsetY',
            key: 'variable_key2',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': 2,
            },
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:2:3': {
            id: 'VariableID:2:3',
            name: 'panel/boxShadow/1/color',
            key: 'variable_key3',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'COLOR',
            valuesByMode: {
              '1:0': { r: 0, g: 0, b: 0, a: 1 },
            },
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:2:4': {
            id: 'VariableID:2:4',
            name: 'panel/boxShadow/2/offsetX',
            key: 'variable_key4',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': 3,
            },
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:2:5': {
            id: 'VariableID:2:5',
            name: 'panel/boxShadow/2/blur',
            key: 'variable_key5',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': 4,
            },
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:2:6': {
            id: 'VariableID:2:6',
            name: 'panel/boxShadow/2/color',
            key: 'variable_key6',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'COLOR',
            valuesByMode: {
              '1:0': { r: 1, g: 1, b: 1, a: 1 },
            },
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
    };

    const tokenFiles = tokenFilesFromLocalVariables(localVariablesResponse);

    expect(tokenFiles['component.mode1.json']).toEqual({
      panel: {
        boxShadow: {
          $type: 'shadow',
          $value: [
            {
              offsetX: 1,
              offsetY: 2,
              color: '#000000',
            },
            {
              offsetX: 3,
              blur: 4,
              color: '#ffffff',
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
        },
      },
    });
  });

  it('merges outline properties and preserves extensions across modes', () => {
    const localVariablesResponse: ApiGetLocalVariablesResponse = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {
          'VariableCollectionId:1:1': {
            id: 'VariableCollectionId:1:1',
            name: 'component',
            modes: [
              { modeId: '1:0', name: 'mode1' },
              { modeId: '1:1', name: 'mode2' },
            ],
            defaultModeId: '1:0',
            remote: false,
            hiddenFromPublishing: false,
          },
        },
        variables: {
          'VariableID:3:1': {
            id: 'VariableID:3:1',
            name: 'focusIndicator/outline/width',
            key: 'variable_key7',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'FLOAT',
            valuesByMode: {
              '1:0': 1,
              '1:1': 2,
            },
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:3:2': {
            id: 'VariableID:3:2',
            name: 'focusIndicator/outline/style',
            key: 'variable_key8',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'STRING',
            valuesByMode: {
              '1:0': 'solid',
              '1:1': 'dashed',
            },
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:3:3': {
            id: 'VariableID:3:3',
            name: 'focusIndicator/outline/color',
            key: 'variable_key9',
            variableCollectionId: 'VariableCollectionId:1:1',
            resolvedType: 'COLOR',
            valuesByMode: {
              '1:0': { r: 0, g: 0, b: 0, a: 1 },
              '1:1': { r: 1, g: 1, b: 1, a: 1 },
            },
            remote: false,
            description: '',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
    };

    const tokenFiles = tokenFilesFromLocalVariables(localVariablesResponse);

    expect(tokenFiles['component.mode1.json']).toEqual({
      focusIndicator: {
        outline: {
          $type: 'border',
          $value: {
            width: 1,
            style: 'solid',
            color: '#000000',
          },
          $description: '',
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: true,
              scopes: [],
              codeSyntax: {},
            },
          },
        },
      },
    });

    expect(tokenFiles['component.mode2.json']).toEqual({
      focusIndicator: {
        outline: {
          $type: 'border',
          $value: {
            width: 2,
            style: 'dashed',
            color: '#ffffff',
          },
          $description: '',
          $extensions: {
            'com.figma': {
              hiddenFromPublishing: true,
              scopes: [],
              codeSyntax: {},
            },
          },
        },
      },
    });
  });

  it('maps accent background variable names to nested token hierarchy', () => {
    const localVariablesResponse: ApiGetLocalVariablesResponse = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {
          'VariableCollectionId:4:1': {
            id: 'VariableCollectionId:4:1',
            name: 'semantic',
            modes: [{ modeId: '4:0', name: 'dark' }],
            defaultModeId: '4:0',
            remote: false,
            hiddenFromPublishing: false,
          },
        },
        variables: {
          'VariableID:4:1': {
            id: 'VariableID:4:1',
            name: 'color/background/accent/purple-strong',
            key: 'variable_key_41',
            variableCollectionId: 'VariableCollectionId:4:1',
            resolvedType: 'COLOR',
            valuesByMode: {
              '4:0': { r: 1, g: 0, b: 0, a: 1 },
            },
            remote: false,
            description: 'Accent purple strong',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
          'VariableID:4:2': {
            id: 'VariableID:4:2',
            name: 'color/background/accent/purple-strong-hover',
            key: 'variable_key_42',
            variableCollectionId: 'VariableCollectionId:4:1',
            resolvedType: 'COLOR',
            valuesByMode: {
              '4:0': { r: 0, g: 1, b: 0, a: 1 },
            },
            remote: false,
            description: 'Accent purple strong hover',
            hiddenFromPublishing: false,
            scopes: ['ALL_SCOPES'],
            codeSyntax: {},
          },
        },
      },
    };

    const tokenFiles = tokenFilesFromLocalVariables(localVariablesResponse);

    expect(tokenFiles['semantic.dark.json']).toEqual({
      color: {
        background: {
          accent: {
            purple: {
              strong: {
                REST: {
                  $type: 'color',
                  $value: '#ff0000',
                  $description: 'Accent purple strong',
                  $extensions: {
                    'com.figma': {
                      hiddenFromPublishing: false,
                      scopes: ['ALL_SCOPES'],
                      codeSyntax: {},
                    },
                  },
                },
                hover: {
                  $type: 'color',
                  $value: '#00ff00',
                  $description: 'Accent purple strong hover',
                  $extensions: {
                    'com.figma': {
                      hiddenFromPublishing: false,
                      scopes: ['ALL_SCOPES'],
                      codeSyntax: {},
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  });
});
