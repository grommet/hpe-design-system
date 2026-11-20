// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Layout constants for the ported GreenLake shell. The theme itself comes
// from ../theme.js (buildSurfaceTheme), so the shell takes whichever surface
// mode and colour mode the validation page has selected.

// Page container kind for the header and every page in the content area.
// 'wide' caps content at the theme's 3xlarge size (1536px) and centres it,
// as the overview dashboard template does.
export const PAGE_KIND = 'wide';

// Resizable shell panels: default, minimum and maximum widths in px.
export const PANEL_SIZES = {
  nav: { default: 320, min: 240, max: 480 },
  context: { default: 384, min: 320, max: 640 },
};

// Ambient drift of the Marvis canvas gradient.
export const AMBIENT_MOTION = { duration: 28500 };

// Motion for the navigation slot and contextual panel.
export const PANEL_MOTION = { duration: 300, easing: 'ease-in-out' };
