// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useContext } from 'react';

// Surface roles in the shell and the token each architecture paints them
// with. Every surface in the prototype is assigned by role, so an
// architecture is a row in this table plus optional theme colour overrides.
// The preview bar picks the architecture and the page theme.
//
// Roles
//   root        Grommet root (seeds light/dark; hidden by the chrome in the
//               framed shell, the visible page in the beside shell)
//   chrome      shell frame the rail and local nav slot sit on
//   sheet       primary content area (header + page)
//   panel       contextual panel (GreenLake AI / hub)
//   panelCard   cards inside the contextual panel
//   card        cards on the sheet
//   inner       panels inside a card (maps, topology nodes)
//   overlayNav  local nav shown in a Layer at narrow widths
//   raised      small raised target on the rail
//
// The tables below describe the framed shell, where chrome wraps the page.
// The beside shell re-assigns three roles; see BESIDE_TOKENS.

const T = name => `background-surface-${name}`;

// Tonal with roles: the page keeps base whether or not chrome surrounds it.
// The chrome is a tone-1 container on the root; the sheet (and the
// contextual panel, as a second sheet) are base inside it; cards and inner
// panels alternate from base exactly as on a page beside the shell.
const ROLES_TOKENS = {
  root: T('base'),
  chrome: T('tone-1'),
  sheet: T('base'),
  panel: T('base'),
  panelCard: T('tone-1'),
  card: T('tone-1'),
  inner: T('tone-2'),
  overlayNav: T('floating'),
  raised: T('floating'),
};

// Tonal scale: tones only, no page root.
const SCALE_TOKENS = {
  root: T('tone-2'),
  chrome: T('tone-1'),
  sheet: T('tone-2'),
  panel: T('tone-2'),
  panelCard: T('tone-1'),
  card: T('tone-1'),
  inner: T('tone-2'),
  overlayNav: T('floating'),
  raised: T('floating'),
};

// Tonal + frame: Tonal with roles, with the chrome on its own frame root.
const FRAME_TOKENS = {
  ...ROLES_TOKENS,
  chrome: T('frame'),
};

export const SURFACE_ROLES = Object.keys(ROLES_TOKENS);

// Beside shell (#6635, #6660): chrome sits next to the page instead of
// around it, so the root is the visible ground and nothing is a frame. The
// rail, the local nav and the contextual panel are rounded containers on
// the page. They take the first tone exactly as a card does, and a card
// inside the contextual panel is one level deeper, so it takes the other.
// This holds in every architecture; only the page's own token differs.
const BESIDE_TOKENS = {
  chrome: T('tone-1'),
  panel: T('tone-1'),
  panelCard: T('tone-2'),
};

const BESIDE_NOTES = {
  root: 'Grommet root; the page itself',
  chrome:
    'rail and local nav · tone-1 containers on the page, exactly as a card is',
  panel: 'contextual panel · a tone-1 container on the page',
  panelCard:
    'card inside the tone-1 panel · one level deeper, so it takes tone-2',
  card: 'card on the page',
  inner: 'panel inside a tone-1 card',
};

const BESIDE_FRAME_NOTE =
  'rail and local nav · tone-1 containers on the page · nothing surrounds the page, so the frame token is unused';

// Grey-page surface theme (decision 11b): light values only. base and
// tone-2 take the grey, tone-1 takes the white; dark is left alone because
// the Landmark and legacy dark values already agree (decision 4a).
const greyPageTheme = (primitives, colors) => ({
  [T('base')]: {
    light: primitives['grey-50'],
    dark: colors[T('base')].dark,
  },
  [T('tone-1')]: {
    light: colors[T('tone-2')].light,
    dark: colors[T('tone-1')].dark,
  },
  [T('tone-2')]: {
    light: colors[T('tone-1')].light,
    dark: colors[T('tone-2')].dark,
  },
});

// Tonal scale re-values tone-2 in dark so the page reaches the deepest
// step; base is not in use to carry it.
const scaleDark = primitives => primitives['grey-1300'];

