module.exports = {
  rules: {
    'alt-text': {
      create(context) {
        return {
          JSXElement(node) {
            if (node?.openingElement?.name?.name === 'Image') {
              let alt = false;
              node.openingElement.attributes.forEach(attribute => {
                if (attribute?.name?.name === 'alt') alt = true;
              });
              if (!alt)
                context.report(
                  node,
                  // eslint-disable-next-line max-len
                  'Image requires alt text that is descriptive about what the image contains.',
                );
            }
          },
        };
      },
    },
  },
};
