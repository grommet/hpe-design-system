// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY,
  SEMANTIC_COLOR_FIGMA_FAMILIES_BY_TARGET,
  SEMANTIC_COLOR_NORMALIZATION_SEGMENTS,
  SEMANTIC_COLOR_SCALES,
  SEMANTIC_COLOR_STATES,
  type SemanticColorScale,
  type SemanticColorState,
  type SemanticColorTarget,
} from './semantic_color_core.js';

export const SEMANTIC_COLOR_EXPORT_EXCEPTION_ALIASES = [
  'color/focus/support',
  'color/transparent',
] as const;

export const SEMANTIC_COLOR_IMPORT_EXCEPTION_SECTIONS = [
  'color/focus',
] as const;

const semanticInteractions = SEMANTIC_COLOR_STATES.filter(
  state => state !== 'REST',
);
const semanticProminences = SEMANTIC_COLOR_SCALES;

const semanticInteractionSet = new Set<string>(semanticInteractions);
const semanticProminenceSet = new Set<string>(semanticProminences);

export const normalizationSegmentSet = new Set<string>(
  SEMANTIC_COLOR_NORMALIZATION_SEGMENTS,
);

function isCanonicalState(value: string): value is SemanticColorState {
  return SEMANTIC_COLOR_STATES.includes(value as SemanticColorState);
}

function isCanonicalScale(value: string): value is SemanticColorScale {
  return SEMANTIC_COLOR_SCALES.includes(value as SemanticColorScale);
}

export function canonicalTokenPathSegments(input: string | string[]) {
  // Input cleaning contract is documented in
  // docs/SEMANTIC_COLOR_PATH_CONTRACT.md.
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

export function expandCompactRoleSegment(
  target: SemanticColorTarget,
  segment: string,
  knownFamily?: string,
) {
  const partTokens = segment.split('-').filter(Boolean);
  if (partTokens.length <= 1) {
    return [segment];
  }

  const firstPart = partTokens[0];
  const lastPart = partTokens[partTokens.length - 1];

  if (!knownFamily) {
    const roleNamesByFamily = SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY[
      target as keyof typeof SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY
    ] as Record<string, readonly string[]> | undefined;
    const compactFamily = firstPart;
    const compactRoleName = partTokens.slice(1).join('-');
    const compactRoleNameOptions = roleNamesByFamily?.[compactFamily];

    if (compactRoleNameOptions?.includes(compactRoleName)) {
      return [compactFamily, compactRoleName];
    }
  }

  const interactionCandidate = lastPart;
  const hasInteraction = isCanonicalState(
    interactionCandidate as SemanticColorState,
  );
  const scaleIndex = hasInteraction
    ? partTokens.length - 2
    : partTokens.length - 1;
  const scaleCandidate = partTokens[scaleIndex];
  const normalizedScale = scaleCandidate?.toLowerCase();
  const hasScale =
    !!normalizedScale &&
    (isCanonicalScale(normalizedScale as SemanticColorScale) ||
      scaleCandidate === 'DEFAULT');

  if (!hasScale && !hasInteraction) {
    return [segment];
  }

  let roleNameEndIndex = scaleIndex;
  if (hasInteraction && !hasScale) {
    roleNameEndIndex = partTokens.length - 1;
  }
  const roleNameParts = partTokens.slice(0, roleNameEndIndex);
  if (roleNameParts.length === 0) {
    return [segment];
  }

  const expanded = [roleNameParts.join('-')];
  if (hasScale) {
    expanded.push(scaleCandidate);
  }
  if (hasInteraction) {
    expanded.push(interactionCandidate);
  }

  return expanded;
}

export function normalizeRoleSegments(
  target: SemanticColorTarget,
  segments: string[],
) {
  if (segments.length === 1) {
    return expandCompactRoleSegment(target, segments[0]);
  }

  if (segments.length === 2 && segments[1].includes('-')) {
    return [
      segments[0],
      ...expandCompactRoleSegment(target, segments[1], segments[0]),
    ];
  }

  return segments;
}

export function colorNameToHierarchyPartsCore(
  colorVariableName: string,
): string[] {
  const parts = colorVariableName.split('/');
  const [tokenType, target, role, ...tailParts] = parts;

  if (tokenType !== 'color') {
    return parts;
  }

  const roleNamesByFamily = SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY[
    target as keyof typeof SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY
  ] as Record<string, readonly string[]> | undefined;

  if (roleNamesByFamily?.[role]) {
    const section = [tokenType, target, role];
    const tail = tailParts.join('-');
    if (!tail) {
      return section;
    }

    const expanded = expandCompactRoleSegment(
      target as keyof typeof SEMANTIC_COLOR_SUBROLES_BY_TARGET_FAMILY,
      tail,
      role,
    );

    const [expandedTail, ...remainingExpandedParts] = expanded;
    if (remainingExpandedParts.length === 0 && expandedTail === tail) {
      return [...section, tail];
    }

    return [...section, ...expanded];
  }

  return colorVariableName.replaceAll('-', '/').split('/');
}

export function normalizeColorVariableNameFromFigmaCore(
  colorVariableName: string,
): string {
  // Figma -> canonical path normalization contract:
  // docs/SEMANTIC_COLOR_PATH_CONTRACT.md.
  const temp = colorNameToHierarchyPartsCore(colorVariableName);
  if (
    !(SEMANTIC_COLOR_EXPORT_EXCEPTION_ALIASES as readonly string[]).includes(
      temp.join('/'),
    )
  ) {
    if (
      !semanticInteractionSet.has(temp[temp.length - 1]) ||
      temp.join('/') === 'color/focus'
    ) {
      temp.push('REST');
    }

    if (!semanticProminenceSet.has(temp[temp.length - 2])) {
      temp.splice(temp.length - 1, 0, 'DEFAULT');
    }
  }

  return temp.join('/');
}

export function tokenAliasToFigmaAliasCore(alias: string): string {
  // Canonical alias -> Figma alias contract:
  // docs/SEMANTIC_COLOR_PATH_CONTRACT.md.
  const isColor = /^color/.test(alias);
  let adjustedName = alias;

  if (isColor) {
    const parts = adjustedName
      .split('/')
      .filter(part => !normalizationSegmentSet.has(part));
    const [tokenType, target, role, ...tailParts] = parts;

    if (tokenType !== 'color') {
      return adjustedName;
    }

    const nestedRoleNames = SEMANTIC_COLOR_FIGMA_FAMILIES_BY_TARGET[
      target as keyof typeof SEMANTIC_COLOR_FIGMA_FAMILIES_BY_TARGET
    ] as readonly string[] | undefined;
    const isNestedRoleName = nestedRoleNames?.includes(role) ?? false;
    const sectionParts = isNestedRoleName
      ? [tokenType, target, role]
      : [tokenType, target];
    const nameParts = isNestedRoleName ? tailParts : [role, ...tailParts];
    const section = sectionParts.join('/');
    const name = nameParts.join('-');

    if (
      (SEMANTIC_COLOR_IMPORT_EXCEPTION_SECTIONS as readonly string[]).includes(
        section,
      )
    ) {
      const exceptionName = [target, role, ...tailParts]
        .filter(Boolean)
        .join('-');
      adjustedName = [tokenType, exceptionName].filter(Boolean).join('/');

      return adjustedName;
    }

    adjustedName = `${section}${name ? `/${name}` : ''}`;
  }

  return adjustedName;
}
