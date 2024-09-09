import * as tokens from 'hpe-design-tokens/docs';

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

export const buildTokenTree = () => {
  const tree = {};

  Object.keys(tokens).forEach(collection => {
    let mode = collection;
    if (
      collection === 'base' ||
      collection === 'components' ||
      collection === 'global'
    ) {
      mode = 'default';
    } else if (collection.includes('elevation'))
      mode = collection.replace('elevation', '');

    const flat = flattenObject(tokens[collection], '.');
    if (!(mode in tree)) tree[mode] = {};
    tree[mode] = { ...tree[mode], ...flat };
  });

  Object.keys(tree).forEach(mode => {
    Object.keys(tree[mode]).forEach(key => {
      // if it's a reference, add it to the "usedBy" for the referenced token
      const value = tree[mode][key].$value;
      if (/^{.*}$/.test(value)) {
        const token = value.slice(1, -1);
        // for color tokens, add it to the used by for "light" and "dark" modes
        // for dimension tokens, addit to the used by for "large" and "small"
        // otherwise, mode is "default"
        const referenceModes = [];
        if (mode === 'default') {
          if (token.includes('component')) referenceModes.push('default');
          if (tree[mode][key].$type === 'color')
            referenceModes.push(...['light', 'dark']);
          else if (tree[mode][key].$type === 'number')
            referenceModes.push(...['large', 'small']);
        } else {
          referenceModes.push(tree[mode][token] ? mode : 'default');
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

  return tree;
};

// const TOKENS_DIR = 'tokens';
// const tokenDirs = fs
//   .readdirSync(TOKENS_DIR, { withFileTypes: true })
//   .filter(dir => dir.isDirectory())
//   .map(dir => dir.name);

// tokenDirs.forEach(dir => {
//   fs.readdirSync(`${TOKENS_DIR}/${dir}`).forEach(file => {
//     // [tokens/color, light, json]
//     const mode = file.split('.')[1];
//     const raw = fs.readFileSync(`${TOKENS_DIR}/${dir}/${file}`);
//     const parsed = JSON.parse(raw);
//     const flat = flattenObject(parsed, '.');
//     if (!(mode in tree)) tree[mode] = {};
//     tree[mode] = { ...tree[mode], ...flat };
//   });
// });

// fs.mkdirSync('./dist/tree');
// fs.writeFileSync(
//   './dist/tree/index.js',
//   `export default ${JSON.stringify(tree, null, 2)}`,
// );
