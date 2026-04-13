import type { ApiGetVariableResponse } from '../../../figma_api.js';

export function makeApiResponse(): ApiGetVariableResponse {
  return {
    status: 200,
    error: false,
    meta: {
      variableCollections: {
        '9479:10': {
          id: '9479:10',
          key: 'collection-key-1',
          name: 'color',
          modes: [
            {
              modeId: '1:0',
              name: 'light',
            },
          ],
          defaultModeId: '1:0',
          remote: false,
          hiddenFromPublishing: false,
          variableIds: ['9479:64'],
        },
      },
      variables: {
        '6c80915d0d2283e2a2c35eb8e3ecd669fe98ea94/9479:64': {
          id: '9479:64',
          name: 'color.text.default',
          key: 'variable-key-1',
          variableCollectionId: '9479:10',
          resolvedType: 'COLOR',
          valuesByMode: {
            '1:0': {
              r: 0,
              g: 0,
              b: 0,
              a: 1,
            },
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
}
