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

// Role => Semantic name of the color, which is target-specific.
// For example, a background color may have a role of "critical" or
// "warning", while a text color may have a role of "anchor" or "placeholder".
export const SEMANTIC_COLOR_ROLES_BY_TARGET = {
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
    'accent',
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
  foreground: ['critical', 'info', 'ok', 'primary', 'unknown', 'warning'],
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

export type SemanticColorRoleByTarget = {
  [
    T in SemanticColorTarget
  ]: (typeof SEMANTIC_COLOR_ROLES_BY_TARGET)[T][number];
};

export type SemanticColorRole<
  T extends SemanticColorTarget = SemanticColorTarget,
> = SemanticColorRoleByTarget[T];

// Validation map: target -> family -> allowed sub-role names.
// Example: background.accent allows blue/cyan/purple.
// Full path-shape reference: docs/SEMANTIC_COLOR_PATH_CONTRACT.md.
export const SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY = {
  background: {
    selected: ['primary'],
    accent: ['blue', 'cyan', 'purple'],
  },
  border: {
    accent: ['blue', 'cyan', 'purple'],
  },
  dataVis: {
    categorical: ['10', '20', '30', '40', '50', '60', '70', '80'],
  },
} as const satisfies {
  // family keys must be valid roles for their target
  [T in SemanticColorTarget]?: {
    [F in SemanticColorRole<T>]?: readonly string[];
  };
};

export type SemanticColorSubrolesByTargetFamily =
  typeof SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY;

export type SemanticColorSubroleByTargetFamily<
  T extends keyof SemanticColorSubrolesByTargetFamily,
  F extends keyof SemanticColorSubrolesByTargetFamily[T],
> = SemanticColorSubrolesByTargetFamily[T][F] extends readonly (infer V)[]
  ? V
  : never;

// Serialization map (Figma alias shape):
// target -> families that keep their own path segment in Figma names.
// Full path-shape reference: docs/SEMANTIC_COLOR_PATH_CONTRACT.md.
export const SEMANTIC_COLOR_FIGMA_FAMILIES_BY_TARGET = {
  background: ['accent'],
  border: ['accent'],
} as const satisfies {
  // entries must be a subset of the family keys in the subroles map
  [T in keyof typeof SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY]?: ReadonlyArray<
    keyof (typeof SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY)[T]
  >;
};

export type SemanticColorRoleMetadata = {
  family: string | null;
  name: string;
};

// Target-aware role metadata shape for callers that want stronger typing.
export type SemanticColorRoleMetadataByTarget<T extends SemanticColorTarget> = {
  family: SemanticColorRole<T> | null;
  name: string;
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
