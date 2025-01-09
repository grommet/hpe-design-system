import { access, deepMerge, excludedNameParts } from '../../utils.js';

export const jsonToNestedValue = (
  token: string | { [key: string]: any } | undefined,
  result: { [key: string]: any } = {},
) => {
  if (!token || typeof token !== 'object') return token;
  if ('$value' in token) return token.$value;
  const nextObj: { [key: string]: any } = {};
  Object.entries(token).forEach(([key, value]) => {
    // handle semantic colors
    if (value['$type'] === 'color' && value.filePath.includes('color')) {
      // attributes = { category: '', type: '', item: '', subitem: '', state: '' }
      // path = array of all token parts
      // desired "flat" structure is to flatten from indexOf "item" onward in path.
      if (value.attributes.item) {
        const flatName = value.path
          .slice(value.path.indexOf(value.attributes.item))
          .filter((part: string) => !excludedNameParts.includes(part))
          .join('-');
        const prefix = value.path
          .slice(0, value.path.indexOf(value.attributes.item))
          .join('.');

        if (!access(prefix, result)) {
          const temp = {};
          prefix
            .split('.')
            .reduce((o: { [x: string]: {} }, s: string | number) => {
              return (o[s] = {});
            }, temp);

          deepMerge(result, temp);
        }
        const targetLocation = `${prefix}.${flatName}`;
        const pathArray = targetLocation.split('.');
        const lastNode = pathArray[pathArray.length - 1];
        let node = result;
        pathArray.forEach(
          (path, index) =>
            (node = index === pathArray.length - 1 ? node : node[path]),
        );
        node[lastNode] = value.$value;
      }
    } else nextObj[key] = jsonToNestedValue(value, result);
  });

  return nextObj;
};
