/* eslint-disable max-len */
import * as fs from 'fs';
import { HPEStyleDictionary } from '../HPEStyleDictionary.ts';
import { getThemeAndMode, numberToPixel } from '../utils.ts';

const TOKENS_DIR = 'tokens';
const ESM_DIR = 'dist/esm/';
const CJS_DIR = 'dist/cjs/';
const JSON_DIR = 'dist/json/';
const CSS_DIR = 'dist/css/';
const PREFIX = 'hpe';

HPEStyleDictionary.extend({
  source: [`${TOKENS_DIR}/primitive/primitives.base.json`],
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

HPEStyleDictionary.extend({
  source: [
    `${TOKENS_DIR}/primitive/primitives.base.json`,
    `${TOKENS_DIR}/semantic/color.light.json`, // using light mode to have a reference name available
    `${TOKENS_DIR}/semantic/global.default.json`,
  ],
  platforms: {
    js: {
      transformGroup: 'js/w3c',
      buildPath: ESM_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'global.js',
          format: 'esmGrommetRefs',
          filter: token =>
            token.filePath === `${TOKENS_DIR}/semantic/global.default.json`,
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
          format: 'commonJsGrommetRefs',
          filter: token =>
            token.filePath === `${TOKENS_DIR}/semantic/global.default.json`,
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
          filter: token =>
            token.filePath === `${TOKENS_DIR}/semantic/global.default.json`,
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
          filter: token =>
            token.filePath === `${TOKENS_DIR}/semantic/global.default.json`,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

const colorModeFiles = fs
  .readdirSync(`${TOKENS_DIR}/semantic`)
  .map(file =>
    file.includes('color') ? `${TOKENS_DIR}/semantic/${file}` : undefined,
  )
  .filter(file => file);

const global = fs.readFileSync(`${TOKENS_DIR}/semantic/global.default.json`);
const parsedGlobal = JSON.parse(global);

colorModeFiles.forEach(file => {
  const [theme, mode] = getThemeAndMode(file);
  HPEStyleDictionary.extend({
    source: [
      `${TOKENS_DIR}/primitive/primitives.base.json`,
      file,
      `${TOKENS_DIR}/semantic/elevation.${mode}.json`,
      // `${TOKENS_DIR}/gradient.${mode}.json`, // TO DO add gradients
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
            filter: token => token.filePath === file,
          },
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
            destination: `color.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.cjs`,
            format: 'javascript/commonJs',
            filter: token => token.filePath === file,
          },
          {
            destination: `elevation.${mode}.cjs`,
            format: 'javascript/commonJs',
            filter: 'isShadow',
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
            filter: token => token.filePath === file,
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
            filter: token => token.filePath === file,
          },
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
  .readdirSync(`${TOKENS_DIR}/semantic`)
  .map(file =>
    file.includes('dimension') ? `${TOKENS_DIR}/semantic/${file}` : undefined,
  )
  .filter(file => file);

dimensionFiles.forEach(file => {
  const res = getThemeAndMode(file);
  const mode = res[1];
  HPEStyleDictionary.extend({
    source: [
      `${TOKENS_DIR}/primitive/primitives.base.json`,
      `${TOKENS_DIR}/semantic/color.light.json`,
      `${TOKENS_DIR}/semantic/global.default.json`,
      `${TOKENS_DIR}/semantic/typography.${mode}.json`,
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
                parsedGlobal.breakpoint?.[mode] &&
                !['large', 'xlarge'].includes(mode) &&
                `max-width: ${numberToPixel(
                  parsedGlobal.breakpoint[mode].$value,
                )}`,
            },
            filter: token => dimensions.includes(token.attributes.category),
          },
        ],
      },
    },
  }).buildAllPlatforms();
});

HPEStyleDictionary.extend({
  source: [
    `${TOKENS_DIR}/primitive/primitives.base.json`,
    `${TOKENS_DIR}/semantic/global.default.json`,
    `${TOKENS_DIR}/semantic/color.light.json`, // using light mode to have a reference name available
    `${TOKENS_DIR}/semantic/dimension.large.json`, // using large mode to have a reference name available
    `${TOKENS_DIR}/semantic/typography.large.json`, // using large mode to have a reference name available
    `${TOKENS_DIR}/component/component.default.json`,
  ],
  platforms: {
    js: {
      transformGroup: 'js/w3c',
      buildPath: ESM_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'components.default.js',
          filter: token =>
            token.filePath === `${TOKENS_DIR}/component/component.default.json`,
          format: 'esmGrommetRefs',
        },
      ],
    },
    'js/cjs': {
      transformGroup: 'js/w3c',
      buildPath: CJS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'components.default.cjs',
          filter: token =>
            token.filePath === `${TOKENS_DIR}/component/component.default.json`,
          format: 'commonJsGrommetRefs',
        },
      ],
    },
    css: {
      transformGroup: 'css/w3c',
      buildPath: CSS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'components.css',
          format: 'css/variables',
          filter: token =>
            token.filePath === `${TOKENS_DIR}/component/component.default.json`,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
}).buildAllPlatforms();

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

// create ESM index.js
const esmCollections = [];
fs.readdirSync(ESM_DIR)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.js')) {
      const filename = file.replace('.js', '');
      const parts = filename.split('.');
      let mode = parts[1];
      // special case for base.js and components
      if (mode === 'default' || !mode) [mode] = parts;
      else if (parts.includes('elevation')) mode = `elevation${mode}`;
      fs.appendFileSync(
        `${ESM_DIR}index.js`,
        `export { default as ${mode} } from './${filename}';\n`,
      );
      esmCollections.push(mode);
    }
  });

console.log('✅ Style system outputs have been generated.');