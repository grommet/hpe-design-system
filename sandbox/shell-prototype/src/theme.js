// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { buildTheme } from 'grommet-theme-hpe/dist/es6/themes/hpe.js';
import { deepMerge } from 'grommet/utils';
import { SURFACE_VARIANTS } from './surfaces';
import {
  components,
  dark,
  dimension,
  global,
  light,
  primitives,
  small,
} from 'hpe-design-tokens/grommet';

// SURFACE TOKEN PREVIEWS
// The theme is built from the workspace's hpe-design-tokens, the way
// grommet-theme-hpe builds it. The four surface tokens proposed in
// grommet/hpe-design-system#5969 are not in the token package yet (#6714
// builds them through the pipeline), so they are added here as Grommet
// colour names, with the values from #6073:
//   background-surface-base      page / app root
//   background-surface-tone-1    container; whichever tone the parent is not
//   background-surface-tone-2    container; whichever tone the parent is not
//   background-surface-floating  UI rendered over the page (Layer, Drop)
// Nothing in the token package changes for these previews.
const base = primitives.hpe.base.color;

const SURFACE_COLORS = {
  'background-surface-base': {
    light: base['white-100'],
    dark: base['grey-1300'],
  },
  'background-surface-tone-1': {
    light: base['grey-50'],
    dark: base['grey-1000'],
  },
  'background-surface-tone-2': {
    light: base['white-100'],
    dark: base['grey-1200'],
  },
  'background-surface-floating': {
    light: base['white-100'],
    dark: base['grey-1200'],
  },
};

export const shellTheme = deepMerge(
  buildTheme(
    {
      primitives,
      dark,
      light,
      large: dimension,
      small,
      global,
      components,
    },
    { 'v6-backwards-compatibility': false },
  ),
  { global: { colors: SURFACE_COLORS } },
);

// Theme for a surface variant (see surfaces.js). Variants that introduce a
// provisional colour or re-value a token add it here.
export const buildVariantTheme = variantId => {
  const variant = SURFACE_VARIANTS[variantId];
  if (!variant?.colors) return shellTheme;
  const colors = variant.colors(base, shellTheme.global.colors);
  return deepMerge(shellTheme, { global: { colors } });
};

// Page container kind for the header and every page in the content area.
// 'wide' caps content at the theme's 3xlarge size (1536px) and centres it,
// as the overview dashboard template does, so tiles and tables do not
// sprawl on ultra-wide displays. The header uses the same kind so the brand
// stays aligned with the content edge.
export const PAGE_KIND = 'wide';

// Resizable shell panels: default, minimum and maximum widths in px.
export const PANEL_SIZES = {
  nav: { default: 320, min: 240, max: 480 },
  context: { default: 384, min: 320, max: 640 },
};

// Ambient drift of the Marvis canvas gradient: one full blue<->green swap.
// Slow enough to read as ambience rather than activity.
export const AMBIENT_MOTION = { duration: 28500 };

// Motion for the navigation slot and contextual panel. Grommet's Layer
// slides in at 0.2s ease-in-out; the shell panels are larger surfaces, so
// they move a touch slower with the same easing.
export const PANEL_MOTION = { duration: 300, easing: 'ease-in-out' };
