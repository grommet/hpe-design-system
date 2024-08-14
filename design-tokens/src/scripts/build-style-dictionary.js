/* eslint-disable max-len */
import * as fs from 'fs';
import { HPEStyleDictionary } from '../HPEStyleDictionary.ts';
import { getThemeAndMode } from '../utils.ts';

const TOKENS_DIR = 'tokens';
const ESM_DIR = 'dist/esm/';
const CJS_DIR = 'dist/cjs/';
const JSON_DIR = 'dist/json/';
const CSS_DIR = 'dist/css/';
const PREFIX = 'hpe';

let esm = '';
HPEStyleDictionary.extend({
  // from dist because it contains the "px" version
  source: ['dist/primitives.base.json'],
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
    'js/cjs': {
      transformGroup: 'js/w3c',
      buildPath: CJS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'base.cjs',
          format: 'javascript/commonJs',
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

HPEStyleDictionary.extend({
  source: [`${TOKENS_DIR}/global.default.json`],
  platforms: {
    js: {
      transformGroup: 'js/w3c',
      buildPath: ESM_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'global.js',
          format: 'javascript/esm',
        },
      ],
    },
    'js/cjs': {
      transformGroup: 'js/w3c',
      buildPath: CJS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'global.cjs',
          format: 'javascript/commonJs',
        },
      ],
    },
    json: {
      transformGroup: 'js/w3c',
      buildPath: JSON_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'global.json',
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
          destination: 'global.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

esm += "export { default as global } from './global';\n";

const colorModeFiles = fs
  .readdirSync(TOKENS_DIR)
  .map(file => (file.includes('color') ? `${TOKENS_DIR}/${file}` : undefined))
  .filter(file => file);

const primitives = fs.readFileSync('dist/primitives.base.json');
const rawPrimitives = JSON.parse(primitives);
const primitiveColorNames = Object.keys(rawPrimitives.base.color);

const camelCase = s => s.replace(/-./g, x => x[1].toUpperCase());

colorModeFiles.forEach(file => {
  const [theme, mode] = getThemeAndMode(file);
  HPEStyleDictionary.extend({
    source: [
      'dist/primitives.base.json',
      file,
      // `${TOKENS_DIR}/elevation.${mode}.json`,
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
              token.attributes.category === 'gradient',
          },
        ],
      },
      'js/cjs': {
        transformGroup: 'js/w3c',
        buildPath: CJS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `color.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.cjs`,
            format: 'javascript/commonJs',
            filter: token =>
              (token.attributes.category === 'color' &&
                !primitiveColorNames.includes(token.attributes.type)) ||
              // token.attributes.category === 'elevation' ||
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
              // token.attributes.category === 'elevation' ||
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
              // token.attributes.category === 'elevation' ||
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
  'paragraph',
  'size',
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
  HPEStyleDictionary.extend({
    source: [
      'dist/primitives.base.json',
      `dist/typography.${mode}.json`, // dist folder has "rem"
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
      'js/cjs': {
        transformGroup: 'js/w3c',
        buildPath: CJS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `dimension.${mode}.cjs`,
            format: 'javascript/commonJs',
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
  'paragraph',
  'heading',
  'text',
  'size',
  'elevation',
];

HPEStyleDictionary.extend({
  source: [
    // from dist because it contains the "px"/"rem" version
    'dist/primitives.base.json',
    `${TOKENS_DIR}/color - semantic.light.json`, // using light mode to have a reference name available
    `${TOKENS_DIR}/dimension - semantic.large.json`, // using large mode to have a reference name available
    'dist/typography.large.json', // using large mode to have a reference name available
    'dist/component.default.json',
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

const elevationFiles = fs
  .readdirSync(TOKENS_DIR)
  .map(file =>
    file.includes('elevation') ? `${TOKENS_DIR}/${file}` : undefined,
  )
  .filter(file => file);

elevationFiles.forEach(file => {
  const mode = getThemeAndMode(file)[1];
  HPEStyleDictionary.extend({
    source: [
      'dist/primitives.base.json', // from dist because it contains the "px"/"rem" version
      `${TOKENS_DIR}/color - semantic.${mode}.json`, // using light mode to have a reference name available
      file,
    ],
    platforms: {
      js: {
        transformGroup: 'js/w3c',
        buildPath: ESM_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `elevation.${mode}.js`,
            format: 'javascript/esm',
            filter: 'isShadow',
          },
        ],
      },
      'js/cjs': {
        transformGroup: 'js/w3c',
        buildPath: CJS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `elevation.${mode}.cjs`,
            format: 'javascript/commonJs',
            filter: 'isShadow',
          },
        ],
      },
      css: {
        transformGroup: 'css/w3c',
        buildPath: CSS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `elevation.${mode}.css`,
            filter: 'isShadow',
            format: 'css/variables-themed',
            options: {
              outputReferences: true,
              mode: mode === 'dark' ? 'dark' : undefined,
            },
          },
        ],
      },
    },
  }).buildAllPlatforms();
  esm += `export { default as ${camelCase(
    `elevation${mode}`,
  )} } from './elevation.${`${mode || ''}`}';\n`;
});

// create ESM index.js
fs.appendFile(`./${ESM_DIR}index.js`, esm, err => {
  if (err) {
    console.log(err);
  }
});

// create CommonJS index.js
const collections = [];
fs.readdirSync(CJS_DIR)
  .filter(file => file !== 'index.cjs')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.cjs')) {
      const filename = file.replace('.cjs', '');
      const parts = filename.split('.');
      let mode = parts[1];
      // special case for base.js and components
      if (mode === 'default' || !mode) [mode] = parts;
      else if (parts.includes('elevation')) mode = `elevation${mode}`;
      fs.appendFileSync(
        `${CJS_DIR}index.cjs`,
        `const ${mode} = require('./${file}');\n`,
      );
      collections.push(mode);
    }
  });

const output = `\nmodule.exports = { ${collections.map(
  collection => collection,
)} };\n`;
fs.appendFileSync(`${CJS_DIR}index.cjs`, output);

console.log('✅ Style system outputs have been generated.');
