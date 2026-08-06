// Parses semantic color token paths into canonical metadata and exports
// helpers to serialize that metadata for build artifacts.
import {
  SEMANTIC_COLOR_ROLE_FAMILIES_BY_TARGET,
  SEMANTIC_COLOR_ROLE_INTENTS_BY_FAMILY,
  SEMANTIC_COLOR_SCALES,
  SEMANTIC_COLOR_STATES,
  SEMANTIC_COLOR_TARGETS,
  type SemanticColorScale,
  type SemanticColorState,
  type SemanticColorTarget,
  type SemanticColorTokenMetadata,
  type SemanticColorTokenMetadataMap,
} from './semantic_color_core.js';
import {
  canonicalTokenPathSegments,
  normalizationSegmentSet,
  normalizeRoleSegments,
} from './semantic_color_normalization.js';

export type SemanticColorTokenParseErrorCode =
  | 'NOT_A_COLOR_TOKEN'
  | 'TARGET_NOT_FOUND'
  | 'TARGET_NOT_CANONICAL'
  | 'ROLE_NOT_CANONICAL';

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

export type SemanticColorTokenParseSource =
  'canonical-token' | 'figma-variable';

export type SemanticColorTokenExceptionCode =
  'NO_ROLE_EXCEPTION' | 'NON_CANONICAL_ROLE_EXCEPTION';

export type SemanticColorTokenParseOptions = {
  allowNonCanonicalRoleIntent?: boolean;
};

export type SemanticColorTokenException = {
  code: SemanticColorTokenExceptionCode;
  message: string;
  input: string;
  source?: SemanticColorTokenParseSource;
};

export type SemanticColorTokenMetadataMapParseOptions = {
  skipNonColorTokens?: boolean;
  source?: SemanticColorTokenParseSource;
  softExceptionOnNonCanonicalRole?: boolean;
};

export type SemanticColorTokenMetadataMapParseResult = {
  metadataMap: SemanticColorTokenMetadataMap;
  errors: Record<string, Exclude<SemanticColorTokenParseResult, { ok: true }>>;
  exceptions: Record<string, SemanticColorTokenException>;
};

export type SemanticColorMetadataExportOptions =
  SemanticColorTokenMetadataMapParseOptions & {
    exportName?: string;
    includeErrors?: boolean;
    includeExceptions?: boolean;
    failOnErrors?: boolean;
    prettySpaces?: number;
  };

