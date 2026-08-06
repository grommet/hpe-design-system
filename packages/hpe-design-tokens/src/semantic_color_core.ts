// Target => Where color is applied.
export const SEMANTIC_COLOR_TARGETS = [
  'background',
  'border',
  'dataVis',
  'decorative',
  'focus',
  'foreground',
  'icon',
  'text',
  'transparent', // transparent does not feel right as a target. Revisit.
] as const;

export type SemanticColorTarget = (typeof SEMANTIC_COLOR_TARGETS)[number];

// Scale => Emphasis level. Prominence vocabulary used by semantic color tokens.
export const SEMANTIC_COLOR_SCALES = [
  'xweak',
  'weak',
  'default',
  'strong',
  'xstrong',
] as const;

export type SemanticColorScale = (typeof SEMANTIC_COLOR_SCALES)[number];

// Interaction/state vocabulary used in semantic token paths.
export const SEMANTIC_COLOR_STATES = [
  'REST',
  'hover',
  'focus',
  'active',
] as const;

export type SemanticColorState = (typeof SEMANTIC_COLOR_STATES)[number];

// Structural placeholders used in token path normalization.
export const SEMANTIC_COLOR_NORMALIZATION_SEGMENTS = [
  'DEFAULT', // scale
  'REST', // state
] as const;

export type SemanticColorNormalizationSegment =
  (typeof SEMANTIC_COLOR_NORMALIZATION_SEGMENTS)[number];

// Role => Semantic intent of the color, which is target-specific.
// For example, a background color may have a role of "critical" or
// "warning", while a text color may have a role of "anchor" or "placeholder".
export const SEMANTIC_COLOR_ROLE_FAMILIES_BY_TARGET = {
  background: [
    'back',
    'contrast',
    'critical',
    'default',
    'disabled',
    'floating',
    'front',
    'info',
    'neutral',
    'ok',
    'primary',
    'screenOverlay',
    'selected',
    'unknown',
    'warning',
    // Planned namespace: color/background/accent/<colorName>-<prominence>
    'accent',
  ],
  border: [
    'critical',
    'default',
    'disabled',
    'info',
    'ok',
    'selected',
    'unknown',
    'warning',
  ],
  dataVis: [
    'categorical',
    // eslint-disable-next-line max-len
    // planned namespaces: color/dataVis/<visualizationType>/<colorName>-<prominence>
    'sequential',
    'diverging',
    'highlight',
  ],
  decorative: ['blue', 'brand', 'cyan', 'green', 'neutral', 'purple'],
  focus: ['support'],
  foreground: ['critical', 'ok', 'primary', 'unknown', 'warning'],
  icon: [
    'critical',
    'default',
    'disabled',
    'info',
    'ok',
    'onPrimaryStrong',
    'onSelectedPrimary',
    'onSelectedPrimaryStrong',
    'onStrong',
    'primary',
    'unknown',
    'warning',
  ],
  text: [
    'anchor',
    'critical',
    'default',
    'disabled',
    'heading',
    'info',
    'ok',
    'onCritical',
    'onInfo',
    'onOk',
    'onPrimaryStrong',
    'onSelectedPrimary',
    'onSelectedPrimaryStrong',
    'onStrong',
    'onUnknown',
    'onWarning',
    'placeholder',
    'primary',
    'unknown',
    'warning',
  ],
  transparent: [],
} as const;

export type SemanticColorRoleFamilyByTarget = {
  [
    T in SemanticColorTarget
  ]: (typeof SEMANTIC_COLOR_ROLE_FAMILIES_BY_TARGET)[T][number];
};

export type SemanticColorRoleFamily<
  T extends SemanticColorTarget = SemanticColorTarget,
> = SemanticColorRoleFamilyByTarget[T];

// Known role intents where a family expands into an extra slot.
export const SEMANTIC_COLOR_ROLE_INTENTS_BY_FAMILY = {
  background: {
    selected: ['primary'],
    accent: ['blue', 'cyan', 'purple'],
  },
  dataVis: {
    categorical: ['10', '20', '30', '40', '50', '60', '70', '80'],
  },
} as const;

export type SemanticColorRoleIntentsByFamily =
  typeof SEMANTIC_COLOR_ROLE_INTENTS_BY_FAMILY;

export type SemanticColorRoleIntentByFamily<
  T extends keyof SemanticColorRoleIntentsByFamily,
  F extends keyof SemanticColorRoleIntentsByFamily[T],
> = SemanticColorRoleIntentsByFamily[T][F] extends readonly (infer V)[]
  ? V
  : never;

// Role names that remain as explicit path segments in Figma aliases.
export const SEMANTIC_COLOR_FIGMA_NESTED_ROLE_NAMES_BY_TARGET = {
  background: ['accent'],
} as const;

export type SemanticColorRoleMetadata = {
  family: string | null;
  intent: string;
};

// Target-aware role metadata shape for callers that want stronger typing.
export type SemanticColorRoleMetadataByTarget<T extends SemanticColorTarget> = {
  family: SemanticColorRoleFamily<T> | null;
  intent: string;
};

export type SemanticColorTokenMetadata = {
  type: 'color';
  target: SemanticColorTarget | null;
  role: SemanticColorRoleMetadata | null;
  scale: SemanticColorScale | null;
  state: SemanticColorState | null;
};

export type SemanticColorTokenMetadataByTarget<T extends SemanticColorTarget> =
  {
    type: 'color';
    target: T;
    role: SemanticColorRoleMetadataByTarget<T> | null;
    scale: SemanticColorScale | null;
    state: SemanticColorState | null;
  };

export type SemanticColorTokenMetadataMap = Record<
  string,
  SemanticColorTokenMetadata
>;