// One entry per architecture and page theme. `colors` are theme overrides
// (see buildVariantTheme); the token package is untouched. `notes` annotate
// the framed shell; `besideNotes` replace them where the beside shell
// reads differently.
export const SURFACE_VARIANTS = {
  roles: {
    label: 'Tonal with roles · white page',
    tokens: ROLES_TOKENS,
    notes: {
      root: 'Grommet root; same value as the sheet',
      chrome:
        'shell chrome · a tone-1 container on the root · the page is not its child in the surface model',
      sheet:
        'page root (base) · the workspace is base whether or not chrome surrounds it',
      panel: 'contextual panel as a second page sheet (base)',
      panelCard: 'card on the panel',
      card: 'card on base',
      inner: 'panel inside a tone-1 card',
      overlayNav: 'local nav inside a Layer: a floating root',
    },
    besideNotes: {
      sheet:
        'page root (base) · chrome sits beside the page, so base is the visible ground',
    },
  },
  rolesGrey: {
    label: 'Tonal with roles · grey page (peer surface theme)',
    tokens: ROLES_TOKENS,
    notes: {
      root: 'Grommet root; base is grey.50 in this theme',
      chrome:
        'shell chrome · tone-1 is white in the grey theme, so the frame inverts with the cards and stays distinct from the page',
      sheet: 'page root · base is grey.50 in this theme · dark unchanged',
      panel: 'contextual panel · base, grey in this theme',
      panelCard: 'card on the panel · tone-1, white in this theme',
      card: 'card · tone-1, white in this theme',
      inner: 'panel inside a card · tone-2, grey in this theme',
      overlayNav:
        'local nav inside a Layer · floating stays white: it is not re-valued by the theme',
    },
    besideNotes: {
      sheet:
        'page root · base is grey.50 in this theme, so the panels and cards (tone-1) turn white · dark unchanged',
    },
    colors: greyPageTheme,
  },

  scale: {
    label: 'Tonal scale · white page',
    tokens: SCALE_TOKENS,
    notes: {
      root: 'Grommet root; there is no base in this architecture',
      chrome:
        'shell chrome · tone-1 · local nav slot inherits it; the rail adds background-contrast on top',
      sheet:
        'content sheet · a tone-2 container on the chrome · tone-2 carries the darkest dark value (grey.1300)',
      panel: 'contextual panel · tone-2, sibling of the sheet on the chrome',
      panelCard: 'card on the panel · tone-1',
      card: 'card on the sheet · tone-1',
      inner: 'panel inside a tone-1 card · tone-2, same value as the sheet',
      overlayNav:
        'local nav inside a Layer · floating keeps grey.1200, so it no longer equals tone-2 in dark',
    },
    besideNotes: {
      sheet:
        'page · tone-2: with no base, the page is the tone its panels and cards are not',
      panelCard:
        'card inside the tone-1 panel · tone-2, so it repeats the page’s value (grey.1300 in dark)',
      inner: 'panel inside a tone-1 card · tone-2, same value as the page',
    },
    colors: (primitives, colors) => ({
      [T('tone-2')]: {
        light: colors[T('tone-2')].light,
        dark: scaleDark(primitives),
      },
    }),
  },
  scaleGrey: {
    label: 'Tonal scale · grey page (peer surface theme)',
    tokens: SCALE_TOKENS,
    notes: {
      root: 'Grommet root; tone-2, grey in this theme',
      chrome: 'shell chrome · tone-1 is white in the grey theme',
      sheet:
        'content sheet · tone-2 is grey.50 in the grey theme · dark stays grey.1300',
      panel: 'contextual panel · tone-2, grey in this theme',
      panelCard: 'card on the panel · tone-1, white in this theme',
      card: 'card · tone-1, white in this theme',
      inner: 'panel inside a card · tone-2 · same value as the sheet',
      overlayNav:
        'local nav inside a Layer · floating stays white: it is not re-valued by the theme',
    },
    besideNotes: {
      sheet:
        'page · tone-2 is grey.50 in this theme, so the panels and cards (tone-1) turn white · dark stays grey.1300',
      panelCard:
        'card inside the tone-1 panel · tone-2, so it repeats the page’s value',
      inner: 'panel inside a tone-1 card · tone-2, same value as the page',
    },
    colors: (primitives, colors) => ({
      ...greyPageTheme(primitives, colors),
      [T('tone-2')]: {
        light: colors[T('tone-1')].light,
        dark: scaleDark(primitives),
      },
    }),
  },

  frame: {
    label: 'Tonal + frame · white page',
    tokens: FRAME_TOKENS,
    notes: {
      root: 'Grommet root; same value as the sheet',
      chrome:
        'frame root · around the page · takes tone-1’s values here (grey.50 / grey.1000) but is its own token',
      sheet: 'page root (base)',
      panel: 'contextual panel as a second page sheet (base)',
      panelCard: 'card on the panel',
      card: 'card on base',
      inner: 'panel inside a tone-1 card',
      overlayNav: 'local nav inside a Layer: a floating root',
    },
    besideNotes: {
      sheet: 'page root (base) · the same as Tonal with roles here',
      chrome: BESIDE_FRAME_NOTE,
    },
    colors: (primitives, colors) => ({
      [T('frame')]: {
        light: colors[T('tone-1')].light,
        dark: colors[T('tone-1')].dark,
      },
    }),
  },
  frameGrey: {
    label: 'Tonal + frame · grey page (peer surface theme)',
    tokens: FRAME_TOKENS,
    notes: {
      root: 'Grommet root; base is grey.50 in this theme',
      chrome:
        'frame root · white in the grey theme, so the frame stays distinct from the page · a theme could re-value it alone',
      sheet: 'page root · base is grey.50 in this theme · dark unchanged',
      panel: 'contextual panel · base, grey in this theme',
      panelCard: 'card on the panel · tone-1, white in this theme',
      card: 'card · tone-1, white in this theme',
      inner: 'panel inside a card · tone-2, grey in this theme',
      overlayNav:
        'local nav inside a Layer · floating stays white: it is not re-valued by the theme',
    },
    besideNotes: {
      sheet:
        'page root · base is grey.50 in this theme, so the panels and cards (tone-1) turn white · dark unchanged',
      chrome: BESIDE_FRAME_NOTE,
    },
    colors: (primitives, colors) => {
      const grey = greyPageTheme(primitives, colors);
      return {
        ...grey,
        [T('frame')]: {
          light: grey[T('tone-1')].light,
          dark: colors[T('tone-1')].dark,
        },
      };
    },
  },
};

