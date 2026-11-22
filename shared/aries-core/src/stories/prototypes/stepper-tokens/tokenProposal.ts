// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
//
// THROWAWAY PROTOTYPE — not for merge.
//
// Data model for the Stepper colour-token proposal stories. Describes, for
// each effective Stepper state and interaction, which semantic token paints
// each visual role, for both "Current" (grommet-theme-hpe 8.x) and "Option A"
// (filled = selected, with dedicated strong-critical tokens).

export type StepperState =
  | 'pending'
  | 'current'
  | 'completed'
  | 'currentCompleted'
  | 'error'
  | 'currentError'
  | 'disabled';

export type Interaction = 'rest' | 'hover' | 'focus';

export type Role =
  'border' | 'fill' | 'glyph' | 'label' | 'connector' | 'helperText';

// Token name, or null when the role is not painted. Suffix `*` marks tokens
// that colors.js swaps for Grommet smart pairing and that the Stepper must
// receive as raw {light, dark} values. Prefix `⚠` marks a non-tokenised
// fallback that Grommet computes itself.
export type TokenRef = string | null;

export type RoleTokens = Record<Role, TokenRef>;

export interface StateModel {
  rest: RoleTokens;
  hover: Partial<RoleTokens>;
}

export type Model = Record<StepperState, StateModel>;

export const STATES: StepperState[] = [
  'pending',
  'current',
  'completed',
  'currentCompleted',
  'error',
  'currentError',
  'disabled',
];

export const STATE_LABELS: Record<StepperState, string> = {
  pending: 'Pending',
  current: 'Pending · selected',
  completed: 'Complete',
  currentCompleted: 'Complete · selected',
  error: 'Error',
  currentError: 'Error · selected',
  disabled: 'Disabled',
};

export const INTERACTIONS: Interaction[] = ['rest', 'hover', 'focus'];

export const ROLES: [Role, string][] = [
  ['border', 'Indicator border'],
  ['fill', 'Indicator fill'],
  ['glyph', 'Indicator glyph'],
  ['label', 'Label'],
  ['connector', 'Connector'],
  ['helperText', 'Helper text'],
];

// red.900 does not exist. It is the step between red.800 (#cc1f1a) and
// red.1000 (#552120) needed for a light-mode hover of a red.800 fill,
// mirroring green.800 -> green.900 for the primary strong fill. #9c0f0b
// steps slightly further than the green hovers (rest-vs-hover 1.52x vs
// 1.47-1.51x) because saturated red masks lightness change.
export const PROPOSED_PRIMITIVES = {
  'red.900': '#9c0f0b',
};

export interface NewToken {
  light: string;
  dark: string;
  alias: { light: string; dark: string };
  description: string;
}

// Tokens that do not exist in hpe-design-tokens today, with proposed values
// so the rendered preview is faithful. Values mirror the published tokens:
// icon-critical = red.800 / red.500, icon-onStrong = #ffffff / grey.1000.
export const NEW_TOKENS: Record<string, NewToken> = {
  'icon-critical-hover': {
    light: PROPOSED_PRIMITIVES['red.900'],
    dark: '#ff7b7b',
    alias: { light: 'red.900 (new)', dark: 'red.400' },
    description:
      'Hover variant of icon-critical. Parallel to icon-primary-hover; used by the unselected error indicator ring + glyph.',
  },
  'background-critical-strong': {
    light: '#cc1f1a',
    dark: '#fc6161',
    alias: { light: 'red.800', dark: 'red.500' },
    description:
      'Strong critical fill. Parallel to background-primary-strong. (A1 name)',
  },
  'background-critical-strong-hover': {
    light: PROPOSED_PRIMITIVES['red.900'],
    dark: '#ff7b7b',
    alias: { light: 'red.900 (new)', dark: 'red.400' },
    description: 'Hover variant of background-critical-strong. (A1 name)',
  },
  'icon-onCriticalStrong': {
    light: '#ffffff',
    dark: '#292d3a',
    alias: { light: 'icon-onStrong', dark: 'icon-onStrong' },
    description: 'Glyph colour on background-critical-strong. (A1 name)',
  },
};

