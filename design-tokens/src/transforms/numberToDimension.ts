import { Transform, TransformedToken } from 'style-dictionary/types';

export const numberToDimension: Transform = {
  name: 'numberToDimension',
  type: 'value',
  transitive: true,
  filter: (token: TransformedToken) => {
    if (
      token.attributes?.type &&
      // TO DO automate this
      [
        'dimension',
        'fontSize',
        'lineHeight',
        'spacing',
        'radius',
        'paddingX',
        'paddingY',
        'paddingBottom',
        'paddingTop',
        'width',
        'height',
        'borderRadius',
        'borderWidth',
        'breakpoint',
        'outlineOffset',
        'top',
        'left',
        'bottom',
        'right',
        'icon',
      ].find(v => token.path.includes(v))
    )
      return true;
    return false;
  },
  transform: (token: TransformedToken) => {
    const fontToken = ['lineHeight', 'fontSize'].find(v =>
      token.path.includes(v),
    );

    if (typeof token.$value === 'string') return token.$value;
    if (fontToken) return `${token.$value / 16}rem`;
    return `${token.$value}px`;
  },
};
