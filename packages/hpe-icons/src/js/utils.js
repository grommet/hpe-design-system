import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge(target, ...sources) {
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
            output[key] = deepMerge(output[key], source[key]);
          }
        } else {
          output[key] = source[key];
        }
      });
    }
  });
  return output;
}

export const parseMetricToNum = (string = '') =>
  parseFloat(string.match(/\d+(\.\d+)?/), 10);

const calculatePad = (value, iconDimension) =>
  `${(value - iconDimension) / 2}px`;

// iconPad applies padding to icon to ensure it aligns
// with text line-height or desired width
export function iconPad(props) {
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
    const [unit] = theme.text[height].height.match(/(px|rem)/);
    let lineHeight = parseMetricToNum(theme.text[height].height);
    if (unit === 'rem') lineHeight *= rootFontSize;

    if (lineHeight > iconDimension) {
      const pad = calculatePad(lineHeight, iconDimension);
      style += `padding-top: ${pad}; padding-bottom: ${pad};`;
    }
  }

  if (width && theme?.text?.[width]?.height) {
    // the unit on theme text
    const [unit] = theme.text[width].height.match(/(px|rem)/);
    let desiredWidth = parseMetricToNum(theme.text[width].height);
    if (unit === 'rem') desiredWidth *= rootFontSize;

    if (desiredWidth > iconDimension) {
      const pad = calculatePad(desiredWidth, iconDimension);
      style += `padding-left: ${pad}; padding-right: ${pad};`;
    }
  }

  return style;
}

export default {
  deepMerge,
  isObject,
  parseMetricToNum,
  iconPad,
};
