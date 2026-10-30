// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useContext } from 'react';
import { TOKENS } from '../surfaceState';

/**
 * Role -> surface token for the GreenLake shell designs (ported from
 * sandbox/shell-prototype, grommet/hpe-design-system#6708). Only the four
 * tokens of the Surface collection are used; the theme (../theme.js) gives
 * them their default / toned values.
 *
 * Two readings of the framed shell are kept, as on the validation pages:
 *   framed      A′ — chrome is a tone-1 container on the root; the content
 *               sheet and contextual panel are base (decisions 13, 23).
 *   framedAlt   A  — the sheet and panel alternate from the chrome (tone-2).
 * And the beside-shell reading, where chrome sits beside the page:
 *   beside      page = base, cards and rail = tone-1, header transparent.
 */
const FRAMED_TOKENS = {
  root: TOKENS.base,
  chrome: TOKENS.tone1,
  sheet: TOKENS.base,
  panel: TOKENS.base,
  card: TOKENS.tone1,
  inner: TOKENS.tone2,
  overlayNav: TOKENS.floating,
  raised: TOKENS.floating,
};

export const SHELL_READINGS = {
  framed: {
    label: 'Framed shell · A′ (sheet = base)',
    tokens: FRAMED_TOKENS,
    notes: {
      root: 'Grommet root; same value as the sheet',
      chrome:
        'shell chrome · a tone-1 container on the root (decision 13) · the rail adds background-contrast on top',
      sheet:
        'content sheet · base: the workspace is the page whether or not chrome surrounds it (decision 23)',
      panel: 'contextual panel · a second sheet (base)',
      card: 'card on base',
      inner: 'panel inside a tone-1 card',
      overlayNav: 'local nav inside a Layer · a floating root',
    },
  },
  framedAlt: {
    label: 'Framed shell · A (sheet = tone-2)',
    tokens: { ...FRAMED_TOKENS, sheet: TOKENS.tone2, panel: TOKENS.tone2 },
    notes: {
      root: 'Grommet root; never visible behind the chrome',
      chrome: 'shell chrome · tone-1 on the root',
      sheet:
        'content sheet · a container on the chrome, so it alternates to tone-2; base is never painted',
      panel: 'contextual panel · sibling of the sheet on the chrome (tone-2)',
      card: 'card on the sheet (tone-1)',
      inner: 'panel inside a tone-1 card',
      overlayNav: 'local nav inside a Layer · a floating root',
    },
  },
  beside: {
    label: 'Beside shell · Overview dashboard',
    tokens: { ...FRAMED_TOKENS, chrome: TOKENS.base },
    notes: {
      root: 'Grommet root = the page (base)',
      chrome:
        'no chrome surface · rail and local nav sit beside the page and carry their own tone-1',
      sheet: 'the page (base) · header transparent on it (decision 6)',
      panel: 'contextual panel · base',
      card: 'card on the page (tone-1)',
      inner: 'panel inside a tone-1 card',
      overlayNav: 'local nav inside a Layer · a floating root',
    },
  },
};

export const SurfaceContext = createContext({
  reading: 'framed',
  annotate: true,
});

export const useSurfaceVariant = () => {
  const { reading, annotate } = useContext(SurfaceContext);
  return { ...SHELL_READINGS[reading], annotate };
};

export const useSurface = role => useSurfaceVariant().tokens[role];
