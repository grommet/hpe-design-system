import { Transform, TransformedToken } from 'style-dictionary/types';

export const numberToDimension: Transform = {
  type: 'value',
  transitive: true,
  matcher: (token: TransformedToken) => {
    if (
      token.attributes?.type &&
      // TO DO automate this
      [
        'dimension',
        'fontSize',
        'lineHeight',
        'spacing',
        'paddingX',
        'paddingY',
        'paddingBottom',
        'paddingTop',
        'width',
        'height',
        'borderRadius',
        'borderWidth',
        'breakpoint',
      ].find(v => token.path.includes(v))
    )
      return true;
    return false;
  },
  transformer: (token: TransformedToken) => {
    const fontToken = ['lineHeight', 'fontSize'].find(v =>
      token.path.includes(v),
    );

    if (typeof token.value === 'string') return token.value;
    if (fontToken) return `${token.value / 16}rem`;
    return `${token.value}px`;
  },
};
