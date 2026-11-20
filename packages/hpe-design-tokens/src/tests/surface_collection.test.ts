// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from 'vitest';
import {
  generatePostVariablesPayload,
  readJsonFiles,
} from '../token_import.js';
import { getThemeFiles } from '../utils.js';

const surfaceAliases = {
  'surface-base': '10',
  'surface-tone-1': '30',
  'surface-tone-2': '20',
  'surface-floating': '20',
};

const legacyDark = {
  default: [
    'base.color.grey.1300',
    'base.color.grey.1000',
    'base.color.grey.1200',
  ],
  v0: [
    'deprecated.base.color.grey.1300',
    'deprecated.base.color.grey.1200',
    'deprecated.base.color.grey.1100',
  ],
  v1: [
    'deprecated.base.color.grey.1300',
    'deprecated.base.color.grey.1200',
    'deprecated.base.color.grey.1100',
  ],
} as const;

describe('Landmark Surface collection', () => {
  it.each(['default', 'v0', 'v1'] as const)(
    'resolves the Surface and component aliases without changing legacy %s values',
    theme => {
      const tokens = readJsonFiles(getThemeFiles()[theme]);
      const colorFile = (mode: string) =>
        tokens[`color.${theme === 'default' ? '' : `${theme}-`}${mode}.json`];
      const surface = tokens['surface.default.json'];
      const components = tokens[`component.${theme}.json`];

      for (const [mode, primitives] of [
        ['light', ['white.100', 'white.100', 'grey.50']],
        ['dark', ['grey.1300', 'grey.1200', 'grey.1000']],
      ] as const) {
        const colors = colorFile(mode);
        for (const [role, step] of Object.entries(surfaceAliases)) {
          expect(
            surface[
              `color/background/${role.replaceAll('-', '/')}/DEFAULT/REST`
            ].$value,
          ).toBe(`{color.surface.${step}.DEFAULT.REST}`);
          const primitive = `base.color.${primitives[Number(step) / 10 - 1]}`;
          expect(colors[`color/surface/${step}/DEFAULT/REST`].$value).toBe(
            `{${primitive}}`,
          );
          expect(
            Object.values(tokens).some(
              file => file[primitive.replaceAll('.', '/')],
            ),
          ).toBe(true);
        }
        const legacyLight = [
          theme === 'default'
            ? 'base.color.grey.50'
            : 'deprecated.base.color.grey.50',
          'base.color.white.100',
          'base.color.white.100',
        ];
        expect(
          ['back', 'front', 'floating'].map(
            role => colors[`color/background/${role}/DEFAULT/REST`].$value,
          ),
        ).toEqual(
          (mode === 'light' ? legacyLight : legacyDark[theme]).map(
            path => `{${path}}`,
          ),
        );
      }

      const handle = 'switch.default.control.handle';
      for (const path of [
        'drop.default.background',
        ...['rest', 'hover', 'selected.rest', 'selected.hover'].map(
          state => `${handle}.${state}.background`,
        ),
      ]) {
        expect(components[path.replaceAll('.', '/')].$value).toBe(
          '{color.background.surface.floating.DEFAULT.REST}',
        );
      }
      expect(
        components['switch/default/control/handle/disabled/rest/background']
          .$value,
      ).toBe('{color.background.disabled.DEFAULT.REST}');
    },
  );

  it('plans one Surface mode with visible consumers aliasing hidden Color variables', () => {
    const files = getThemeFiles().default.filter(
      file =>
        file.startsWith('tokens/semantic/') ||
        file.startsWith('tokens/primitive/'),
    );
    const payload = generatePostVariablesPayload(readJsonFiles(files), {
      status: 200,
      error: false,
      meta: { variableCollections: {}, variables: {} },
    });
    expect(payload.variableCollections).toContainEqual(
      expect.objectContaining({
        action: 'CREATE',
        name: 'surface',
        initialModeId: 'default',
      }),
    );
    expect(
      payload.variableModes?.filter(
        mode => mode.variableCollectionId === 'surface',
      ),
    ).toEqual([expect.objectContaining({ action: 'UPDATE', name: 'default' })]);
    for (const [role, step] of Object.entries(surfaceAliases)) {
      const name = `color/background/${role}`;
      const ref = `color/surface/${step}`;
      expect(
        payload.variables?.find(variable => variable.name === name),
      ).toMatchObject({
        variableCollectionId: 'surface',
        hiddenFromPublishing: false,
      });
      expect(
        payload.variables?.find(variable => variable.name === ref),
      ).toMatchObject({
        variableCollectionId: 'color',
        hiddenFromPublishing: true,
      });
      expect(payload.variableModeValues).toContainEqual({
        variableId: name,
        modeId: 'default',
        value: { type: 'VARIABLE_ALIAS', id: ref },
      });
    }
  });
});
