// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from '@hpe-design/icons-grommet';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  
  // ===== CUSTOM EDIT START (Issue #6260 surface token bridge) =====
  // SURFACE TOKEN BRIDGE
  // Issue #6260: Landmark surface tokens - docs site styling.
  // These surface tokens are temporary placeholders for the new landmark
  // surface tokens that will ship with grommet-theme-hpe v9 and
  // hpe-design-tokens v3.
  //
  // IMPLEMENTATION STRATEGY:
  // 1. Components use the landmark surface token names
  //    (background-surface-*) throughout the codebase NOW.
  // 2. This theme file bridges the gap with temporary hex values in
  //    light/dark modes.
  // 3. When grommet-theme-hpe v9 ships with real surface tokens:
  //    - Remove this colors section entirely (tokens will come from
  //      the base theme)
  //    - No component code changes needed
  //
  // TOKEN MAPPINGS:
  // • background-surface-base      → page/canvas background
  // • background-surface-tone-1    → primary containers/content panes
  // • background-surface-tone-2    → nested content within tone-1
  // • background-surface-floating  → floating surfaces (dropdowns,
  //                                  search, etc)
  //
  // ALTERNATION RULE: Each nested surface uses the tone its parent is NOT.
  global: {
    colors: {
      'background-surface-base': {
        light: '#FFFFFF',
        dark: '#1D1F27',
      },
      'background-surface-tone-1': {
        light: '#F7F7F7',
        dark: '#292D3A',
      },
      'background-surface-tone-2': {
        light: '#FFFFFF',
        dark: '#22252E',
      },
      'background-surface-floating': {
        light: '#FFFFFF',
        dark: '#22252E',
      },
    },
  },
  // ===== CUSTOM EDIT END (Issue #6260 surface token bridge) =====

  buttonGroup: {
    // any Box props
    gap: 'xsmall',
  },
  feedback: {
    closeButton: {
      a11yTitle: `You are in a dialog containing a form to submit feedback.
        To close this layer, press Enter.`,
    },
    container: {
      pad: 'medium',
    },
    header: {
      align: 'start',
      direction: 'row',
      justify: 'between',
      gap: '3xsmall',
    },
    heading: {
      level: 2,
      margin: {
        vertical: 'none',
      },
      size: 'xsmall',
    },
    footer: {
      pad: {
        top: 'medium',
      },
      direction: 'row',
      justify: 'start',
      gap: '3xsmall',
    },
    success: {
      color: 'text-strong',
      weight: 500,
      alignSelf: 'end',
    },
  },
});

export const ariesPop = deepMerge(aries, {
  heading: {
    ...hpePop.heading,
  },
  // this is producing a console warning because it's not a supported status
  // proposing that notification should be more flexible to allow other statuses
  notification: {
    learn: {
      icon: Info,
      background: {
        color: 'background-warning',
      },
      color: 'text',
      toast: {
        // Issue #6260: Toast is a floating surface, uses landmark surface token
        background: 'background-surface-floating',
      },
    },
  },
});

export const { colors } = aries.global;
