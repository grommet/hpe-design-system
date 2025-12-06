import { Transform } from 'style-dictionary/types';

// supporting our own transform because style-dictionary doesn't support inset
export const shadowCSS: Transform = {
  name: 'shadow/css/shorthand',
  type: 'value',
  // shadow properties can be references
  transitive: true,
  filter: token => token.$type === 'shadow',
  transform: (token, _, options) => {
    const val = options.usesDtcg ? token.$value : token.value;
    if (typeof val !== 'object') {
      // already transformed to string
      return val;
    }

    const stringifyShadow = (val: any) => {
      // check if the shadows are objects, they might already be transformed to strings if they were refs
      if (typeof val !== 'object') {
        return val;
      }
      const { type, color, offsetX, offsetY, blur, spread, inset } = val;
      return `${type ? `${type} ` : ''}${offsetX ?? 0} ${offsetY ?? 0} ${
        blur ?? 0
      } ${spread ? `${spread} ` : ''}${color ?? `#000000`} ${
        inset ? `inset` : ''
      }`;
    };

    if (Array.isArray(val)) {
      return val.map(stringifyShadow).join(', ');
    }
    return stringifyShadow(val);
  },
};
