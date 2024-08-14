import * as fs from 'fs';

const flattenObject = (obj, delimiter = '.', prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0 &&
      !('$value' in obj[k])
    )
      Object.assign(acc, flattenObject(obj[k], delimiter, pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});

const TOKENS_DIR = 'tokens';

const tree = {};

fs.readdirSync(TOKENS_DIR).forEach(file => {
  // [tokens/color, light, json]
  const mode = file.split('.')[1];
  const raw = fs.readFileSync(`${TOKENS_DIR}/${file}`);
  const parsed = JSON.parse(raw);
  const flat = flattenObject(parsed, '.');
  if (!(mode in tree)) tree[mode] = {};
  tree[mode] = { ...tree[mode], ...flat };
});

Object.keys(tree).forEach(mode => {
  Object.keys(tree[mode]).forEach(key => {
    // if it's a reference, add it to the "usedBy" for the referenced token
    const value = tree[mode][key].$value;
    if (/^{.*}$/.test(value)) {
      const token = value.slice(1, -1);
      // when mode is "default", it's a component token
      // for color tokens, add it to the used by for "light" and "dark" modes
      // for dimension tokens, addit to the used by for "large" and "small"
      const referenceModes = [];
      if (mode === 'default') {
        if (token.includes('component')) referenceModes.push('default');
        if (tree[mode][key].$type === 'color')
          referenceModes.push(...['light', 'dark']);
        else if (tree[mode][key].$type === 'number')
          referenceModes.push(...['large', 'small']);
      } else {
        referenceModes.push(tree[mode][token] ? mode : 'base');
      }
      referenceModes.forEach(referenceMode => {
        // if this is the first reference, create `usedBy`
        // is it within this mode?
        if (tree[referenceMode][token]) {
          if (!('usedBy' in tree[referenceMode][token])) {
            tree[referenceMode][token].usedBy = [
              {
                name: key,
                mode,
              },
            ];
          } else
            tree[referenceMode][token].usedBy.push({
              name: key,
              mode,
            });
        }
      });
    }
  });
});

fs.mkdirSync('./dist/tree');
fs.writeFileSync(
  './dist/tree/index.js',
  `export default ${JSON.stringify(tree, null, 2)}`,
);
