// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { describe, expect, it } from 'vitest';
import {
  generatePostVariablesPayload,
  readJsonFiles,
} from '../token_import.js';
import { getThemeFiles } from '../utils.js';

const themes = ['default', 'v0', 'v1', 'v2'] as const;
const modes = ['light', 'dark'] as const;

const surfaceAliases = {
  'surface-base': '10',
  'surface-tone-1': '30',
  'surface-tone-2': '20',
  'surface-floating': '20',
};

// color.surface.10, 20 and 30 in the default theme. The snapshot themes
// predate the Surface tokens, so the references are transparent there.
const references = {
  light: ['base.color.white.100', 'base.color.white.100', 'base.color.grey.50'],
  dark: [
    'base.color.grey.1300',
    'base.color.grey.1200',
    'base.color.grey.1000',
  ],
} as const;

// color.background.back, front and floating keep their released values.
const currentBackgrounds = {
  light: ['base.color.grey.50', 'base.color.white.100', 'base.color.white.100'],
  dark: [
    'base.color.grey.1300',
    'base.color.grey.1000',
    'base.color.grey.1200',
  ],
} as const;
const priorBackgrounds = {
  light: [
    'deprecated.base.color.grey.50',
    'base.color.white.100',
    'base.color.white.100',
  ],
  dark: [
    'deprecated.base.color.grey.1300',
    'deprecated.base.color.grey.1200',
    'deprecated.base.color.grey.1100',
  ],
} as const;
const releasedBackgrounds = {
  default: currentBackgrounds,
  v0: priorBackgrounds,
  v1: priorBackgrounds,
  v2: currentBackgrounds,
} as const;

const readTheme = (theme: (typeof themes)[number]) => {
  const tokens = readJsonFiles(getThemeFiles()[theme]);
  const prefix = theme === 'default' ? '' : `${theme}-`;

  return {
    tokens,
    colors: (mode: string) => tokens[`color.${prefix}${mode}.json`],
    surface: tokens['surface.default.json'],
    components: tokens[`component.${theme}.json`],
  };
};

// The snapshot themes keep the aliases they were released with.
const handle = 'switch/default/control/handle';
const releasedComponentAliases = {
  'drop/default/background': '{color.background.floating.DEFAULT.REST}',
  'fig/calendar/dropContainer/background':
    '{color.background.floating.DEFAULT.REST}',
  'fig/notification/toast/critical/rest/background':
    '{color.background.floating.DEFAULT.REST}',
  'fig/notification/toast/info/rest/background':
    '{color.background.floating.DEFAULT.REST}',
  'fig/notification/toast/ok/rest/background':
    '{color.background.floating.DEFAULT.REST}',
  'fig/notification/toast/unknown/rest/background':
    '{color.background.floating.DEFAULT.REST}',
  'fig/notification/toast/warning/rest/background':
    '{color.background.floating.DEFAULT.REST}',
  'fig/tip/container/background': '{color.background.floating.DEFAULT.REST}',
  [`${handle}/rest/background`]: '{color.background.front.DEFAULT.REST}',
  [`${handle}/hover/background`]: '{color.background.default.REST}',
  [`${handle}/selected/rest/background`]: '{color.background.default.REST}',
  [`${handle}/selected/hover/background`]: '{color.background.default.REST}',
};

describe('Landmark Surface collection', () => {
  it.each(themes)(
    'adds the Surface tokens without changing released %s backgrounds',
    theme => {
      const { tokens, colors, surface } = readTheme(theme);

      for (const [role, step] of Object.entries(surfaceAliases)) {
        expect(
          surface[`color/background/${role.replaceAll('-', '/')}/DEFAULT/REST`]
            .$value,
        ).toBe(`{color.surface.${step}.DEFAULT.REST}`);

        for (const mode of modes) {
          const reference =
            theme === 'default'
              ? references[mode][Number(step) / 10 - 1]
              : 'color.transparent';
          expect(
            colors(mode)[`color/surface/${step}/DEFAULT/REST`].$value,
          ).toBe(`{${reference}}`);
          expect(
            Object.values(tokens).some(
              file => file[reference.replaceAll('.', '/')],
            ),
          ).toBe(true);
        }
      }

      for (const mode of modes) {
        expect(
          ['back', 'front', 'floating'].map(
            role =>
              colors(mode)[`color/background/${role}/DEFAULT/REST`].$value,
          ),
        ).toEqual(releasedBackgrounds[theme][mode].map(path => `{${path}}`));
      }
    },
  );

  it.each(themes)(
    'rewires floating consumers in the default theme only (%s)',
    theme => {
      const { components } = readTheme(theme);

      for (const [path, released] of Object.entries(releasedComponentAliases)) {
        expect(components[path].$value).toBe(
          theme === 'default'
            ? '{color.background.surface.floating.DEFAULT.REST}'
            : released,
        );
      }
      expect(components[`${handle}/disabled/rest/background`].$value).toBe(
        '{color.background.disabled.DEFAULT.REST}',
      );
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
