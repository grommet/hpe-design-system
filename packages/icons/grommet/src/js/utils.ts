import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    icon?: {
      disableScaleDown?: boolean;
      size?: Record<string, string>;
    };
    text?: Record<string, { height: string }>;
  }
}

export function isObject(item: unknown): item is Record<string, unknown> {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

type ThemeObject = {
  [key: string]: unknown;
};

export const deepMerge = (
  target: ThemeObject,
  ...sources: Partial<ThemeObject>[]
): ThemeObject => {
  if (!sources.length) {
    return target;
  }
  // making sure to not change target (immutable)
  const output = { ...target };
  sources.forEach(source => {
    if (isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!output[key]) {
            output[key] = { ...source[key] };
          } else {
            output[key] = deepMerge(
              output[key] as ThemeObject,
              source[key] as ThemeObject,
            );
          }
        } else {
          output[key] = source[key];
        }
      });
    }
  });
  return output;
};

export const parseMetricToNum = (string = '') =>
  parseFloat(string.match(/\d+(\.\d+)?/)?.[0] || '0');

interface CalculatePadParams {
  value: number;
  iconDimension: number;
}

const calculatePad = ({ value, iconDimension }: CalculatePadParams): string =>
  `${(value - iconDimension) / 2}px`;

interface IconPadProps {
  height?: string;
  size?: string;
  width?: string;
}

// useIconPad applies padding to icon to ensure it aligns
// with text line-height or desired width
export function useIconPad(props: IconPadProps): string {
  const { height, size = 'medium', width } = props;
  const theme = useContext(ThemeContext);
  const iconDimension = parseMetricToNum(theme?.icon?.size?.[size] || size);

  let style = '';
  // browser default is 16px, but accommodate if app has modified
  // include fallback in case window is undefined
  const FALLBACK = '16px';
  let rootFontSize = parseMetricToNum(FALLBACK);
  if (typeof window !== 'undefined') {
    rootFontSize = parseMetricToNum(
      window?.getComputedStyle(document.body).getPropertyValue('font-size') ||
        FALLBACK,
    );
  }
  if (height && theme?.text?.[height]?.height) {
    // the unit on theme text
    const [unit] = theme.text[height].height.match(
      /(px|rem)/,
    ) as RegExpMatchArray;
    let lineHeight = parseMetricToNum(theme.text[height].height);
    if (unit === 'rem') lineHeight *= rootFontSize;

    if (lineHeight > iconDimension) {
      const pad = calculatePad({ value: lineHeight, iconDimension });
      style += `padding-top: ${pad}; padding-bottom: ${pad};`;
    }
  }

  if (width && theme?.text?.[width]?.height) {
    // the unit on theme text
    const [unit] = theme.text[width].height.match(
      /(px|rem)/,
    ) as RegExpMatchArray;
    let desiredWidth = parseMetricToNum(theme.text[width].height);
    if (unit === 'rem') desiredWidth *= rootFontSize;

    if (desiredWidth > iconDimension) {
      const pad = calculatePad({ value: desiredWidth, iconDimension });
      style += `padding-left: ${pad}; padding-right: ${pad};`;
    }
  }

  return style;
}

// ensure icons that rely on urls don't have id collision
// Date.now + Math.random is unique enough for icon use cases
export const generatePrefix = (name: string) =>
  `_grommeticons-${name}-${
    // don't include time-based/random id generation in snapshot tests to avoid
    // needing to update snapshots with every commit
    process.env.NODE_ENV !== 'test' ? Date.now() + Math.random() : ''
  }`;

export default {
  deepMerge,
  isObject,
  parseMetricToNum,
  useIconPad,
};
