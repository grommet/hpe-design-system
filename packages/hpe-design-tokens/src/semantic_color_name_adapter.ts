import {
  SEMANTIC_COLOR_NORMALIZATION_SEGMENTS,
  SEMANTIC_COLOR_SCALES,
  SEMANTIC_COLOR_STATES,
} from './semantic_color_core.js';
import { parseSemanticColorTokenMetadata } from './semantic_color_parser.js';

const semanticInteractions = SEMANTIC_COLOR_STATES.filter(
  state => state !== 'REST',
);
const semanticProminences = SEMANTIC_COLOR_SCALES;
const semanticInteractionSet = new Set<string>(semanticInteractions);
const semanticProminenceSet = new Set<string>(semanticProminences);

// Colors that intentionally bypass DEFAULT/REST fill behavior.
const exportExceptionColors = ['color/focus/support', 'color/transparent'];

// Keep focus section handling aligned with current JSON -> Figma naming
// contract.
const importExceptionColors = ['color/focus'];

const normalizationSegmentSet = new Set<string>(
  SEMANTIC_COLOR_NORMALIZATION_SEGMENTS,
);

export function colorNameToHierarchyParts(colorVariableName: string): string[] {
  const parts = colorVariableName.split('/');

  if (parts[0] !== 'color') {
    return parts;
  }

  if (parts[1] === 'background' && parts[2] === 'accent') {
    const section = parts.slice(0, 3);
    const tail = parts.slice(3).join('-');
    if (!tail) {
      return section;
    }

    const tailParts = tail.split('-');
    const interactionCandidate = tailParts[tailParts.length - 1];
    const hasInteraction = semanticInteractionSet.has(interactionCandidate);
    const prominenceIndex = hasInteraction
      ? tailParts.length - 2
      : tailParts.length - 1;
    const prominenceCandidate = tailParts[prominenceIndex];

    if (
      !prominenceCandidate ||
      !semanticProminenceSet.has(prominenceCandidate)
    ) {
      return [...section, tail];
    }

    const colorNameParts = tailParts.slice(0, prominenceIndex);
    const colorName = colorNameParts.join('-');
    if (!colorName) {
      return [...section, tail];
    }

    const normalized = [...section, colorName, prominenceCandidate];
    if (hasInteraction) {
      normalized.push(interactionCandidate);
    }

    return normalized;
  }

  return colorVariableName.replaceAll('-', '/').split('/');
}

export function normalizeColorVariableNameFromFigma(
  colorVariableName: string,
): string {
  const temp = colorNameToHierarchyParts(colorVariableName);
  if (!exportExceptionColors.includes(temp.join('/'))) {
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

  const normalized = temp.join('/');

  // Parse validation is intentionally non-blocking in this adapter layer.
  // This keeps import/export normalization tied to canonical parser coverage.
  parseSemanticColorTokenMetadata(normalized);

  return normalized;
}

export function tokenAliasToFigmaAlias(alias: string): string {
  const isColor = /^color/.test(alias);
  let adjustedName = alias;

  if (isColor) {
    let parts = adjustedName.split('/');
    parts = parts.filter(part => !normalizationSegmentSet.has(part));
    let section = parts.slice(0, 2).join('/');
    let name = parts.slice(2).join('-');

    const isAccentBackground =
      section === 'color/background' && parts[2] === 'accent';

    if (isAccentBackground) {
      section = parts.slice(0, 3).join('/');
      name = parts.slice(3).join('-');
    }

    if (importExceptionColors.includes(section)) {
      section = parts.slice(0, 1).join('/');
      name = parts.slice(1).join('-');
    }

    adjustedName = `${section}${name ? `/${name}` : ''}`;
  }

  return adjustedName;
}
