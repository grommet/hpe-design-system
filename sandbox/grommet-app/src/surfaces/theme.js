// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { light, dark, surface, toned } from 'hpe-design-tokens/grommet';

/**
 * Prototype of the grommet-theme-hpe 9.0 change (#6071 Part 5, decision 25).
 *
 * `buildTheme(tokens)` would receive the Surface collection as one extra
 * input beside `light` / `dark` (`tokens.surface`). The collection ships as
 * Grommet colour refs ('background-surface-base' -> 'surface-10') and the
 * reference tier arrives through `light` / `dark` like every other colour, so
 * `buildColors` picks it up unchanged and the refs resolve through
 * `global.colors`. A toned theme is therefore a second `buildTheme` call with
 * `tokens.surface = toned`: a theme object, not a mode or a prop.
 */

// Reference tier: { 'surface-10': { light, dark }, ... }. In 9.0 this falls
// out of buildColors' flattening of light/dark; here the sandbox theme is
// built on published tokens 2.4.0, so it is added from the workspace build.
const referenceTier = Object.fromEntries(
  Object.keys(light.hpe.color.surface).map(step => [
    `surface-${step}`,
    {
      light: light.hpe.color.surface[step],
      dark: dark.hpe.color.surface[step],
    },
  ]),
);

// Consumer tier: { 'background-surface-base': 'surface-10', ... }
const consumerTier = surfaceTokens =>
  Object.fromEntries(
    Object.entries(surfaceTokens.hpe.color.background).map(([name, ref]) => [
      `background-${name}`,
      ref,
    ]),
  );

// Resolve a consumer ref to its { light, dark } pair without going through
// Grommet, for the root background (decision 25: keep it opaque and a pair,
// because Grommet reads its brightness to derive theme.dark).
const resolvePair = (surfaceTokens, name) => {
  const ref = surfaceTokens.hpe.color.background[name];
  const step = ref.replace('surface-', '');
  return {
    light: light.hpe.color.surface[step],
    dark: dark.hpe.color.surface[step],
  };
};

export const buildSurfaceTheme = (baseTheme, surfaceTokens) =>
  deepMerge(baseTheme, {
    global: {
      colors: {
        ...referenceTier,
        ...consumerTier(surfaceTokens),
        // Grommet root background -> surface.base (decision 25)
        background: resolvePair(surfaceTokens, 'surface-base'),
      },
      drop: {
        background: 'background-surface-floating',
      },
    },
    card: {
      container: {
        background: 'background-surface-tone-1',
      },
    },
    layer: {
      background: 'background-surface-floating',
    },
    tip: {
      content: {
        background: 'background-surface-floating',
      },
    },
  });

export const themes = {
  default: buildSurfaceTheme(hpe, surface),
  toned: buildSurfaceTheme(hpe, toned),
};

export const surfaceTokenSets = { default: surface, toned };
