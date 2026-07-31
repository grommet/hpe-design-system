export const SEMANTIC_COLOR_TARGETS = [
  'background',
  'border',
  'dataVis',
  'decorative',
  'focus',
  'foreground',
  'icon',
  'text',
  'transparent',
] as const;

export type SemanticColorTarget = (typeof SEMANTIC_COLOR_TARGETS)[number];

// Prominence vocabulary used by semantic color tokens.
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
  'DEFAULT',
  'REST',
] as const;

export type SemanticColorNormalizationSegment =
  (typeof SEMANTIC_COLOR_NORMALIZATION_SEGMENTS)[number];

export const SEMANTIC_COLOR_ROLE_FAMILIES_BY_TARGET = {
  background: [
    'DEFAULT',
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
    'strong',
    'unknown',
    'warning',
    'weak',
  ],
  dataVis: ['categorical'],
  decorative: ['blue', 'brand', 'cyan', 'green', 'neutral', 'purple'],
  focus: ['DEFAULT', 'support'],
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
    'strong',
    'unknown',
    'warning',
    'weak',
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
    'strong',
    'unknown',
    'warning',
    'weak',
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

// Known role variants where a family expands into an extra slot.
export const SEMANTIC_COLOR_ROLE_VARIANTS = {
  background: {
    selected: ['primary'],
    accent: ['blue', 'brand', 'cyan', 'green', 'neutral', 'purple'],
  },
  dataVis: {
    categorical: ['10', '20', '30', '40', '50', '60', '70', '80'],
  },
} as const;

export type SemanticColorRoleVariants = typeof SEMANTIC_COLOR_ROLE_VARIANTS;

export type SemanticColorRoleVariant<
  T extends keyof SemanticColorRoleVariants,
  F extends keyof SemanticColorRoleVariants[T],
> = SemanticColorRoleVariants[T][F] extends readonly (infer V)[] ? V : never;

export type SemanticColorRoleMetadata = {
  family: string | null;
  variant: string;
};

// Target-aware role metadata shape for callers that want stronger typing.
export type SemanticColorRoleMetadataByTarget<T extends SemanticColorTarget> = {
  family: SemanticColorRoleFamily<T> | null;
  variant: string;
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

export type SemanticColorTokenParseErrorCode =
  | 'NOT_A_COLOR_TOKEN'
  | 'TARGET_NOT_FOUND'
  | 'TARGET_NOT_CANONICAL'
  | 'ROLE_NOT_CANONICAL'
  | 'STATE_NOT_CANONICAL'
  | 'SCALE_NOT_CANONICAL';

export type SemanticColorTokenParseResult =
  | {
      ok: true;
      metadata: SemanticColorTokenMetadata;
    }
  | {
      ok: false;
      code: SemanticColorTokenParseErrorCode;
      message: string;
      input: string;
    };

export type SemanticColorTokenMetadataMapParseOptions = {
  skipNonColorTokens?: boolean;
};

export type SemanticColorTokenMetadataMapParseResult = {
  metadataMap: SemanticColorTokenMetadataMap;
  errors: Record<string, Exclude<SemanticColorTokenParseResult, { ok: true }>>;
};

export type SemanticColorMetadataExportOptions =
  SemanticColorTokenMetadataMapParseOptions & {
    exportName?: string;
    includeErrors?: boolean;
    failOnErrors?: boolean;
    prettySpaces?: number;
  };

type TokenTree = Record<string, unknown>;

function canonicalTokenPathSegments(input: string | string[]) {
  const raw = Array.isArray(input) ? input.join('/') : input;
  const cleaned = raw
    .trim()
    .replace(/[{}]/g, '')
    .replace(/\./g, '/')
    .replace(/\/+/g, '/')
    .replace(/^\//, '')
    .replace(/\/$/, '');

  const segments = cleaned.split('/').filter(Boolean);

  if (segments[0] === 'hpe') {
    return segments.slice(1);
  }

  return segments;
}

function isCanonicalTarget(value: string): value is SemanticColorTarget {
  return SEMANTIC_COLOR_TARGETS.includes(value as SemanticColorTarget);
}

function isCanonicalState(value: string): value is SemanticColorState {
  return SEMANTIC_COLOR_STATES.includes(value as SemanticColorState);
}

function isCanonicalScale(value: string): value is SemanticColorScale {
  return SEMANTIC_COLOR_SCALES.includes(value as SemanticColorScale);
}

export function parseSemanticColorTokenMetadata(
  input: string | string[],
): SemanticColorTokenParseResult {
  const rawInput = Array.isArray(input) ? input.join('/') : input;
  const segments = canonicalTokenPathSegments(input);

  if (segments[0] !== 'color') {
    return {
      ok: false,
      code: 'NOT_A_COLOR_TOKEN',
      message: 'Token path must start with color.',
      input: rawInput,
    };
  }

  const targetSegment = segments[1];
  if (!targetSegment) {
    return {
      ok: false,
      code: 'TARGET_NOT_FOUND',
      message: 'Missing semantic color target segment.',
      input: rawInput,
    };
  }

  if (!isCanonicalTarget(targetSegment)) {
    return {
      ok: false,
      code: 'TARGET_NOT_CANONICAL',
      message: `Unknown semantic color target: ${targetSegment}`,
      input: rawInput,
    };
  }

  // transparent token has no role/scale/state slots.
  if (targetSegment === 'transparent') {
    return {
      ok: true,
      metadata: {
        type: 'color',
        target: 'transparent',
        role: null,
        scale: null,
        state: null,
      },
    };
  }

  const rest = [...segments.slice(2)];
  const stateCandidate = rest[rest.length - 1];
  let state: SemanticColorState | null = null;

  if (stateCandidate && isCanonicalState(stateCandidate)) {
    state = stateCandidate;
    rest.pop();
  } else if (
    stateCandidate &&
    stateCandidate !== 'DEFAULT' &&
    rest.length > 1
  ) {
    return {
      ok: false,
      code: 'STATE_NOT_CANONICAL',
      message: `Unknown semantic color state: ${stateCandidate}`,
      input: rawInput,
    };
  }

  const scaleCandidate = rest[rest.length - 1];
  let scale: SemanticColorScale | null = null;

  if (scaleCandidate) {
    const normalizedScale = scaleCandidate.toLowerCase();
    if (isCanonicalScale(normalizedScale)) {
      scale = normalizedScale;
      rest.pop();
    } else if (scaleCandidate === 'DEFAULT') {
      scale = 'default';
      rest.pop();
    }
  }

  const normalizationSegments = new Set<string>(
    SEMANTIC_COLOR_NORMALIZATION_SEGMENTS,
  );
  const roleParts = rest.filter(part => !normalizationSegments.has(part));

  if (roleParts.length === 0) {
    return {
      ok: true,
      metadata: {
        type: 'color',
        target: targetSegment,
        role: null,
        scale,
        state,
      },
    };
  }

  const family = roleParts[0];
  const canonicalFamilies: readonly string[] =
    SEMANTIC_COLOR_ROLE_FAMILIES_BY_TARGET[targetSegment];

  if (!canonicalFamilies.includes(family)) {
    return {
      ok: false,
      code: 'ROLE_NOT_CANONICAL',
      message: `Unknown semantic color role family: ${roleParts[0]}`,
      input: rawInput,
    };
  }

  const variant =
    roleParts.length > 1 ? roleParts.slice(1).join('-') : roleParts[0];

  const variantFamilies = SEMANTIC_COLOR_ROLE_VARIANTS[
    targetSegment as keyof SemanticColorRoleVariants
  ] as Record<string, readonly string[]> | undefined;
  const variantList = variantFamilies?.[family];

  if (variantList && !variantList.includes(variant)) {
    return {
      ok: false,
      code: 'ROLE_NOT_CANONICAL',
      message: `Unknown variant ${variant} for role family ${family}.`,
      input: rawInput,
    };
  }

  return {
    ok: true,
    metadata: {
      type: 'color',
      target: targetSegment,
      role: {
        family,
        variant,
      },
      scale,
      state,
    },
  };
}

export function parseSemanticColorTokenMetadataMap(
  input: string[] | Record<string, unknown>,
  options: SemanticColorTokenMetadataMapParseOptions = {},
): SemanticColorTokenMetadataMapParseResult {
  const metadataMap: SemanticColorTokenMetadataMap = {};
  const errors: SemanticColorTokenMetadataMapParseResult['errors'] = {};
  const { skipNonColorTokens = true } = options;

  const tokenNames = Array.isArray(input) ? input : Object.keys(input);

  tokenNames.forEach(tokenName => {
    const result = parseSemanticColorTokenMetadata(tokenName);

    if (result.ok) {
      metadataMap[tokenName] = result.metadata;
      return;
    }

    if (skipNonColorTokens && result.code === 'NOT_A_COLOR_TOKEN') {
      return;
    }

    errors[tokenName] = result;
  });

  return {
    metadataMap,
    errors,
  };
}

function isTokenLeaf(value: unknown): value is { $value: unknown } {
  return !!value && typeof value === 'object' && '$value' in value;
}

function collectTokenLeafPaths(
  node: TokenTree,
  prefix: string[] = [],
): string[] {
  return Object.entries(node).flatMap(([key, value]) => {
    if (key.startsWith('$')) {
      return [];
    }

    const path = [...prefix, key];

    if (isTokenLeaf(value)) {
      return [path.join('/')];
    }

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return collectTokenLeafPaths(value as TokenTree, path);
    }

    return [];
  });
}

export function parseSemanticColorTokenMetadataFromTokenTree(
  tokenTree: TokenTree,
  options: SemanticColorTokenMetadataMapParseOptions = {},
): SemanticColorTokenMetadataMapParseResult {
  const tokenNames = collectTokenLeafPaths(tokenTree);
  return parseSemanticColorTokenMetadataMap(tokenNames, options);
}

function semanticColorMetadataErrorMessage(
  errors: SemanticColorTokenMetadataMapParseResult['errors'],
) {
  const details = Object.entries(errors)
    .map(([token, error]) => `${token}: ${error.code}`)
    .join(', ');

  return `Semantic color metadata export failed: ${details}`;
}

export function serializeSemanticColorMetadataModule(
  result: SemanticColorTokenMetadataMapParseResult,
  options: SemanticColorMetadataExportOptions = {},
) {
  const {
    exportName = 'semanticColorMetadata',
    includeErrors = false,
    failOnErrors = false,
    prettySpaces = 2,
  } = options;

  if (failOnErrors && Object.keys(result.errors).length > 0) {
    throw new Error(semanticColorMetadataErrorMessage(result.errors));
  }

  const lines: string[] = [];
  const metadataJson = JSON.stringify(result.metadataMap, null, prettySpaces);
  lines.push(`export const ${exportName} = ${metadataJson};`);

  if (includeErrors) {
    const errorsJson = JSON.stringify(result.errors, null, prettySpaces);
    lines.push(`export const ${exportName}Errors = ${errorsJson};`);
  }

  lines.push(`export default ${exportName};`);

  return `${lines.join('\n')}\n`;
}

export function exportSemanticColorMetadataModuleFromTokenTree(
  tokenTree: TokenTree,
  options: SemanticColorMetadataExportOptions = {},
) {
  const result = parseSemanticColorTokenMetadataFromTokenTree(
    tokenTree,
    options,
  );

  return serializeSemanticColorMetadataModule(result, options);
}
