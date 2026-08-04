import {
  colorNameToHierarchyPartsCore,
  normalizeColorVariableNameFromFigmaCore,
  tokenAliasToFigmaAliasCore,
} from './semantic_color_normalization_core.js';

export function colorNameToHierarchyParts(colorVariableName: string): string[] {
  return colorNameToHierarchyPartsCore(colorVariableName);
}

export function normalizeColorVariableNameFromFigma(
  colorVariableName: string,
): string {
  return normalizeColorVariableNameFromFigmaCore(colorVariableName);
}

export function tokenAliasToFigmaAlias(alias: string): string {
  return tokenAliasToFigmaAliasCore(alias);
}
