import { describe, expect, it } from 'vitest';

import {
  normalizeColorVariableNameFromFigma,
  tokenAliasToFigmaAlias,
} from '../semantic_color_name_adapter.js';

function legacyColorNameToHierarchyParts(colorVariableName: string): string[] {
  const interactions = ['hover', 'focus', 'active'];
  const prominences = ['xweak', 'weak', 'default', 'strong', 'xstrong'];
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
    const hasInteraction = interactions.includes(interactionCandidate);
    const prominenceIndex = hasInteraction
      ? tailParts.length - 2
      : tailParts.length - 1;
    const prominenceCandidate = tailParts[prominenceIndex];

    if (!prominenceCandidate || !prominences.includes(prominenceCandidate)) {
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

function legacyNormalizeColorVariableNameFromFigma(
  colorVariableName: string,
): string {
  const interactions = ['hover', 'focus', 'active'];
  const prominences = ['xweak', 'weak', 'default', 'strong', 'xstrong'];
  const exceptionColors = ['color/focus/support', 'color/transparent'];
  const temp = legacyColorNameToHierarchyParts(colorVariableName);

  if (!exceptionColors.includes(temp.join('/'))) {
    if (
      !interactions.includes(temp[temp.length - 1]) ||
      temp.join('/') === 'color/focus'
    ) {
      temp.push('REST');
    }

    if (!prominences.includes(temp[temp.length - 2])) {
      temp.splice(temp.length - 1, 0, 'DEFAULT');
    }
  }

  return temp.join('/');
}

function legacyTokenAliasToFigmaAlias(alias: string): string {
  const exceptionColors = ['color/focus'];
  const excludedNameParts = ['DEFAULT', 'REST'];
  const isColor = /^color/.test(alias);
  let adjustedName = alias;

  if (isColor) {
    let parts = adjustedName.split('/');
    parts = parts.filter(part => !excludedNameParts.includes(part));
    let section = parts.slice(0, 2).join('/');
    let name = parts.slice(2).join('-');

    if (section === 'color/background' && parts[2] === 'accent') {
      section = parts.slice(0, 3).join('/');
      name = parts.slice(3).join('-');
    }

    if (exceptionColors.includes(section)) {
      section = parts.slice(0, 1).join('/');
      name = parts.slice(1).join('-');
    }

    adjustedName = `${section}${name ? `/${name}` : ''}`;
  }

  return adjustedName;
}

describe('semantic_color_name_adapter parity', () => {
  it('matches legacy Figma -> token path normalization outputs', () => {
    const figmaNames = [
      'color/background/critical-weak',
      'color/background/critical-weak-hover',
      'color/background/critical-weak-focus',
      'color/background/critical-default-active',
      'color/background/accent/purple-strong',
      'color/background/accent/purple-strong-hover',
      'color/background/accent/purple-default-focus',
      'color/background/accent/purple',
      'color/focus/support',
      'color/transparent',
      'color/text/default',
      'color/brand/radish',
      'spacing/medium',
    ];

    figmaNames.forEach(name => {
      expect(normalizeColorVariableNameFromFigma(name)).toBe(
        legacyNormalizeColorVariableNameFromFigma(name),
      );
    });
  });

  it('matches legacy token path -> Figma alias normalization outputs', () => {
    const tokenAliases = [
      'color/background/critical/weak/DEFAULT/REST',
      'color/background/critical/weak/focus',
      'color/background/critical/default/active',
      'color/background/selected/primary/DEFAULT/REST',
      'color/background/accent/purple/strong/REST',
      'color/background/accent/purple/strong/hover',
      'color/background/accent/purple/default/focus',
      'color/background/default/REST',
      'color/text/default/REST',
      'color/focus/support/DEFAULT/REST',
      'color/transparent',
      'spacing/medium',
    ];

    tokenAliases.forEach(alias => {
      expect(tokenAliasToFigmaAlias(alias)).toBe(
        legacyTokenAliasToFigmaAlias(alias),
      );
    });
  });
});
