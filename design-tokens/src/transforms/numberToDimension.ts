import { Transform, TransformedToken } from 'style-dictionary/types';

export const numberToDimension: Transform = {
  type: 'value',
  transitive: true,
  matcher: (token: TransformedToken) => {
    if (
      token.attributes?.type &&
      ['dimension', 'fontSize', 'lineHeight', 'spacing'].find(v =>
        token.path.includes(v),
      )
    )
      return true;
    return false;
  },
  transformer: (token: TransformedToken) => {
    const fontToken =
      token.attributes?.type &&
      ['lineHeight', 'fontSize'].includes(token.attributes?.type);

    if (typeof token.value === 'string') return token.value;
    if (fontToken) return `${token.value / 16}rem`;
    return `${token.value}px`;
  },
};
