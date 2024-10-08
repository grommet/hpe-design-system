import { Color } from './figma_api.js';

/**
 * Compares two colors for approximate equality since converting between Figma RGBA objects (from 0 -> 1) and
 * hex colors can result in slight differences.
 */
export function colorApproximatelyEqual(colorA: Color, colorB: Color) {
  return rgbToHex(colorA) === rgbToHex(colorB);
}

export function parseColor(color: string): Color {
  color = color.trim();
  const hexRegex = /^#([A-Fa-f0-9]{6})([A-Fa-f0-9]{2}){0,1}$/;
  const hexShorthandRegex = /^#([A-Fa-f0-9]{3})([A-Fa-f0-9]){0,1}$/;

  if (hexRegex.test(color) || hexShorthandRegex.test(color)) {
    const hexValue = color.substring(1);
    const expandedHex =
      hexValue.length === 3 || hexValue.length === 4
        ? hexValue
            .split('')
            .map(char => char + char)
            .join('')
        : hexValue;

    const alphaValue =
      expandedHex.length === 8 ? expandedHex.slice(6, 8) : undefined;

    return {
      r: parseInt(expandedHex.slice(0, 2), 16) / 255,
      g: parseInt(expandedHex.slice(2, 4), 16) / 255,
      b: parseInt(expandedHex.slice(4, 6), 16) / 255,
      ...(alphaValue
        ? { a: Math.round((parseInt(alphaValue, 16) / 255) * 100) / 100 }
        : {}),
    };
  } else {
    throw new Error('Invalid color format');
  }
}

export function rgbToHex({ r, g, b, a }: Color) {
  if (a === undefined) {
    a = 1;
  }

  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join('');
  return `#${hex}` + (a !== 1 ? toHex(a) : '');
}
