/* eslint-disable max-len */
import StyleDictionary from 'style-dictionary-utils';
import * as fs from 'fs';

const getThemeAndMode = file => {
  const parts = file.split('.');
  const themeAndMode = parts[parts.length - 2];
  let theme;
  let mode;
  if (themeAndMode.includes('-')) [theme, mode] = themeAndMode.split('-');
  else mode = themeAndMode;

  return [theme, mode];
};

// ---- Custom StyleDictionary formatters for color modes and breakpoints ------- //

// color modes
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
${
  dataMode
    ? `@media (prefers-color-scheme: dark) {\n:root${dataTheme}${dataMode} {\n${darkTokens}\n}\n}\n`
    : ''
}
    `;
  },
});

// breakpoints
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

const TOKENS_DIR = 'tokens';
const colorFiles = fs
  .readdirSync(TOKENS_DIR)
  .map(file => (file.includes('color') ? `${TOKENS_DIR}/${file}` : undefined))
  .filter(file => file);

const primitiveColors = fs.readFileSync('dist/primitives.base.json');
const rawPrimitives = JSON.parse(primitiveColors);
const primitiveColorNames = Object.keys(rawPrimitives.color);
colorFiles.forEach(file => {
  const [theme, mode] = getThemeAndMode(file);

  StyleDictionary.extend({
    source: ['dist/primitives.base.json', file],
    platforms: {
      js: {
        transformGroup: 'js',
        buildPath: 'dist/json/',
        files: [
          {
            destination: `colors.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.json`,
            format: 'json/nested',
            filter: token =>
              token.attributes.category === 'color' &&
              !primitiveColorNames.includes(token.attributes.type),
          },
        ],
      },
      css: {
        transformGroup: 'css',
        buildPath: 'dist/css/',
        files: [
          {
            destination: `colors-${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.css`,
            format: 'css/variables-themed',
            options: {
              outputReferences: true,
              mode: mode === 'dark' ? 'dark' : undefined,
              theme,
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
});

const dimensions = ['dimension', 'content', 'spacing', 'border', 'radius'];

// small
StyleDictionary.extend({
  source: ['dist/primitives.base.json', 'tokens/dimension.small.json'],
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'dimension.small.json',
          format: 'json/nested',
          filter: token =>
            ['content', 'spacing', 'border', 'radius'].includes(
              token.attributes.category,
            ),
        },
      ],
    },
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
    js: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'dimension.large.json',
          format: 'json/nested',
          filter: token =>
            ['content', 'spacing', 'border', 'radius'].includes(
              token.attributes.category,
            ),
        },
      ],
    },
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

const elevationFiles = fs
  .readdirSync(TOKENS_DIR)
  .map(file =>
    file.includes('elevation') ? `${TOKENS_DIR}/${file}` : undefined,
  )
  .filter(file => file);

elevationFiles.forEach(file => {
  const [theme, mode] = getThemeAndMode(file);
  StyleDictionary.extend({
    source: ['dist/primitives.base.json', `tokens/color.${mode}.json`, file],
    platforms: {
      js: {
        // includes JS transformGroup + shadow
        transforms: [
          'attribute/cti',
          'name/cti/pascal',
          'size/rem',
          'color/hex',
          'shadow/css',
        ],
        buildPath: 'dist/json/',
        files: [
          {
            destination: `elevation.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.json`,
            format: 'json/nested',
            filter: {
              attributes: {
                category: 'elevation',
              },
            },
          },
        ],
      },
      css: {
        // includes css transformGroup + shadow
        transforms: [
          'attribute/cti',
          'name/cti/kebab',
          'time/seconds',
          'content/icon',
          'size/rem',
          'color/css',
          'shadow/css',
        ],
        buildPath: 'dist/css/',
        files: [
          {
            destination: `elevation-${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.css`,
            format: 'css/variables',
            filter: {
              attributes: {
                category: 'elevation',
              },
            },
            // options: {
            //   outputReferences: true,
            // },
          },
        ],
      },
    },
  }).buildAllPlatforms();
});

const gradientFiles = fs
  .readdirSync(TOKENS_DIR)
  .map(file =>
    file.includes('gradient') ? `${TOKENS_DIR}/${file}` : undefined,
  )
  .filter(file => file);

gradientFiles.forEach(file => {
  const [theme, mode] = getThemeAndMode(file);
  StyleDictionary.extend({
    source: ['dist/primitives.base.json', `tokens/color.${mode}.json`, file],
    platforms: {
      js: {
        // includes JS transformGroup + gradient
        transforms: [
          'attribute/cti',
          'name/cti/pascal',
          'size/rem',
          'color/hex',
          'gradient/css',
        ],
        buildPath: 'dist/json/',
        files: [
          {
            destination: `gradient.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.json`,
            format: 'json/nested',
            filter: {
              attributes: {
                category: 'gradient',
              },
            },
          },
        ],
      },
      css: {
        // includes css transformGroup + shadow
        transforms: [
          'attribute/cti',
          'name/cti/kebab',
          'time/seconds',
          'content/icon',
          'size/rem',
          'color/css',
          'gradient/css',
        ],
        buildPath: 'dist/css/',
        files: [
          {
            destination: `gradient-${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.css`,
            format: 'css/variables',
            filter: {
              attributes: {
                category: 'gradient',
              },
            },
            // options: {
            //   outputReferences: true,
            // },
          },
        ],
      },
    },
  }).buildAllPlatforms();
});

StyleDictionary.extend({
  source: ['dist/primitives.base.json'],
  platforms: {
    js: {
      // includes JS transformGroup + shadow
      transforms: [
        'attribute/cti',
        'name/cti/pascal',
        'size/rem',
        'color/hex',
        'cubicBezier/css',
      ],
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'primitives.base.json',
          format: 'json/nested',
        },
      ],
    },
    css: {
      // includes CSS transformGroup + cubic-bezier
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'size/rem',
        'color/css',
        'cubicBezier/css',
      ],
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'motion.css',
          format: 'css/variables',
          filter: {
            attributes: {
              category: 'motion',
            },
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

// StyleDictionary.extend({
//   source: ['tokens/animation.base.json'],
//   platforms: {
//     js: {
//       // includes JS transformGroup + shadow
//       transforms: [
//         'attribute/cti',
//         'name/cti/pascal',
//         'size/rem',
//         'color/hex',
//         'cubicBezier/css',
//       ],
//       buildPath: 'dist/json/',
//       files: [
//         {
//           destination: 'animation.base.json',
//           format: 'json/nested',
//         },
//       ],
//     },
//     css: {
//       // includes css transformGroup + shadow
//       // includes css transformGroup + shadow
//       transforms: [
//         'attribute/cti',
//         'name/cti/kebab',
//         'time/seconds',
//         'content/icon',
//         'size/rem',
//         'color/css',
//         'cubicBezier/css',
//       ],
//       buildPath: 'dist/css/',
//       files: [
//         {
//           destination: 'animation-base.css',
//           format: 'css/variables',
//         },
//       ],
//     },
//   },
// }).buildAllPlatforms();

console.log('✅ CSS and JSON files have been generated.');

const JSON_DIR = 'dist/json';
const jsonFiles = fs.readdirSync(JSON_DIR).map(file => `${JSON_DIR}/${file}`);
const JS_DIR = 'dist/js';
fs.mkdirSync(`./${JS_DIR}`);
jsonFiles.forEach(file => {
  const raw = fs.readFileSync(file);
  const parsed = JSON.parse(raw);
  let formattedName = file.replace(JSON_DIR, '');
  formattedName = formattedName.replace('json', 'js');
  fs.writeFileSync(
    `./dist/js${formattedName}`,
    `export default ${JSON.stringify(parsed, null, 2)}`,
  );
});

const camelCase = s => s.replace(/-./g, x => x[1].toUpperCase());

const jsFiles = fs.readdirSync(JS_DIR).map(file => `${JS_DIR}/${file}`);
fs.writeFileSync(
  './dist/js/index.js',
  `${jsFiles
    .map(file => {
      const fileName = file.replace(JS_DIR, '.');
      const [theme, mode] = getThemeAndMode(fileName);
      // eslint-disable-next-line no-nested-ternary
      const exportName = file.includes('elevation')
        ? `${camelCase(
            `elevation-${camelCase(`${theme ? `${theme}-` : ''}${mode}`)}`,
          )}`
        : file.includes('gradient')
        ? `${camelCase(
            `gradient-${camelCase(`${theme ? `${theme}-` : ''}${mode}`)}`,
          )}`
        : camelCase(`${theme ? `${theme}-` : ''}${mode}`);
      return `export { default as ${exportName} } from '${fileName}';\n`;
    })
    .join('')}export { default as primitives } from './primitives.base.js';\n`,
);

console.log('✅ Javascript files have been generated.');
