export const buildTokenTree = tokens => {
  const tree = {};

  Object.keys(tokens).forEach(collection => {
    let mode = collection;
    if (
      collection === 'primitives' ||
      collection === 'components' ||
      collection === 'global' ||
      collection === 'dimension'
    ) {
      mode = 'default';
    }

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
      const value = tree[mode][key].original.$value;
      if (/^{.*}$/.test(value)) {
        const token = value.slice(1, -1);
        // Determine which modes to check for references
        const referenceModes = new Set();

        // Add default mode for component tokens
        if (token.includes('component')) {
          referenceModes.add('default');
        }

        // For default mode, add specific modes based on token type
        if (mode === 'default') {
          if (tree[mode][key].$type === 'color') {
            referenceModes.add('light');
            referenceModes.add('dark');
          } else if (tree[mode][key].$type === 'number') {
            referenceModes.add('small');
          }
        }

        // Add current mode if the token exists there
        const formattedToken = `hpe.${token
          .split('.')
          .filter(part => !['DEFAULT', 'REST'].includes(part))
          .join('.')}`;
        if (tree[mode][formattedToken]) {
          referenceModes.add(mode);
        } else {
          referenceModes.add('default');
        }

        // Check each possible reference mode
        referenceModes.forEach(referenceMode => {
          const reference = tree[referenceMode][formattedToken];
          if (reference) {
            if (!('usedBy' in reference)) {
              reference.usedBy = [];
            }

            // Check if this reference already exists
            const existingRef = reference.usedBy.find(
              ref => ref.name === key && ref.mode === mode,
            );

            if (!existingRef) {
              reference.usedBy.push({
                name: key,
                mode,
              });
            }
          }
        });
        // });
      }
    });
  });

  return tree;
};
