// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

// TEMPORARY SURFACES
// The incoming theme update inverts today's page/card relationship:
// the page becomes white and cards become light grey. The design uses raw
// hex values for these two surfaces, so they are hard-coded here in a single
// place. Replace with the official tokens once they are released.
export const PAGE_BACKGROUND = '#ffffff';
export const CARD_BACKGROUND = '#f7f7f7';

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

export const shellTheme = deepMerge(hpe, {
  global: {
    colors: {
      // Page / "sheet" surface (header + primary content, contextual panel).
      'shell-page': {
        light: PAGE_BACKGROUND,
        dark: hpe.global.colors['background-back'].dark,
      },
      // Card surface used by dashboard widgets inside the content area.
      'shell-card': {
        light: CARD_BACKGROUND,
        dark: hpe.global.colors['background-front'].dark,
      },
    },
  },
});
