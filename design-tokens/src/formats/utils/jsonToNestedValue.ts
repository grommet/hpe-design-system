import { excludedNameParts } from '../../utils.js';

export const jsonToNestedValue = (
  token: string | { [key: string]: any } | undefined,
  keyPath: string[] = [],
): any => {
  if (!token || typeof token !== 'object') return token;
  if ('$value' in token) return token.$value;
  const nextObj: { [key: string]: any } = {};
  Object.entries(token).forEach(([key, value]) => {
    if (keyPath.length > 2 && keyPath.includes('color')) {
      if (typeof value === 'object' && value !== null) {
        const result = jsonToNestedValue(value, [...keyPath, key]);
        if (typeof result === 'string') {
          nextObj[keyPath.concat(key).join('-')] = result;
        } else {
          Object.entries(result).forEach(([nestedKey, nestedValue]) => {
            nextObj[nestedKey] = nestedValue;
          });
        }
      } else {
        const flatName = keyPath
          .concat(key)
          .slice(3) // TO DO make dynamic (removing hpe, color, category (background, text, icon, ...))
          .filter(part => !excludedNameParts.includes(part))
          .join('-');
        nextObj[flatName] = value;
      }
    } else {
      nextObj[key] = jsonToNestedValue(value, [...keyPath, key]);
    }
  });

  return nextObj;
};
