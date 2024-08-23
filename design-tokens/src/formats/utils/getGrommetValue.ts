/**
 * @description Transforms a token reference to grommet reference format. {color.text.strong} -> text-strong
 */
export const getGrommetValue = (token: any, dictionary: any) => {
  let result;
  const originalValue = token.original.value;
  if (
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
      const temp: string[] = originalValue.slice(1, -1).split('.');
      temp.shift();
      result = temp.join('-');
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
