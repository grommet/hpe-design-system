/* eslint-disable max-len */
import StyleDictionary from 'style-dictionary-utils';
import * as fs from 'fs';
// import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';

// TO DO how to keep "camelCase" for things like minHeight
// right now automatic transforms put a kebab (min-height)

// TO DO getting "property collision" from typography files
// StyleDictionary.extend(
//   makeSdTailwindConfig({
//     type: 'all',
//     isVariables: true,
//     source: ['tokens-alpha/**/*.json'],
//     buildPath: 'dist/tailwind/',
//     // prefix: 'hpe', // TO DO should this be in the token files themselves?
//   }),
// ).buildAllPlatforms();

// js transform group + custom from style-dictionary-utils
StyleDictionary.registerTransformGroup({
  name: 'js/w3c',
  transforms: [
    'attribute/cti',
    'name/cti/pascal',
    'size/rem',
    'color/hex',
    'cubicBezier/css', // TO DO revisit if we want to apply this or not (seems odd to have CSS here)
  ],
});

// css transform group + custom from style-dictionary-utils
StyleDictionary.registerTransformGroup({
  name: 'css/w3c',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css',
    'cubicBezier/css',
    'shadow/css',
    'color/hex',
    'gradient/css',
  ],
});

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
    // TO DO "mode" is fairly coupled with concept of "dark" right now
    // just confirm this would be able to expand to concepts like "high-contrast"
    const dataMode = mode ? `[data-mode=${mode}]` : '';
    return `${StyleDictionary.formatHelpers.fileHeader({
      file,
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
    const { outputReferences, mediaQuery } = options;
    let output = `:root {\n${StyleDictionary.formatHelpers.formattedVariables({
      format: 'css',
      dictionary,
      outputReferences,
    })}\n}`;
    if (mediaQuery) output = `@media (${mediaQuery}) {\n${output}\n}\n`;

    return `${StyleDictionary.formatHelpers.fileHeader({
      file,
    })}${output}`;
  },
});

const BUILD_DIR = 'dist';
const TOKENS_DIR = 'tokens';
const ESM_DIR = `${BUILD_DIR}/esm/`;
const JSON_DIR = `${BUILD_DIR}/json/`;
const CSS_DIR = `${BUILD_DIR}/css/`;
const PREFIX = 'hpe';

let esm = '';

StyleDictionary.extend({
  // from dist because it contains the "px" version
  source: [`${BUILD_DIR}/primitives.base.json`],
  platforms: {
    js: {
      transformGroup: 'js/w3c',
      buildPath: ESM_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'base.js',
          format: 'javascript/esm',
        },
      ],
    },
    json: {
      transformGroup: 'js/w3c',
      buildPath: JSON_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'base.json',
          format: 'json/nested',
        },
      ],
    },
    css: {
      transformGroup: 'css/w3c',
      buildPath: CSS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'base.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

esm += "export { default as base } from './base';\n";

const colorModeFiles = fs
  .readdirSync(TOKENS_DIR)
  .map(file => (file.includes('color') ? `${TOKENS_DIR}/${file}` : undefined))
  .filter(file => file);

const primitives = fs.readFileSync(`${BUILD_DIR}/primitives.base.json`);
const rawPrimitives = JSON.parse(primitives);
const primitiveColorNames = Object.keys(rawPrimitives.base.color);

const camelCase = s => s.replace(/-./g, x => x[1].toUpperCase());

colorModeFiles.forEach(file => {
  const [theme, mode] = getThemeAndMode(file);
  StyleDictionary.extend({
    source: [
      `${BUILD_DIR}/primitives.base.json`,
      file,
      `${TOKENS_DIR}/elevation.${mode}.json`,
      `${TOKENS_DIR}/gradient.${mode}.json`,
    ],
    platforms: {
      js: {
        transformGroup: 'js/w3c',
        buildPath: ESM_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `color.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.js`,
            format: 'javascript/esm',
            filter: token =>
              (token.attributes.category === 'color' &&
                !primitiveColorNames.includes(token.attributes.type)) ||
              token.attributes.category === 'elevation' ||
              token.attributes.category === 'gradient',
          },
        ],
      },
      json: {
        transformGroup: 'js/w3c',
        buildPath: JSON_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `color.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.json`,
            format: 'json/nested',
            filter: token =>
              (token.attributes.category === 'color' &&
                !primitiveColorNames.includes(token.attributes.type)) ||
              token.attributes.category === 'elevation' ||
              token.attributes.category === 'gradient',
          },
        ],
      },
      css: {
        transformGroup: 'css/w3c',
        buildPath: CSS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `color.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.css`,
            format: 'css/variables-themed',
            options: {
              outputReferences: true,
              mode: mode === 'dark' ? 'dark' : undefined,
              theme,
            },
            // TO DO revisit should "light" mode be part of base.css?
            filter: token =>
              (token.attributes.category === 'color' &&
                !primitiveColorNames.includes(token.attributes.type)) ||
              token.attributes.category === 'elevation' ||
              token.attributes.category === 'gradient',
          },
        ],
      },
    },
  }).buildAllPlatforms();

  esm += `export { default as ${camelCase(
    `${theme ? `${theme}-` : ''}${mode}`,
  )} } from './color.${theme ? `${theme}-${mode}` : `${mode || ''}`}';\n`;
});

const dimensions = [
  'content',
  'spacing',
  'borderWidth',
  'radius',
  'text',
  'heading',
];

const dimensionFiles = fs
  .readdirSync(TOKENS_DIR)
  .map(file =>
    file.includes('dimension') ? `${TOKENS_DIR}/${file}` : undefined,
  )
  .filter(file => file);

dimensionFiles.forEach(file => {
  const res = getThemeAndMode(file);
  const mode = res[1];
  StyleDictionary.extend({
    source: [
      `${BUILD_DIR}/primitives.base.json`,
      `${BUILD_DIR}/typography.${mode}.json`, // dist folder has "rem"
      file,
    ],
    platforms: {
      js: {
        transformGroup: 'js/w3c',
        buildPath: ESM_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `dimension.${mode}.js`,
            format: 'javascript/esm',
            filter: token => dimensions.includes(token.attributes.category),
          },
        ],
      },
      json: {
        transformGroup: 'js/w3c',
        buildPath: JSON_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `dimension.${mode}.js`,
            format: 'json/nested',
            filter: token => dimensions.includes(token.attributes.category),
          },
        ],
      },
      css: {
        transformGroup: 'css',
        buildPath: CSS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `dimension.${mode}.css`,
            format: 'css/variables-breakpoints',
            options: {
              outputReferences: true,
              mediaQuery:
                rawPrimitives.base.breakpoint?.[mode] &&
                !['large', 'xlarge'].includes(mode) &&
                `max-width: ${rawPrimitives.base.breakpoint[mode].$value}`,
            },
            filter: token => dimensions.includes(token.attributes.category),
          },
        ],
      },
    },
  }).buildAllPlatforms();
  esm += `export { default as ${mode} } from './dimension.${mode}';\n`;
});

fs.appendFile(`./${ESM_DIR}index.js`, esm, err => {
  if (err) {
    console.log(err);
  }
});

// TO DO make dynamic
const exclude = [
  'static',
  'base',
  'color',
  'TBD',
  'spacing',
  'radius',
  'borderWidth',
  'content',
];

StyleDictionary.extend({
  source: [
    // from dist because it contains the "px"/"rem" version
    `${BUILD_DIR}/primitives.base.json`,
    `${TOKENS_DIR}/color - semantic.light.json`, // using light mode to have a reference name available
    `${TOKENS_DIR}/dimension - semantic.large.json`, // using large mode to have a reference name available
    `${BUILD_DIR}/typography.large.json`, // using large mode to have a reference name available
    `${BUILD_DIR}/component.default.json`,
  ],
  platforms: {
    css: {
      transformGroup: 'css/w3c',
      buildPath: CSS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'components.css',
          format: 'css/variables',
          filter: token => !exclude.includes(token.attributes.category),
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

console.log('✅ CSS, Javascript, and JSON files have been generated.');