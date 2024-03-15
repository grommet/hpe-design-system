/* eslint-disable max-len */
import StyleDictionary from 'style-dictionary-utils';

// color theme mode
StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter({ dictionary, file, options }) {
    const { outputReferences, theme, mode } = options;
    const darkTokens = StyleDictionary.formatHelpers.formattedVariables({
      format: 'css',
      dictionary,
      outputReferences,
    });
    const dataTheme = theme ? `[data-theme=${theme}]` : '';
    const dataMode = mode ? `[data-mode=${mode}]` : '';
    return `${StyleDictionary.formatHelpers.fileHeader({
      file,
      // eslint-disable-next-line max-len
    })}:root${dataTheme}${dataMode} {\n${darkTokens}\n}\n
@media (prefers-color-scheme: dark) {\n:root${dataTheme}${dataMode} {\n${darkTokens}\n}\n}\n
    `;
  },
});

// light mode
StyleDictionary.extend({
  source: ['dist/primitives.base.json', 'tokens/color.light.json'],
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
  source: ['dist/primitives.base.json', 'tokens/color.dark.json'],
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
            mode: 'dark',
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

// warm light mode
StyleDictionary.extend({
  source: ['dist/primitives.base.json', 'tokens/color.warm-light.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'colors-warm-light.css',
          format: 'css/variables-themed',
          options: {
            outputReferences: true,
            theme: 'warm',
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

// warm dark mode
StyleDictionary.extend({
  source: ['dist/primitives.base.json', 'tokens/color.warm-dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'colors-warm-dark.css',
          format: 'css/variables-themed',
          options: {
            outputReferences: true,
            theme: 'warm',
            mode: 'dark',
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
  source: ['dist/primitives.base.json', 'tokens/dimension.small.json'],
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
  source: ['dist/primitives.base.json', 'tokens/dimension.large.json'],
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