// The architectures offered in the preview bar, each with its white-page
// and grey-page variant and a one-paragraph explanation for the bar's
// "Explain architecture" dialog.
export const ARCHITECTURES = [
  {
    id: 'roles',
    label: 'Tonal with roles',
    variants: { white: 'roles', grey: 'rolesGrey' },
    explanation:
      'Four tokens. Two are roots that say where a surface sits: base is the page, and floating is anything over the page, such as a layer or a menu. Two are tones for containers, tone-1 and tone-2. The tones have no order: a container takes whichever tone its parent is not, starting with tone-1 on a root. These are the tokens decided in #5969. The previews read them so that the page stays base even when shell chrome wraps it, which would amend decisions 13 and 23. The chrome is then a tone-1 container, as a card is.',
  },
  {
    id: 'scale',
    label: 'Tonal scale',
    variants: { white: 'scale', grey: 'scaleGrey' },
    explanation:
      'Three tokens. Every surface, the page included, is a step on one scale: tone-1 and tone-2 today, with a tone-3 added if a design ever needs one. With two steps the rule is still to take the tone the parent is not, so the page is tone-2, chrome and cards are tone-1, and a panel inside a card is tone-2 again. There is no base; floating remains for anything over the page. In dark, tone-2 is re-valued to the deepest grey so the page can reach it, which means a panel inside a card repeats the page colour.',
  },
  {
    id: 'frame',
    label: 'Tonal + frame',
    variants: { white: 'frame', grey: 'frameGrey' },
    explanation:
      'Five tokens. This is Tonal with roles plus one more root, frame, for chrome that surrounds the page. The three roots are named by their relationship to the page: base is the page, frame is around it, and floating is over it. Containers alternate tone-1 and tone-2 as before. In these previews frame takes tone-1’s values, so it looks the same as Tonal with roles; the difference is that a theme can re-colour the frame without touching the cards. Where nothing surrounds the page, as in the beside shell, frame is unused.',
  },
];

export const variantFor = (archId, grey = false) => {
  const architecture =
    ARCHITECTURES.find(a => a.id === archId) || ARCHITECTURES[0];
  return architecture.variants[grey ? 'grey' : 'white'];
};

// The same variants as the beside shell assigns and annotates them.
const BESIDE_VARIANTS = Object.fromEntries(
  Object.entries(SURFACE_VARIANTS).map(([id, variant]) => [
    id,
    {
      ...variant,
      tokens: { ...variant.tokens, ...BESIDE_TOKENS },
      notes: { ...variant.notes, ...BESIDE_NOTES, ...variant.besideNotes },
    },
  ]),
);

// What is being previewed: architecture, its variant for the page theme,
// which way round the shell is ('framed' or 'beside'), colour mode, and
// whether annotation chips are shown.
export const SurfaceContext = createContext({
  arch: 'roles',
  variant: 'roles',
  shell: 'framed',
  mode: 'light',
  grey: false,
  annotate: false,
});

export const useSurfaceVariant = () => {
  const preview = useContext(SurfaceContext);
  const variants =
    preview.shell === 'beside' ? BESIDE_VARIANTS : SURFACE_VARIANTS;
  return {
    ...preview,
    id: preview.variant,
    ...variants[preview.variant],
  };
};

// Token for a surface role under the active variant.
export const useSurface = role => useSurfaceVariant().tokens[role];
