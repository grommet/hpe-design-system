export const buildTokenTree = tokens => {
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

    const flat = Object.fromEntries(
      Object.keys(tokens[collection]).map(token => [
        token,
        tokens[collection][token],
      ]),
    );
    if (!(mode in tree)) tree[mode] = {};
    tree[mode] = { ...tree[mode], ...flat };
  });

  Object.keys(tree).forEach(mode => {
    Object.keys(tree[mode]).forEach(key => {
      // if it's a reference, add it to the "usedBy" for the referenced token
      const value = tree[mode][key].original.value;
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
          const reference = tree[referenceMode][`hpe.${token}`];
          if (reference) {
            if (!('usedBy' in reference)) {
              reference.usedBy = [
                {
                  name: key,
                  mode,
                },
              ];
            } else if (
              !reference.usedBy.find(
                ref => ref.name === key && ref.mode === mode,
              )
            ) {
              reference.usedBy.push({
                name: key,
                mode,
              });
            }
          }
        });
      }
    });
  });

  return tree;
};
