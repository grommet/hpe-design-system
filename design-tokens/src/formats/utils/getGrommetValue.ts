import { isReference } from '../../utils.js';

const tokenToGrommetRef = (value: string): string => {
  const temp: string[] = value.slice(1, -1).split('.');
  temp.shift();
  return temp.join('-');
};

/**
 * @description Transforms a token reference to grommet reference format. {color.text.strong} -> text-strong
 */
export const getGrommetValue = (token: any, dictionary: any) => {
  let result;
  const originalValue = token.original.value;
  if (token.$type === 'border') {
    let color = originalValue.color;
    if (
      isReference(originalValue.color) &&
      originalValue.color.split('.')[0].includes('color')
    ) {
      color = tokenToGrommetRef(originalValue.color);
    }

    result = {
      color: color,
      width: token.value.width,
      style: token.value.style,
    };
  } else if (
    token.$type !== 'shadow' && // shadow is already transformed
    dictionary.usesReference(originalValue) &&
    !originalValue.split('.')[0].includes('base') &&
    !originalValue.split('.')[0].includes('fontWeight')
  ) {
    // referencing the semantic level, transform to "grommet" format
    // keep as grommet-like reference. For example,
    // '{spacing.small}' --> 'small'
    // '{color.text.strong} --> 'text-strong'
    if (
      originalValue.split('.')[0].includes('spacing') ||
      originalValue.split('.')[0].includes('radius') ||
      originalValue.split('.')[0].includes('content') ||
      originalValue.split('.')[0].includes('borderWidth') ||
      originalValue.split('.')[0].includes('color')
    ) {
      result = tokenToGrommetRef(originalValue);
      if (result === 'full') result = '2em';
    } else {
      const refs = dictionary.getReferences(originalValue);
      let grommetValue;
      refs.forEach((ref: any) => {
        grommetValue = getGrommetValue(ref, dictionary);
      });
      if (grommetValue === 'full') result = '2em';
      else result = grommetValue;
    }
    // references to "base" tokens or non-references should resolve to raw values
  } else result = token.value;

  return result;
};