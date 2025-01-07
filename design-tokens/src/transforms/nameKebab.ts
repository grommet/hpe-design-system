import { Transform, TransformedToken } from 'style-dictionary/types';
// import { kebabCase } from 'change-case';

export const nameKebab: Transform = {
  name: 'name/kebab-hpe',
  type: 'name',
  transform: (token: TransformedToken, { prefix }) => {
    let adjustedName = token.path.join('-').replace(/!/g, '');
    return `${prefix ? `${prefix}-` : ''}${adjustedName}`;
  },
};
