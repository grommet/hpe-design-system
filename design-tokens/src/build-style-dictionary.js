import StyleDictionary from 'style-dictionary-utils';

// color theme mode
StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter({ dictionary, file, options }) {
    const { outputReferences, theme } = options;
    const darkTokens = StyleDictionary.formatHelpers.formattedVariables({
      format: 'css',
      dictionary,
      outputReferences,
    });
    return `${StyleDictionary.formatHelpers.fileHeader({
      file,
      // eslint-disable-next-line max-len
    })}:root[data-theme=${theme}] {\n${darkTokens}\n}\n
@media (prefers-color-scheme: dark) {\n:root {\n${darkTokens}\n}\n}\n
    `;
  },
});

// light mode
StyleDictionary.extend({
  source: ['tokens/primitives.base.json', 'tokens/color.light.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'colors.css',
          format: 'css/variables',
          filter: {
            attributes: {
              category: 'color',
            },
          },
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

// dark mode
StyleDictionary.extend({
  source: ['tokens/primitives.base.json', 'tokens/color.dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'colors-dark.css',
          format: 'css/variables-themed',
          options: {
            outputReferences: true,
            theme: 'dark',
          },
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

// small
StyleDictionary.registerFormat({
  name: 'css/variables-breakpoints',
  formatter({ dictionary, file, options }) {
    const { outputReferences } = options;
    return `${StyleDictionary.formatHelpers.fileHeader({
      file,
      // TO DO how to dynamically get the breakpoint value
      // eslint-disable-next-line max-len
    })}@media (max-width: 768px) { \n:root {\n${StyleDictionary.formatHelpers.formattedVariables(
      {
        format: 'css',
        dictionary,
        outputReferences,
      },
    )}\n}\n}\n`;
  },
});

StyleDictionary.registerFilter({
  name: 'isDimension',
  matcher(prop) {
    return ['dimension', 'content', 'spacing', 'border', 'radius'].includes(
      prop.attributes.category,
    );
  },
});

const dimensions = ['dimension', 'content', 'spacing', 'border', 'radius'];

// small
StyleDictionary.extend({
  source: ['tokens/primitives.base.json', 'tokens/dimension.small.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'dimensions-small.css',
          format: 'css/variables-breakpoints',
          options: {
            outputReferences: true,
          },
          filter: token => dimensions.includes(token.attributes.category),
        },
      ],
    },
  },
}).buildAllPlatforms();

// large
StyleDictionary.extend({
  source: ['tokens/primitives.base.json', 'tokens/dimension.large.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'dimensions-large.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
          filter: token => dimensions.includes(token.attributes.category),
        },
      ],
    },
  },
}).buildAllPlatforms();