// A2 renames the same three fill-related tokens into the "selected" family.
export const A2_NAMES: Record<string, string> = {
  'background-critical-strong': 'background-selected-critical-strong',
  'background-critical-strong-hover':
    'background-selected-critical-strong-hover',
  'icon-onCriticalStrong': 'icon-onSelectedCriticalStrong',
};

export const a2Name = (token: string): string => A2_NAMES[token] || token;

export const isNewToken = (token: string | null | undefined): boolean =>
  Boolean(token && NEW_TOKENS[token]);

export const CURRENT: Model = {
  pending: {
    rest: {
      border: 'icon-weak',
      fill: null,
      glyph: null,
      label: 'text-default',
      connector: 'border-default',
      helperText: 'text-default',
    },
    hover: { border: 'icon-strong', label: 'text-strong' },
  },
  current: {
    rest: {
      border: null,
      fill: 'background-selected-primary-strong',
      glyph: 'icon-onSelectedPrimaryStrong*',
      label: 'text-primary',
      connector: 'border-default',
      helperText: 'text-default',
    },
    hover: { fill: 'background-selected-primary-strong-hover' },
  },
  completed: {
    rest: {
      border: 'icon-primary',
      fill: null,
      glyph: 'icon-primary',
      label: 'text-primary',
      connector: 'foreground-primary',
      helperText: 'text-default',
    },
    hover: { border: 'icon-primary-hover', glyph: 'icon-primary-hover' },
  },
  currentCompleted: {
    rest: {
      border: null,
      fill: 'background-selected-primary-strong',
      glyph: 'icon-onSelectedPrimaryStrong*',
      label: 'text-primary',
      connector: 'foreground-primary',
      helperText: 'text-default',
    },
    hover: { fill: 'background-selected-primary-strong-hover' },
  },
  error: {
    rest: {
      border: 'icon-critical',
      fill: null,
      glyph: 'icon-critical',
      label: 'text-critical',
      connector: 'border-critical',
      helperText: 'text-critical',
    },
    // No hover token exists for critical; Grommet falls back to
    // color-mix(icon-critical 80%, black).
    hover: { border: '⚠ color-mix fallback', glyph: '⚠ color-mix fallback' },
  },
  currentError: {
    rest: {
      border: null,
      fill: 'icon-critical',
      glyph: 'icon-onStrong*',
      label: 'text-critical',
      connector: 'border-critical',
      helperText: 'text-critical',
    },
    hover: { fill: '⚠ color-mix fallback' },
  },
  disabled: {
    rest: {
      border: 'icon-disabled',
      fill: null,
      glyph: null,
      label: 'text-default',
      connector: 'border-disabled',
      helperText: 'text-default',
    },
    hover: {},
  },
};

export const OPTION_A: Model = {
  ...CURRENT,
  error: {
    rest: CURRENT.error.rest,
    hover: { border: 'icon-critical-hover', glyph: 'icon-critical-hover' },
  },
  currentError: {
    rest: {
      ...CURRENT.currentError.rest,
      fill: 'background-critical-strong',
      glyph: 'icon-onCriticalStrong',
    },
    hover: { fill: 'background-critical-strong-hover' },
  },
};

export const resolveRow = (
  model: Model,
  state: StepperState,
  interaction: Interaction,
): RoleTokens => {
  const { rest, hover } = model[state];
  if (interaction === 'hover') return { ...rest, ...hover };
  return rest;
};

export const CURRENT_TOKENS_USED = [
  'icon-weak',
  'icon-strong',
  'icon-disabled',
  'icon-primary',
  'icon-primary-hover',
  'icon-critical',
  'icon-onStrong*',
  'icon-onSelectedPrimaryStrong*',
  'background-selected-primary-strong',
  'background-selected-primary-strong-hover',
  'border-default',
  'border-critical',
  'border-disabled',
  'foreground-primary',
  'text-default',
  'text-strong',
  'text-primary',
  'text-critical',
];