type TokenTree = Record<string, unknown>;

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
  options: SemanticColorTokenParseOptions = {},
): SemanticColorTokenParseResult {
  const { allowNonCanonicalRoleIntent = false } = options;
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

  // Special case for transparent, which does not have role, scale, or state.
  // How might we redefine the semantic color token path structure to avoid
  // this special case?
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

  const rest = normalizeRoleSegments(targetSegment, [...segments.slice(2)]);
  const canonicalFamilies: readonly string[] =
    SEMANTIC_COLOR_ROLE_FAMILIES_BY_TARGET[targetSegment];
  const stateCandidate = rest[rest.length - 1];
  let state: SemanticColorState | null = null;

  if (stateCandidate && isCanonicalState(stateCandidate)) {
    state = stateCandidate;
    rest.pop();
  }

  const scaleCandidate = rest[rest.length - 1];
  let scale: SemanticColorScale | null = null;

  if (scaleCandidate) {
    const normalizedScale = scaleCandidate.toLowerCase();
    const shouldPreserveAsRole =
      rest.length === 1 && canonicalFamilies.includes(scaleCandidate);
    if (isCanonicalScale(normalizedScale) && !shouldPreserveAsRole) {
      scale = normalizedScale;
      rest.pop();
    } else if (scaleCandidate === 'DEFAULT' && !shouldPreserveAsRole) {
      scale = 'default';
      rest.pop();
    }
  }

  const roleParts = rest.filter(part => !normalizationSegmentSet.has(part));

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

  const intentFamilies = SEMANTIC_COLOR_ROLE_INTENTS_BY_FAMILY[
    targetSegment as keyof typeof SEMANTIC_COLOR_ROLE_INTENTS_BY_FAMILY
  ] as Record<string, readonly string[]> | undefined;

  const familyIsCanonical = canonicalFamilies.includes(family);
  const shouldTreatFirstAsFamily = familyIsCanonical && roleParts.length > 1;

  let roleFamily: string | null = null;
  let roleIntent = '';

  if (shouldTreatFirstAsFamily) {
    roleFamily = family;
    roleIntent = roleParts.slice(1).join('-');
  } else {
    roleIntent = roleParts.join('-');
  }

  if (!roleIntent) {
    return {
      ok: false,
      code: 'ROLE_NOT_CANONICAL',
      // eslint-disable-next-line max-len
      message: `Missing semantic color role intent for target ${targetSegment}.`,
      input: rawInput,
    };
  }

  if (!shouldTreatFirstAsFamily && !canonicalFamilies.includes(roleIntent)) {
    if (allowNonCanonicalRoleIntent) {
      return {
        ok: true,
        metadata: {
          type: 'color',
          target: targetSegment,
          role: {
            family: roleFamily,
            intent: roleIntent,
          },
          scale,
          state,
        },
      };
    }

    return {
      ok: false,
      code: 'ROLE_NOT_CANONICAL',
      message: `Unknown semantic color role intent: ${roleIntent}`,
      input: rawInput,
    };
  }

  if (roleFamily) {
    const allowedIntents = intentFamilies?.[roleFamily];
    if (allowedIntents && !allowedIntents.includes(roleIntent)) {
      if (allowNonCanonicalRoleIntent) {
        return {
          ok: true,
          metadata: {
            type: 'color',
            target: targetSegment,
            role: {
              family: roleFamily,
              intent: roleIntent,
            },
            scale,
            state,
          },
        };
      }

      return {
        ok: false,
        code: 'ROLE_NOT_CANONICAL',
        message: `Unknown intent ${roleIntent} for role family ${roleFamily}.`,
        input: rawInput,
      };
    }
  }

  return {
    ok: true,
    metadata: {
      type: 'color',
      target: targetSegment,
      role: {
        family: roleFamily,
        intent: roleIntent,
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
  const exceptions: SemanticColorTokenMetadataMapParseResult['exceptions'] = {};
  const {
    skipNonColorTokens = true,
    source,
    softExceptionOnNonCanonicalRole = false,
  } = options;

  const tokenNames = Array.isArray(input) ? input : Object.keys(input);

  tokenNames.forEach(tokenName => {
    const result = parseSemanticColorTokenMetadata(tokenName);

    if (result.ok) {
      metadataMap[tokenName] = result.metadata;

      if (result.metadata.role === null) {
        exceptions[tokenName] = {
          code: 'NO_ROLE_EXCEPTION',
          message:
            'Token requires special handling because it has no semantic role:' +
            ` ${tokenName}`,
          input: tokenName,
          source,
        };
      }

      return;
    }

    if (skipNonColorTokens && result.code === 'NOT_A_COLOR_TOKEN') {
      return;
    }

    if (
      softExceptionOnNonCanonicalRole &&
      result.code === 'ROLE_NOT_CANONICAL'
    ) {
      const softParsed = parseSemanticColorTokenMetadata(tokenName, {
        allowNonCanonicalRoleIntent: true,
      });

      if (softParsed.ok) {
        metadataMap[tokenName] = softParsed.metadata;
        exceptions[tokenName] = {
          code: 'NON_CANONICAL_ROLE_EXCEPTION',
          message:
            'Token role is non-canonical and requires explicit downstream' +
            'handling:' +
            ` ${tokenName}`,
          input: tokenName,
          source,
        };
        return;
      }
    }

    errors[tokenName] = result;
  });

  return {
    metadataMap,
    errors,
    exceptions,
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

export function collectSemanticColorTokenLeafPathsFromTokenTree(
  tokenTree: TokenTree,
) {
  return collectTokenLeafPaths(tokenTree);
}

export function parseSemanticColorTokenMetadataFromTokenTree(
  tokenTree: TokenTree,
  options: SemanticColorTokenMetadataMapParseOptions = {},
): SemanticColorTokenMetadataMapParseResult {
  const tokenNames = collectSemanticColorTokenLeafPathsFromTokenTree(tokenTree);
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
    includeExceptions = false,
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

  if (includeExceptions) {
    const exceptionsJson = JSON.stringify(
      result.exceptions,
      null,
      prettySpaces,
    );
    lines.push(`export const ${exportName}Exceptions = ${exceptionsJson};`);
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
